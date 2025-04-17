import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utiles/generateToken.js";

// POST/ register
export const registerUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe requis !' });
    }

    try {
        //verifie si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        // Vérifier le format de l’email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Vérifier la longueur du mot de passe
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        //hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10)

        //créer un nouvel utilisateur
        const newUser = new User({
            email,
            password: hashedPassword,
        })

        //sauvegarde l'utilisateur dans le table MongoDB
        const savedUser = await newUser.save();

        // Réponse pour à la requette d'enregistrement
        res.status(201).json({
            _id: savedUser._id,
            email: savedUser.email,
            isAmin: savedUser.isAdmin,
            created_at: savedUser.created_at,
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    };
}

// POST/ Login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe requis !' });
    }

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET/ me
export const me = (req, res) => {
    if (req.user) {
        res.json({
            _id: req.user._id,
            email: req.user.email,
            isAdmin: req.user.isAdmin,
            created_at: req.user.created_at,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// GET/ users
// @desc    Get all users
// @route   GET /api/users
// @access  Private
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // exclut les mots de passe
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete a user by ID
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


