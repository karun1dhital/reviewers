import { z } from "zod";
import { createUserDtoBody } from "../validator/create-user.validator";
export declare const createUser: (user: z.infer<typeof createUserDtoBody>) => Promise<{
    id: number;
    name: string;
    email: string;
    password: string;
    is_admin: boolean;
}>;
export declare function login(email: string, passsword: string): Promise<{
    success: boolean;
    accessToken: string;
    refreshToken: string;
}>;
export declare function refresh(userId: number): Promise<{
    success: boolean;
    accessToken: string;
}>;
export declare const remove: (userId: number) => Promise<{
    id: number;
    name: string;
    email: string;
    password: string;
    is_admin: boolean;
}>;
//# sourceMappingURL=user.service.d.ts.map