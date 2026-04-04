import express from 'express'
import dotenv from 'dotenv' 
import userRoutes from './routes/user.routes.js';
import todoRoutes from './routes/todo.routes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.send('OK Server is running');
});
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/todo',todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

