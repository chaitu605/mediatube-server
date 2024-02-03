const adminMiddleWare = async (req, res, next) => {
  try {
    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied, User is not admin" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleWare;
