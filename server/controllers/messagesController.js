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
        const updatedConversations = await Promise.all(conversations.map(async (conversation) => {
            const otherUserId = (conversation.targetid !== id) ? conversation.targetid : conversation.sourceid;
            conversation.dataValues.otherUser = await User.findByPk(otherUserId);
            return conversation;
          }));
          
          console.log(updatedConversations);          

          
          

        return res.status(200).json({
            updatedConversations
        })
        

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Talk with the admin'
        });
    }   

}

module.exports = {
    getConversations
}