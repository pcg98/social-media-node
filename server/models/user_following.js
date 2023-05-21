const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_following', {
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURDATE()'),
    }
  }, {
    sequelize,
    tableName: 'user_following',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sourceid" },
          { name: "targetid" },
        ]
      },
      {
        name: "FKuser_follo659541",
        using: "BTREE",
        fields: [
          { name: "targetid" },
        ]
      },
    ]
  });
};
