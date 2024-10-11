const AuthService = require('../services/authService');

class AuthController {
    static async signup(req, res) {
        try {
            const { username, email, password } = req.body;
            const user = await AuthService.signup(username, email, password);
            res.status(201).json({ message: 'User created successfully', user });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const { user, token, isLoggedIn } = await AuthService.login(email, password);
            res.status(200).json({ user, token, isLoggedIn });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async userDetail(req, res) {
        try {
            const user = await AuthService.loggedUser(req.user._id);
            res.status(200).json({ data: user });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async editUsername(req, res) {
        try {
          const userId = req.user._id; 
          const { username } = req.body;
    
          if (!username || username.length < 6) {
            return res.status(400).json({ message: 'Username must be at least 6 characters long.' });
          }
    
          const updatedUser = await AuthService.updateUsername(userId, username);
          res.status(200).json({ message: 'Username updated successfully', user: updatedUser });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
}

module.exports = AuthController;
