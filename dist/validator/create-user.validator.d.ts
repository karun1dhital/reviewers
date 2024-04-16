import { z } from 'zod';
export declare const createUserDtoBody: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    is_admin: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strict", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
    is_admin: boolean;
}, {
    name: string;
    email: string;
    password: string;
    is_admin?: boolean | undefined;
}>;
export declare const createUserDto: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        is_admin: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strict", z.ZodTypeAny, {
        name: string;
        email: string;
        password: string;
        is_admin: boolean;
    }, {
        name: string;
        email: string;
        password: string;
        is_admin?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
        email: string;
        password: string;
        is_admin: boolean;
    };
}, {
    body: {
        name: string;
        email: string;
        password: string;
        is_admin?: boolean | undefined;
    };
}>;
//# sourceMappingURL=create-user.validator.d.ts.map