const User = require("../models/User");
const { verifyToken } = require("../utils/utility.function");

const sendResponseError = (statusCode, msg, res) => {
  res.status(statusCode || 400).send(!!msg ? msg : "Invalid input !!");
};

// const verifyUser = async (req, res, next) => {
//   const {authorization} = req.headers
//   if (!authorization) {
//     sendResponseError(401, 'You are not authorized ', res)
//     return
//   } else if (!authorization.startsWith('Bearer ')) {
//     sendResponseError(401, 'You are not authorized ', res)
//     return
//   }

//   try {
//     const payload = await verifyToken(authorization.split(' ')[1])
//     console.log(payload)
//     if (payload) {
//       const user = await User.findById(payload.id, {password: 0})

//       req['user'] = user

//       next()
//     } else {
//       sendResponseError(401, `you are not authorizeed`, res)
//     }
//   } catch (err) {
//     console.log('Error ', err)
//     sendResponseError(401, `Error ${err}`, res)
//   }
// }

const verifyUser = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log("Authorization header:", authorization);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return sendResponseError(401, "You are not authorized", res);
  }

  const token = authorization.split(" ")[1];

  try {
    const payload = await verifyToken(token);

    if (!payload?.id) {
      return sendResponseError(401, "Invalid token payload", res); 
    }

    const user = await User.findById(payload.id).select("-password");

    if (!user) {
      return sendResponseError(404, "User not found", res);
    }

    req.user = user; // Attach user to request object
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    sendResponseError(401, "Token verification failed", res);
  }
};

module.exports = {
  sendResponseError,
  verifyUser,
};
