const { response } = require('express');
const bcryptjs = require('bcryptjs')
const sequelize = require('../database/config')
const { User, UserBlocked, UserFollowing, UserFollower, Message, UserRequest, Conversation } = require('../models/index');


const { generateJWT } = require('../helpers/generate-jwt');
const { Op } = require('sequelize');

/*
const getConversations = async(req, res = response) => {
    const id = req.user.id;
    
    try {
        //Check on the conversations with the user
        const conversations = await Conversation.findAll({ 
            where: {
                [Op.or]: [
                    { targetid: id },
                    { sourceid: id }
                ]
            }
        });
        //Return conversations
        if(conversations){
            return res.status(200).json({
                conversations
            })
        };
        //Or null
        return res.status(200).json(null)
        

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Talk with the admin'
        });
    }   

}*/
const getConversations = async(req, res = response) => {
    const id = req.user.id;
    
    try {
        //Check on the conversations with the user
        let conversations = await Conversation.findAll({ 
            where: {
                [Op.or]: [
                    { targetid: id },
                    { sourceid: id }
                ]
            }
        });

        //If null conversations
        if(!conversations) return res.status(200).json(null) 
        //Otherwise get the other user info
        conversations = await Promise.all(conversations.map(async (conversation) => {
            const otherUserId = (conversation.targetid !== id) ? conversation.targetid : conversation.sourceid;
            //DataValues is a sequelize property
            conversation.dataValues.otherUser = await User.findByPk(otherUserId);
            return conversation;
        }));
                

          
          

        return res.status(200).json(conversations)
        

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Talk with the admin'
        });
    }   

}
//Get messages from a conversation
const getMessages = async(req, res = response) => {
    const conversationId = req.params.conversationid || req.body.conversationid;
    const userid = req.user.id;
    try {
        /*Get the conversation info
        const conversation = await Conversation.findOne({
            where: {
              id: conversationId
            },
            include: [
              {
                model: Message,
                as: 'messages'
              },
              {
                model: User,
                as: 'target'
              },
              {
                model: User,
                as: 'source',
              }
            ]
          });     */
          const conversations = await Conversation.findOne({
            where: {
                id: conversationId
            },
            include: [
              {
                model: Message,
                as: 'messages',
                include: [
                  { model: User, as: 'message_source', attributes: ['name', 'profile_picture'] }
                  //{ model: User, as: 'message_target' }
                ]
              }
            ]
          });
        /*
        const otherUserId = (conversation.dataValues.sourceid != userid) ? conversation.sourceid : conversation.targetid 
        conversation.dataValues.otherUserId = otherUserId;*/
        //Return the two users and the info
        return res.status(200).json(conversations);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Talk with the admin'
        });
    }   

}

module.exports = {
    getConversations,
    getMessages
}