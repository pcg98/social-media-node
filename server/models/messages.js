const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('messages', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    conversationid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'conversations',
        key: 'id'
      }
    },
    sourceid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'conversations',
        key: 'senderid'
      }
    },
    targetid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'conversations',
        key: 'targetid'
      }
    },
    body: {
      type: DataTypes.STRING(180),
      allowNull: false
    },
    is_see: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()'),
    }
  }, {
    sequelize,
    tableName: 'messages',
    timestamps: false,
    indexes: [
      {
        name: "FKmessages361119",
        using: "BTREE",
        fields: [
          { name: "conversationid" },
          { name: "sourceid" },
          { name: "targetid" },
        ]
      },
    ]
  });
};

