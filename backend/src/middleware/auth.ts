import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
    userId?: number;
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authentication token is missing or invalid",
                success: false
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Authentication token is missing",
                success: false
            });
        }

        if (!process.env.JWT_SECRET) {
            console.error("FATAL ERROR: JWT_SECRET is not defined.");
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
        
        if (!decodedToken.id) {
            return res.status(401).json({
                message: "Invalid token payload",
                success: false
            });
        }

        req.userId = decodedToken.id;
        return next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: "Session expired, please login again",
                success: false
            });
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }
        
        console.error("Unexpected error in auth middleware:", error);
        return res.status(500).json({
            message: "Error during authentication",
            success: false
        });
    }
}
