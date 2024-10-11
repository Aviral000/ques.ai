const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtConfig = require('../config/jwtConfig');

class AuthService {
    static async signup(username, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        return newUser;
    }

    static async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id }, jwtConfig.secret, {
            expiresIn: jwtConfig.expiresIn,
        });

        return { user, token, isLoggedIn: true };
    }

    static async loggedUser(data) {
        try {
            const user = await User.findById(data);
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async updateUsername(userId, newUsername) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.username = newUsername;
        await user.save();
        return user;
    }
}

module.exports = AuthService;
