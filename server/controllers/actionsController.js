const { response } = require('express');
const bcryptjs = require('bcryptjs')
const sequelize = require('../database/config')
const { User, UserBlocked, UserFollowing, UserFollower } = require('../models/index');


const { generateJWT } = require('../helpers/generate-jwt');

/*
const sendRequest = async(req, res = response) => {

    const { email, password } = req.body;
    console.log("New request");

    try {
      
        // Check email
        const user = await User.findOne({ 
            where: {
                email: email
            }
        });
        if ( !user ) {
            return res.status(400).json({
                msg: 'User / Password are incorrect - email'
            });
        }

        // Check if it is enabled
        if ( !user.status != 1 ) {
            return res.status(400).json({
                msg: 'User / Password are incorrect - state: false'
            });
        }

        // Check pass
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'User / Password are incorrect - password'
            });
        }
        console.log(user);
        // Generate the JWT
        const token = await generateJWT( user.id, user.rol );
        console.log(token);
        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Talk with the admin'
        });
    }   

}*/

const sendRequest = async(req, res = response) => {
    const { sourceId, targetId } = req.body;

    try {
        const user = await User.findOne({ 
            where: {
                id: targetId
            }
        });
        if ( !user ) {
            return res.status(400).json({
                msg: 'User are incorrect'
            });
        }

        // Check if it is enabled
        if ( !user.status != 1 ) {
            return res.status(400).json({
                msg: 'User disabled'
            });
        }
        const following = await UserFollowing.create({
            sourceid: sourceId,
            targetid: targetId
        });
        const follower = await UserFollower.create({
            sourceid: sourceId,
            targetid: targetId
        });
        
        console.log(follower)," creado";
        res.status(200).json({
            following,
            follower
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Talk with the admin'
        });
    }   

}

const searchUsersByNickname = async(req, res = response) => {
    const { nickname } = req.body;
    const { id } = req.user;
    console.log("Id "+id);
    //Query to get the users with that nickname
    //excepts the current users and the users who block
    //the user
    let users= await sequelize.query('SELECT * FROM user WHERE nickname LIKE :nickname and user_statusid = 1 '
        +'and id != :currentId and id NOT IN'
        +' (select sourceId from user_blocked where targetId = :currentId) ', {
            replacements: { nickname: `%${nickname}%`,
                currentId: id}, 
            type: sequelize.QueryTypes.SELECT // Specify the query type as SELECT
        })
        .then((users) => {
            return users;
        })
        .catch((error) => {
            console.error('Error occurred during query:', error);
        });
    //Get all the user who actual user send a request and 
    //haven't answer or is frined. !=2 2 is for rejected
    let followings = await sequelize.query('SELECT id, relationship_statusid FROM user_following WHERE sourceid = :currentId and relationship_statusid != 2', {
        replacements: { currentId: id}, 
        type: sequelize.QueryTypes.SELECT // Specify the query type as SELECT
    })
    .then((pendings) => {
        return pendings;
    })
    .catch((error) => {
        console.error('Error occurred during query pendings:', error);
    });
    console.log(followings);
    //Want all the user who have accepted or pending in our
    //current user to control that in front end
    //If there is more than one users...
    
    let result = users.map((user) => {
    // Find the corresponding object in the second array based on the id
    const foundFollowing = followings.find((following) => following.id === user.id);
    if (foundFollowing) {
        if (foundFollowing.relationship_statusid === 1) {
            user.accepted = true;
        }
        if (foundFollowing.relationship_statusid === 3) {
            user.pending = true;
        }
        console.log("Se conocen");
    }
        return user;
    });
    res.status(200).json(result);

}
const blockUser = async(req, res = response) => {
    const { id, idTo } = req.body;
    UserBlocked.create({
        sourceid: id,
        targetid: idTo
    }) .then((userBlock) => {
        console.log('User block created:', userBlock);
        return res.status(200).json({
            msg: 'User blocked'
        });
      })
      .catch((error) => {
        console.error('Error occurred during block operation:', error);
        return res.status(500).json({
            msg: 'Something was wrong'
        });
      });

}

module.exports = {
    sendRequest,
    searchUsersByNickname,
    blockUser
}
