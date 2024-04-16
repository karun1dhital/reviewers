import { NextFunction, Request, Response } from "express";
export declare const createContact: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const remove: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare function createReview(arg0: string, arg1: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>, authenticateToken: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Response<any, Record<string, any>> | undefined, createReview: any): void;
//# sourceMappingURL=contact.controller.d.ts.map