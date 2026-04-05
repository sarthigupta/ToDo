import prisma from "../lib/lib.js";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
interface CustomRequest extends Request {
    body: {
        name: string;
        email: string;
        password: string;
    }

}
export const signup = async (req: CustomRequest, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        res.status(201).json({
            message: "User created successfully",
            user
        });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message: "Error in user creation",
            success: false
        })
    }
}

export const signin = async (req: CustomRequest, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password",
                success: false
            })
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
        res.status(200).json({
            message: "User logged in successfully",
            user,
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error in user login",
            success: false
        })
    }   
}
