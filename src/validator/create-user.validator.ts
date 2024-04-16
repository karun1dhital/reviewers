/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { z } from 'zod'

export const createUserDtoBody = z.object({
    name: z.string({
        required_error: 'name is required',
    }),
    email: z.string({
        required_error: 'email is required',
    }),
    password: z.string({
        required_error: 'password is required',
    }),
    is_admin: z.boolean().optional().default(false)        
}).strict()

export const createUserDto = z.object({
    body: createUserDtoBody 
})