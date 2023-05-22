const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('conversations', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    sourceid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    targetid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    body: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Body del mensaje"
    }
  }, {
    sequelize,
    tableName: 'conversations',
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
        name: "FKconversati84423",
        using: "BTREE",
        fields: [
          { name: "sourceid" },
        ]
      },
      {
        name: "FKconversati606185",
        using: "BTREE",
        fields: [
          { name: "targetid" },
        ]
      },
    ]
  });
};
