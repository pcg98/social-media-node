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
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: "nickname"
    },
    telephone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "telephone"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    bio: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    sex: {
      type: DataTypes.ENUM('men','woman','other'),
      allowNull: false,
      comment: "It should be woman, men or other"
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
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    profile_picture: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "default.jpg"
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURDATE()'),
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
};
