const { Model, DataTypes } = require('sequelize');
const db = require('../../../../db');
const Cart = require('../../cart/model/cart.entity');
const Product = require('../../products/model/products.entity');

class Orders extends Model {}
Orders.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isPurchased: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    timestamps: true,
  },
);
Orders.belongsTo(Product, { foreignKey: 'productId' });
Orders.belongsTo(Cart, { foreignKey: 'cartId' });

module.exports = Orders;
