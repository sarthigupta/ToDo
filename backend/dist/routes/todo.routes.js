import express from 'express';
import { createTodo, getTodo, deleteTodo, updateTodo, markTodoUpdate } from '../controllers/todo.controller.js';
import { authMiddleware } from '../middleware/auth.js';
const router = express.Router();
router.post('/create', authMiddleware, createTodo);
router.get('/get', authMiddleware, getTodo);
router.delete('/delete/:id', authMiddleware, deleteTodo);
router.put('/update/:id', authMiddleware, updateTodo);
router.put('/updateTodo/:id', authMiddleware, markTodoUpdate);
export default router;
//# sourceMappingURL=todo.routes.js.map