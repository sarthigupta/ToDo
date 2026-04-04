import type { Request, Response } from "express";
interface CustomRequest extends Request {
    body: {
        title: string;
        description: string;
        completed: boolean;
    };
    userId: number;
}
export declare const createTodo: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getTodo: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteTodo: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateTodo: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const markTodoUpdate: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=todo.controller.d.ts.map