const User = require('../users/model/users.entity');

exports.getAdminRequests = async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {
        userType: 'admin',
      },
    });

    return res.json({
      ok: true,
      users,
    });
  } catch (err) {
    return next(err);
  }
};

exports.approveRequest = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'No such user exists',
      });
    }

    user.approved = true;

    await user.save();

    return res.json({
      ok: true,
    });
  } catch (err) {
    return next(err);
  }
};

exports.rejectRequest = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'No such user exists',
      });
    }
    user.approved = false;
    user.userType = "user";
    await user.save();

    return res.json({
      ok: true,
    });
  } catch (err) {
    return next(err);
  }
};