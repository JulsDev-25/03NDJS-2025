import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // Vérifie si le token est dans le header Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Récupère le token
      token = req.headers.authorization.split(' ')[1];

      // Décode le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Cherche l'utilisateur (sans mot de passe)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Passe au contrôleur
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
