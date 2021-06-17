const { Model, DataTypes } = require('sequelize');
const db = require('../../../../db');
const User = require('../../users/model/users.entity');

class Cart extends Model {}
Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    timestamps: true,
  },
);
Cart.belongsTo(User, { foreignKey: 'userId' });
module.exports = Cart;
