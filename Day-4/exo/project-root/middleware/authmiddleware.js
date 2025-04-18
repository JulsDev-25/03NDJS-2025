import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // Vérifie si le token est dans le header Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Récupère le token
      token = req.headers.authorization.split(' ')[1];

      if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
      }

      // Décode le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Cherche l'utilisateur (sans mot de passe)
      req.user = await User.findById(decoded.id)

      if (!req.user) {
        res.status(404).json({ message: 'User do not existe' })
      }

      next(); // Passe au contrôleur
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
};


// Vérifie si l'utilisateur est admin
export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: 'Not authorized as admin' });
    }
  };
  