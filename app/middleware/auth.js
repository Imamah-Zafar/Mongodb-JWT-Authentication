import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token = req.headers["auth-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token. Could not authenticate" });
    }
    req.userId = decoded.id;
    next();
  });
};


