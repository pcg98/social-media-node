const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "email"
    },
    nickname: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: "nickname"
    },
    telephone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "telephone"
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURDATE()'),
    },
    bio: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    sex: {
      type: DataTypes.ENUM('female', 'male', 'other'),
      allowNull: false,
      comment: "It should be woman, male or other"
    },
    profile_picture: {
      type: DataTypes.STRING(255),
      defaultValue: 'default.jpg',
      allowNull: false,
    },
    user_statusid: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'user_status',
        key: 'id'
      }
    },
    user_rolid: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'user_rol',
        key: 'id'
      }
    },
    user_visibilityid: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'user_visibility',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "nickname",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nickname" },
        ]
      },
      {
        name: "telephone",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "telephone" },
        ]
      },
      {
        name: "FKuser317843",
        using: "BTREE",
        fields: [
          { name: "user_statusid" },
        ]
      },
      {
        name: "FKuser204990",
        using: "BTREE",
        fields: [
          { name: "user_rolid" },
        ]
      },
      {
        name: "FKuser71815",
        using: "BTREE",
        fields: [
          { name: "user_visibilityid" },
        ]
      },
    ]
  });
}
/*
user.belongsToMany(user, { as: 'targetid_users', through: messages, foreignKey: "senderid", otherKey: "targetid" });
user.belongsToMany(user, { as: 'senderid_users', through: messages, foreignKey: "targetid", otherKey: "senderid" });
user.belongsToMany(user, { as: 'targetid_user_user_blockeds', through: user_blocked, foreignKey: "sourceid", otherKey: "targetid" });
user.belongsToMany(user, { as: 'sourceid_users', through: user_blocked, foreignKey: "targetid", otherKey: "sourceid" });
user.belongsToMany(user, { as: 'targetid_user_user_followers', through: user_follower, foreignKey: "sourceid", otherKey: "targetid" });
user.belongsToMany(user, { as: 'sourceid_user_user_followers', through: user_follower, foreignKey: "targetid", otherKey: "sourceid" });
user.belongsToMany(user, { as: 'targetid_user_user_followings', through: user_following, foreignKey: "sourceid", otherKey: "targetid" });
user.belongsToMany(user, { as: 'sourceid_user_user_followings', through: user_following, foreignKey: "targetid", otherKey: "sourceid" });
user.belongsToMany(user, { as: 'targetid2_users', through: user_notification, foreignKey: "sourceid", otherKey: "targetid2" });
user.belongsToMany(user, { as: 'sourceid_user_user_notifications', through: user_notification, foreignKey: "targetid2", otherKey: "sourceid" });
user.belongsToMany(user, { as: 'targetid_user_user_reports', through: user_report, foreignKey: "sourceid", otherKey: "targetid" });
user.belongsToMany(user, { as: 'sourceid_user_user_reports', through: user_report, foreignKey: "targetid", otherKey: "sourceid" });
user.hasMany(image_comment, { as: "image_comments", foreignKey: "userid"});
user.hasMany(messages, { as: "messages", foreignKey: "senderid"});
user.hasMany(messages, { as: "target_messages", foreignKey: "targetid"});
user.hasMany(user_blocked, { as: "user_blockeds", foreignKey: "sourceid"});
user.hasMany(user_blocked, { as: "target_user_blockeds", foreignKey: "targetid"});
user.hasMany(user_follower, { as: "user_followers", foreignKey: "sourceid"});
user.hasMany(user_follower, { as: "target_user_followers", foreignKey: "targetid"});
user.hasMany(user_following, { as: "user_followings", foreignKey: "sourceid"});
user.hasMany(user_following, { as: "target_user_followings", foreignKey: "targetid"});
user.hasMany(user_image, { as: "user_images", foreignKey: "userid"});
user.hasMany(user_notification, { as: "user_notifications", foreignKey: "sourceid"});
user.hasMany(user_notification, { as: "targetid2_user_notifications", foreignKey: "targetid2"});
user.hasMany(user_report, { as: "user_reports", foreignKey: "sourceid"});
user.hasMany(user_report, { as: "target_user_reports", foreignKey: "targetid"});
user.hasMany(user_suspension, { as: "user_suspensions", foreignKey: "userid"});
user.belongsTo(user_rol, { as: "user_rol", foreignKey: "user_rolid"});
user.belongsTo(user_status, { as: "user_status", foreignKey: "user_statusid"});
user.belongsTo(user_visibility, { as: "user_visibility", foreignKey: "user_visibilityid"});

module.exports = user;
*/