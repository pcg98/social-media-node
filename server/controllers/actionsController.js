const { response } = require('express');
const bcryptjs = require('bcryptjs')

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

const searchUsersByUsername = async(req, res = response) => {
    const { id } = req.body;
    User.findAll({
        where: {
          id: id,
        },
        include: [
          {
            model: UserBlocked,
            where: {
              blockingUserId: id,
            },
            required: false,
          },
          {
            model: User,
            as: 'Following',
            through: {
              model: UserFollowing,
              where: {
                sourceId: id,
                status: 'pending',
              },
            },
            required: false,
          },
        ],
      })
        .then((users) => {
          if (users.length === 0 || users[0].UserBlocks.length > 0) {
            // User is either not found or blocked by another user
            console.log('User is blocked or not found');
            return [];
          }
      
          const user = users[0];
          const pendingRequests = user.Following.filter(following => !user.UserBlocks.some(blockedUser => blockedUser.targetid === following.id));
      
          // Set the pending field to true for the pending requests
          const usersWithPendingField = pendingRequests.map(request => ({
            ...request.toJSON(),
            pending: true,
          }));
      
          console.log('Users with pending requests:', usersWithPendingField);
          return usersWithPendingField;
        })
        .catch((error) => {
          console.error('Error occurred during query:', error);
        });
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
    searchUsersByUsername,
    blockUser
}
