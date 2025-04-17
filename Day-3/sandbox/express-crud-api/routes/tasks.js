import express from 'express';
import tasks from '../data/tasks.js';

const router = express.Router();

// Lister toutes les tâches
router.get('/', (req, res) => {
  res.json(tasks);
});

// Obtenir une tâche spécifique
router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).json({ error: "Tâche non trouvée" });
  res.json(task);
});

// Ajouter une nouvelle tâche
router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Le titre est requis" });

  const newTask = { id: tasks.length + 1, title };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Modifier une tâche existante
router.put('/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).json({ error: "Tâche non trouvée" });

  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Le titre est requis" });

  task.title = title;
  res.json(task);
});

// Supprimer une tâche
router.delete('/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Tâche non trouvée" });

  tasks.splice(index, 1);
  res.json({ message: "Tâche supprimée" });
});


export default router;