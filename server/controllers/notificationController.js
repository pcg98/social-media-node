const { response } = require('express');
const { User, UserNotification, NotificationObject } = require('../models/index');

const getNotifications = async(req, res = response) => {
    //Catch the current user thanks to the JWT
    const targetid = req.user.id;

    try {
        //Catch the notification for that user
        const notifications = await UserNotification.findAll({
            where: {
                targetid: targetid
            },
            include: [
                {
                    model: User,
                    as: 'source',
                    attributes: ['nickname', 'profile_picture']
                },
                {
                    model: NotificationObject,
                    as: 'notification_object',
                    attributes: ['description']
                }
            ]
        });
        if(!notifications) return res.status(200)
        //Put is_see to true
        await UserNotification.update({ is_see: true},{
            where: {
                is_see: false,
                targetid: targetid
            }
        });

        return res.status(200).json({"ok":true, notifications});
        

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Talk with the admin'
        });
    }   
}
//Only return if have any new notification
const hasNotifications = async(req, res = response) => {
    //Catch the current user thanks to the JWT
    const targetid = req.user.id;

    try {
        //Catch the notification for that user without see
        const newNotifications = await UserNotification.findOne({
            where: {
                targetid: targetid,
                is_see: false
            }
        });
        if(!newNotifications) return res.status(200).json(false)

        return res.status(200).json(true);
        

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Talk with the admin'
        });
    }   
}

module.exports = {
    getNotifications,
    hasNotifications
}