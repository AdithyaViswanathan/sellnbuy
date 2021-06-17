const { Model, DataTypes } = require('sequelize');
const db = require('../../../../db');
const User = require('../../users/model/users.entity');

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      required: true,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    timestamps: true,
  },
);

Product.belongsTo(User, { foreignKey: 'ownerId' });

module.exports = Product;
