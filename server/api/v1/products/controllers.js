const User = require('../users/model/users.entity');
const Product = require('./model/products.entity');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        isActive: true,
      },
      include: [
        {
          model: User,
          required: true,
        },
      ],
    });

    return res.status(200).json({
      ok: true,
      products,
    });
  } catch (err) {
    return next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const { user } = req;
    const { name, price, image } = req.body;

    const product = await Product.create({
      name,
      price,
      ownerId: user.id,
      image,
    });

    return res.status(201).json({
      ok: true,
      product,
    });
  } catch (err) {
    return next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByPk(productId);
    product.isActive = false;
    await product.save();

    return res.status(200).json({
      ok: true,
    });
  } catch (err) {
    return next(err);
  }
};
