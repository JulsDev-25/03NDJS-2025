import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utiles/generateToken.js";

//register
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

//Login
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