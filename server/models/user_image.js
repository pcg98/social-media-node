const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_image', {
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
    title: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURDATE()'),
    }
  }, {
    sequelize,
    tableName: 'user_image',
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
        name: "FKuser_image936503",
        using: "BTREE",
        fields: [
          { name: "userid" },
        ]
      },
    ]
  });
};
