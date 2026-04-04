import type { Request, Response } from "express";
interface CustomRequest extends Request {
    body: {
        name: string;
        email: string;
        password: string;
    };
}
export declare const signup: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const signin: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=user.controller.d.ts.map