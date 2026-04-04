import type { Request, Response, NextFunction } from "express";
interface CustomRequest extends Request {
    userId?: number;
}
export declare const authMiddleware: (req: CustomRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export {};
//# sourceMappingURL=auth.d.ts.map