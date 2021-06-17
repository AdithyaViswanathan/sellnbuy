const Product = require('../products/model/products.entity');
const User = require('../users/model/users.entity');

exports.getUserProducts = async (req, res, next) => {
  try {
    const { user } = req;
    const products = await Product.findAll({
      where: {
        ownerId: user.id,
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
