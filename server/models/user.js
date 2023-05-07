const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/config');

const User = sequelize.define('user', {
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

module.exports = User;