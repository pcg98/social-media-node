const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_suspension', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    untilDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    user_reportid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_report',
        key: 'id'
      }
    },
    user_reportsourceid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user_report',
        key: 'sourceid'
      }
    },
    user_reporttargetid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user_report',
        key: 'targetid'
      }
    }
  }, {
    sequelize,
    tableName: 'user_suspension',
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
        name: "FKuser_suspe277745",
        using: "BTREE",
        fields: [
          { name: "userid" },
        ]
      },
      {
        name: "FKuser_suspe528343",
        using: "BTREE",
        fields: [
          { name: "user_reportid" },
          { name: "user_reportsourceid" },
          { name: "user_reporttargetid" },
        ]
      },
    ]
  });
};
