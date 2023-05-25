const { response } = require('express');
const { User, UserRequest, UserFollower } = require('../models/index');

const getRequests = async(req, res = response) => {
    //Catch the current user thanks to the JWT
    const id = req.user.id;
    
    try {
        //Catch the request and user source
        const userRequests = await UserRequest.findAll({
            where: {
                targetid: id
            },
            include: {
                model: User, //Model
                as : 'source', //Name relationship
                attributes: ['id', 'name', 'last_name', 'nickname', 'profile_picture']
                //Attributes that we want
            }
        });      

        return res.status(200).json(userRequests)
        

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Talk with the admin'
        });
    }   

}
//Method to answer to the friend request
const responseRequest = async(req, res = response) => {
    //Catch the current user thanks to the JWT
    const targetid = req.user.id;
    const sourceid = req.body.sourceid;
    const answer = req.body.answer;

    //Check that answer is correct
    if(answer != 'accepted' && answer !='rejected') return res.status(403).json("You shouldn't do that");
    
    try {
        //Catch the request and user source
        const userRequest = await UserRequest.findOne({
            where: {
                sourceid: sourceid,
                targetid: targetid //Target current user
            }
        });   
        //If not exists any request with that..
        if(!userRequest) return res.status(403).json("You shouldn't do that");


        //If is accepted
        if(answer == 'accepted'){
            //We have to insert in follower
            //And the trigguer do the rest
            UserFollower.create({ targetid, sourceid })
        }

        //Delete the request
        await userRequest.destroy();
        return res.status(200).json("Request response");
        

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Talk with the admin'
        });
    }   

}
const getFollowers = async(req, res = response) => {
    //Catch the current user thanks to the JWT
    const targetid = req.user.id;

    try {
        //Catch the request and user source
        const followers = await UserFollower.findAll({
            where: {
                targetid: targetid //Target current user
            },
            include: {
                model: User,
                as: 'source',
                attributes: ['name','last_name','nickname','profile_picture']
            }
        });   
        return res.status(200).json(followers);
        

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Talk with the admin'
        });
    }   

}

module.exports = {
    getRequests,
    responseRequest,
    getFollowers
}