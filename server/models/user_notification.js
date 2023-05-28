const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_notification', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    sourceid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    targetid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    is_see: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    notification_objectid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'notification_object',
        key: 'id'
      }
    },
    entity_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURDATE()'),
    }
  }, {
    sequelize,
    tableName: 'user_notification',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "sourceid" },
          { name: "targetid" },
        ]
      },
      {
        name: "FKuser_notif8514",
        using: "BTREE",
        fields: [
          { name: "sourceid" },
        ]
      },
      {
        name: "FKuser_notif889263",
        using: "BTREE",
        fields: [
          { name: "targetid" },
        ]
      },
      {
        name: "FKuser_notif219994",
        using: "BTREE",
        fields: [
          { name: "notification_objectid" },
        ]
      },
    ]
  });
};
