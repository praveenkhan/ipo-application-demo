import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // support tokens that use either `id` or `userId` in the payload
    const userId = decoded.userId || decoded.id;
    req.userId = userId;
    // populate `req.user` so controllers can access `req.user.id`
    req.user = { id: userId };
    req.role = decoded.role || decoded?.role;

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
