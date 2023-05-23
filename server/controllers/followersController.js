const { response } = require('express');
const { User, UserRequest } = require('../models/index');

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


module.exports = {
    getRequests
}