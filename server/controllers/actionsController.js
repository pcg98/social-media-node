const { response } = require('express');
const sequelize = require('../database/config')
const { User, UserBlocked, UserFollower, Message, UserRequest, UserImage } = require('../models/index');


const { generateJWT } = require('../helpers/generate-jwt');
const { newNotification, knowrelationship } = require('../helpers/userFunctions');

const sendRequest = async(req, res = response) => {
    const sourceid = req.user.id;
    const { targetid } = req.body;
    
    try {
        //Check on request doesn't exists
        const request = await UserRequest.findOne({ 
            where: {
                sourceid: sourceid,
                targetid: targetid
            }
        });
        if(request){
            return res.status(400);
        }

        //Creating the request
        UserRequest.create({
            sourceid: sourceid,
            targetid: targetid
        }).then(async (request) => {
            console.log("Request creada");
            console.log(request);
            //Create notification
            await newNotification(sourceid, targetid, 2);
            return res.status(200).json({
                request,
            });
        }).catch((error) => {
            console.log("Something was wrong");
            console.log(error);
            return res.status(500).json("Something was wrong creating the request");
        });
        

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Talk with the admin'
        });
    }   

}

const cancelRequest = async(req, res = response) => {
    const sourceid = req.user.id;
    const targetid = req.params.targetid || req.body.targetid;
    try {
        //Check on  if request exists
        const request = await UserRequest.findOne({ 
            where: {
                sourceid: sourceid,
                targetid: targetid
            }
        });
        if(!request){
            return res.status(400);
        }
        //Delete request
        await request.destroy();
        return res.status(200).json({
            request
        });
    }
    catch(e){
        return res.status(500).json({e});
    }
}

const searchUsersByNickname = async(req, res = response) => {
    const { nickname } = req.params;
    const { id } = req.user;
    
    console.log("Id "+id);
    //Query to get the users with that nickname
    //excepts the current users and the users who block
    //the user
    let users= await sequelize.query('SELECT * FROM user WHERE nickname LIKE :nickname and user_statusid = 1 and id != :currentid '
        +'and id NOT IN (select sourceid from user_blocked where targetid = :currentid) '
        +'and (user_visibilityid = 1 or id IN (select targetid from user_following where targetid = :currentid))', {
            replacements: { nickname: `%${nickname}%`,
                currentid: id}, 
            type: sequelize.QueryTypes.SELECT // Specify the query type as SELECT
        })
        .then((users) => {
            return users;
        })
        .catch((error) => {
            console.error('Error occurred during query:', error);
        });
    const result = [];
    for(let i = 0; i<users.length; i++){
        users[i].relationship = await knowrelationship(id, users[i].id);
        result.push(users[i]);
    }

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
        return res.status(403).json("Nothing to show");
    }
    console.log("Entramos a enseñar perfil "+targetid);
    //Query to get the users with that id.
    //Want that is diferent to our user
    //and is visible or friend
    try{
        let userSeq = await User.findByPk(targetid, 
            {include:{
                model: UserFollower,
                as: 'user_followers',
                where: {
                    sourceid: id
                }
            }
        });
        console.log("Vamos con la query 2")
        let [user]= await sequelize.query('SELECT * FROM user WHERE id = :targetid '+//Id the same
            'and user_statusid = 1'+ //it's avaliable
            'and (user_visibilityid = 1 or EXISTS '+//User is public or...
            //Actual user following the wanted 
            '(select * from user_following where targetid = :targetid and sourceid = :currentId))',
            { 
                replacements: { targetid: targetid,
                    currentId: id }, 
                type: sequelize.QueryTypes.SELECT // Specify the query type as SELECT
            })
            .then((user) => {
                console.log(user);
                return user;
            })
            .catch((error) => {
                console.error('Error occurred during query:', error);
            });
        //If we find an user...
        if(!user){

            //If not, code error
            return res.status(403).json({ok: false, message: "unavaliable user", userSeq});
        }
        //If user exists
        //FInd his images
        const userImages = await UserImage.findAll({
            where: {
                userid: targetid
            }
        });
        if(userImages.length != 0) user.userPictures = userImages;
        //FInd his relationship
        user.relationship = await knowrelationship(id, targetid);
        //Succesful request
        return res.status(200).json(user);
    }catch(e){
        console.log("Error fetching the user in get profile by id "+e);
        return res.status(500).json("Something was wrong fetching the user by id")
    }

}
const blockUser = async(req, res = response) => {
    const { id } = req.user;
    const { targetid } = req.body;


    UserBlocked.create({
        sourceid: id,
        targetid: targetid
    }).then((userBlock) => {
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
    const userid = req.user.id;
    const { body } = req.body;
    const id_conversation = req.conversation.id;
    console.log("Id conversaionc", id_conversation);
    if(!userid || !body){
        return res.status(404).json({
            msg: 'Parameter was wrong'
        });
    }
    
    Message.create({
        conversationsid: id_conversation,
        userid: userid,
        body: body
    }) .then((message) => {
        console.log('User Message send:', message);
        targetid = (req.conversation.sourceid != userid)? req.conversation.sourceid : req.conversation.targetid
        //Create notification
        newNotification(message.userid, targetid, 1, message.conversationsid);
        return res.status(200).json({ok: true});
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
