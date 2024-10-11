require('dotenv').config();
const express = require('express');
const passport = require('passport');
const connectDB = require('./config/mongo');
const passportConfig = require('./config/passport');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/project');

const app = express();

app.use(cors());
app.use(express.json());

passportConfig(passport);

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
