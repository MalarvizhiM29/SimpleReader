import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.header("authorization");

  if (!token) {
    return res.status(403).json({
      errors: [
        {
          msg: "unauthorized: Token not found",
        },
      ],
    });
  }

  token = token.split(" ")[1];

  console.log(token);

  try {
    const user = (await JWT.verify(
      token,
      process.env.JWT_SECRET as string
    )) as { email: string };

    console.log(user);

    (req as Request & { user: { email: string } }).user = { email: user.email };
    next();
  } catch (error) {
    return res.status(403).json({
      errors: [
        {
          msg: "unauthorized: Invalid token",
        },
      ],
    });
  }
};

export default checkAuth;
