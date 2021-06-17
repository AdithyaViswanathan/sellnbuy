const Cart = require('./model/cart.entity');

exports.addCart = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.create({
      userId,
    });

    return res.status(201).json({
      ok: true,
      cart,
    });
  } catch (err) {
    return next(err);
  }
};
