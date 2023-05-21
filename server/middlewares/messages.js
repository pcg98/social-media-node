const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const { User, Conversation } = require('../models/index');
//Method that return the id of conversation.
//Check if have or create a new one
//returning the id
const haveConversation = async( req = request, res = response, next ) => {
    const sourceid = req.user.id;
    const targetid = req.params.targetid || req.body.targetid;
    //Try to find the conversation or create a new one
    Conversation.findOrCreate({
        where: {
            [Op.or]: [
                { targetid: targetid, sourceid: sourceid },
                { targetid: sourceid, sourceid: targetid }
            ]
        }
    }).then(([conversation, created]) => {
        console.log(conversation); // Existing conversation or newly created conversation
        console.log(created); // true if a new conversation was created, false if an existing conversation was found
        //Put in the request the id
        req.conversation = conversation;
        next();
    }).catch((error) => {
        console.error('Error finding or creating conversation:', error);
        return res.status(500).json("Something happens", error);
    });
        
}

module.exports = {
    haveConversation
}