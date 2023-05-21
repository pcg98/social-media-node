const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_report', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
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
    reason: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "ENum distintos motivos en ele backend, aqui va a ser varchar"
    },
    explication: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_report',
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
        name: "FKuser_repor362073",
        using: "BTREE",
        fields: [
          { name: "sourceid" },
        ]
      },
      {
        name: "FKuser_repor918908",
        using: "BTREE",
        fields: [
          { name: "targetid" },
        ]
      },
    ]
  });
};

