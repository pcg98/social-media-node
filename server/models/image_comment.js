const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('image_comment', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    body: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    user_imageid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_image',
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
    tableName: 'image_comment',
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
        name: "FKimage_comm259430",
        using: "BTREE",
        fields: [
          { name: "user_imageid" },
        ]
      },
      {
        name: "FKimage_comm153662",
        using: "BTREE",
        fields: [
          { name: "userid" },
        ]
      },
    ]
  });
};
