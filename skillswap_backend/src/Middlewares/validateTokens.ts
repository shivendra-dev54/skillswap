import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface customRequest extends Request{
    user?: any;
};

const validateTokens = (req: customRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'Authorization token is required' });
  }
};

export default validateTokens;