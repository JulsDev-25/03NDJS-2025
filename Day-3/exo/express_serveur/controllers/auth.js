import crypto from "crypto";
import User from "../models/User.js"

export async function register (req, res) {
    const { email, password, isAdmin } = req.body;

    try {
	const userExist = await User.findOne({ email });
	if (userExist)
	   return res.status(500).json({
		error: "User already exists",
	   });

	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = await User.create({
	    email,
	    password: hashedPassword,
	    isAdmin,
	});

	res.status(201).json({
	    succes: true,
	    message: "User Registered",
	    user: {
		email: newUser.email,
	    },
	});
    } catch (err) {
	res.status(500).json({
	   error: "Registration failled",
	});
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
	res.status(400).json({
	    error: "Email or Password Mission",
	});
    }

    try {
	const theUser = await User.findOne({ email }).select("+password");
	if (!the
