import express from "express";
import dotenv from "dotenv"
import connectDB from "./db/connectDB";
import userRoutes from './routes/userRoutes.js';

//charger les variables d'evironnement
dotenv.config()

//Connection à la base de données
connectDB()

const app = express();

app.use(express.json)               // Lire les données JSON envoyé
app.use('/api/users', userRoutes);  // préfixe pour les routes des tâches

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

