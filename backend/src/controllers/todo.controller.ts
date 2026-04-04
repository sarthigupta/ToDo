import type { Request, Response } from "express";
import prisma from "../lib/lib.js";
import { check, z } from "zod";
interface CustomRequest extends Request {
    body: {
        title: string;
        description: string;
        completed: boolean;
    };
    userId: number;
}

export const createTodo = async (req: CustomRequest, res: Response) => {
    try {
        const todoSchema = z.object({
            title: z.string().min(1, "Title is required"),
            description: z.string().min(1, "Description is required")
        });
        const parsedData = todoSchema.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({
                message: "Invalid input",
                success: false,
                errors: parsedData.error
            });
        }
        const { title, description } = parsedData.data;
        const todo = await prisma.todo.create({
            data: {
                title,
                description,
                user: {
                    connect: {
                        id: req.userId
                    }
                }
            }
        })
        if (!todo) {
            return res.status(404).json({
                message: "Todo not found",
                success: false
            })
        }
        res.status(201).json({
            message: "Todo created successfully",
            todo
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error in todo creation",
            success: false
        })
    }
}

export const getTodo = async (req: CustomRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }
        const todos = await prisma.todo.findMany({
            where: {
                user: {
                    id: req.userId
                }
            }
        })
        if (todos.length == 0) {
            return res.status(404).json({
                message: "Todo not found",
                success: false
            })
        }
        res.status(200).json({
            message: "Todo fetched successfully",
            todos
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error in get todo",
            success: false
        })
    }
}

export const deleteTodo = async (req: CustomRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "User not found",
                success: false
            })
        }
        const existingTodo = await prisma.todo.findFirst({
            where: {
                id: Number(req.params.id),
                userId: req.userId
            }
        })
        if (!existingTodo) {
            return res.status(404).json({
                message: "Todo not found",
                success: false
            })
        }
        const deleteTodo = await prisma.todo.delete({
            where: {
                id: existingTodo.id
            }
        })
        res.status(200).json({
            message: "Todo deleted successfully",
            deleteTodo
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error in deleting Todo",
            success: false
        })
    }
}

export const updateTodo = async (req: CustomRequest, res: Response) => {
    try {
        const { title, description } = req.body;
        const existingTodo = await prisma.todo.findFirst({
            where: {
                id: Number(req.params.id),
                userId: req.userId
            }
        })
        if (!existingTodo) {
            return res.status(404).json({
                message: "Todo not found",
                success: false
            })
        }
        const updateTodo = await prisma.todo.update({
            where: {
                id: existingTodo.id
            },
            data: {
                title: title,
                description: description
            }
        })
        res.status(200).json({
            message: "Todo updated successfully",
            updateTodo
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error in updation of Todo",
            success: false
        })

    }
}

export const markTodoUpdate = async (req: CustomRequest, res: Response) => {
    try {
        
        const { id } = req.params;
       
        const { completed } = req.body;        
        if (typeof completed !== "boolean") {
            return res.status(400).json({
                message: "Completed must be boolean",
                success: false
            });
        }
        if(!req.userId){
            return res.status(401).json({
                message: "User not found",
                success: false
            })  
        }        
        const existingTodo = await prisma.todo.findFirst({
            where: {
                id: Number(id),
                userId: req.userId
            }
        })
               
        if (!existingTodo) {
            return res.status(404).json({
                message: "Todo not found",
                success: false
            })
        }
                
        const updateTodo = await prisma.todo.update({
            where: {
                id: existingTodo.id
            },
            data: {
                completed: completed
            }
        })
                
        res.status(200).json({
            message: "Todo marked successfully",
            updateTodo
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error in updation of Todo",
            success: false,
            error
        })
    }
}
