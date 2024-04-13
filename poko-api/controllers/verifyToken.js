const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // get token from Bearer(WHEN USING BEARER)
    // verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json("token is not valid");
      // Otherwise, attach the decoded user information (user) to the req object (req.user)
      req.user = user; // The decoded user can now be gotten from the req object
      next();
    });
  } else {
    return res.status(401).json("you are not authenticated");
  }
};

// authorization

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json("you are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res
        .status(401)
        .json("you are not allowed to do that! Admins only");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
