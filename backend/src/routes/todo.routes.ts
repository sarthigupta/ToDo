import express from 'express'
import { createTodo, getTodo, deleteTodo, updateTodo, markTodoUpdate } from '../controllers/todo.controller.js';
import { authMiddleware } from '../middleware/auth.js';
const router = express.Router()


router.post('/create',authMiddleware, createTodo as any);
router.get('/get',authMiddleware, getTodo as any);
router.delete('/delete/:id',authMiddleware, deleteTodo as any);
router.put('/update/:id',authMiddleware, updateTodo as any);
router.put('/updateTodo/:id',authMiddleware,markTodoUpdate as any);
export default router;