import express from 'express';
import tasksRoutes from "./routes/tasks.js"
import logger from "./middlewares/logger.js"

const app = express();

app.use(express.json());        // Lire les données JSON envoyé
app.use(logger);                // middlewares personnalisé utilé à chaque entré d'une requette
app.use('/tasks', tasksRoutes); // préfixe pour les routes des tâches

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Serveur démaré sur http://localhost:${PORT}`);
})