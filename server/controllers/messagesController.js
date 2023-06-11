const { response } = require('express');
const { User,  Message, Conversation } = require('../models/index');

const { Op } = require('sequelize');

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
          const conversations = await Conversation.findOne({
            where: {
                id: conversationId
            },
            include: [
              {
                model: Message,
                as: 'messages',
                include: [
                  { model: User, as: 'user', attributes: ['id', 'name', 'profile_picture'] }
                ]
              }
            ]
          });
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