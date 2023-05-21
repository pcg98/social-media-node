const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_follower', {
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
    relationship_statusid: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 3,
      references: {
        model: 'relationship_status',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURDATE()'),
    }
  }, {
    sequelize,
    tableName: 'user_follower',
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
        name: "FKuser_follo285732",
        using: "BTREE",
        fields: [
          { name: "sourceid" },
        ]
      },
      {
        name: "FKuser_follo995249",
        using: "BTREE",
        fields: [
          { name: "targetid" },
        ]
      },
      {
        name: "FKuser_follo968642",
        using: "BTREE",
        fields: [
          { name: "relationship_statusid" },
        ]
      },
    ]
  });
};

