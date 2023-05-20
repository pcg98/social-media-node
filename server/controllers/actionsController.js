const { response } = require('express');
const bcryptjs = require('bcryptjs')
const sequelize = require('../database/config')
const { User, UserBlocked, UserFollowing, UserFollower, Messages } = require('../models/index');


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

const cancelRequest = async(req, res = response) => {
    const { sourceId, targetId } = req.body;

    try {
        //User with that id and enabled
        const user = await User.findOne({ 
            where: {
                id: targetId,
                user_statusid: 1
            }
        });
        //If user not found return an error
        if ( !user ) {
            return res.status(400).json({
                msg: 'User are incorrect'
            });
        }
        //Catch in the following table
        const following = await UserFollowing.findOne({
            sourceid: sourceId,
            targetid: targetId
        });
        //And in the follower table
        const follower = await UserFollower.findOne({
            sourceid: sourceId,
            targetid: targetId
        });
        //if we find both
        if(following && follower){
            //delete
            await follower.destroy();
            await following.destroy();
            console.log("Request cancelled");
            return res.status(200).json("Request canceled");
        }
        
        return res.status(403).json("Not user found for that operation");

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Talk with the admin'
        });
    }   

}

const searchUsersByNickname = async(req, res = response) => {
    const { nickname } = req.params;
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
    }else{
        user.unknow = true;
    }
        return user;
    });
    return res.status(200).json(result);

}
//We return the user with that id if they are friends
//the profile is public and is not locked
const showProfileById = async(req, res = response) => {
    const { targetid } = req.params;
    const { id } = req.user;
    //If he wants herself
    if(id == targetid){
        //If not, code error
        return res.status(403).json("NOthing to show");
    }
    console.log("Entramos a enseñar perfil "+targetid);
    //Query to get the users with that id.
    //Want that is diferent to our user
    //and is visible or friend
    let [user]= await sequelize.query('SELECT * FROM user WHERE id = :targetid '+//Id the same
        'and user_visibilityid = 1 or EXISTS '+//User is public or...
        //Actual user following the wanted 
        '(select * from user_following where targetid = :targetid and sourceid = :currentId and relationship_statusid = 1)',
        { 
            replacements: { targetid: targetid,
                currentId: id}, 
            type: sequelize.QueryTypes.SELECT // Specify the query type as SELECT
        })
        .then((user) => {
            return user;
        })
        .catch((error) => {
            console.error('Error occurred during query:', error);
        });
    //If we find an user...
    if(user){
        //Succesful request
        return res.status(200).json(user);
    }
    //If not, code error
    return res.status(403).json("NOthing to show");

}
const blockUser = async(req, res = response) => {
    const { id } = req.user;
    const { targetId } = req.body;
    //If something is empty or the same..
    if(!id || !targetId || id == targetId){
        return res.status(404).json({
            msg: 'Wrong paramethers'
        });
    }
    UserBlocked.create({
        sourceid: id,
        targetid: targetId
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

const sendMessage = async(req, res = response) => {
    console.log("Enter to the message")
    //SourceId come from our JWT
    const { id } = req.user;
    const { targetid, body } = req.body;
    console.log(id,targetid,body);
    if(!targetid || !body){
        return res.status(404).json({
            msg: 'Parameter was wrong'
        });
    }
    
    Messages.create({
        targetid: targetid,
        senderid: id,
        body: body
    }) .then((message) => {
        console.log('User Message send:', message);
        return res.status(200).json();
      })
      .catch((error) => {
        console.error('Error occurred during message operation:', error);
        return res.status(500).json({
            msg: 'Something was wrong'
        });
      });

}

module.exports = {
    sendRequest,
    searchUsersByNickname,
    blockUser,
    showProfileById,
    cancelRequest,
    sendMessage
}
