"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.refresh = exports.login = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const boom_1 = __importDefault(require("@hapi/boom"));
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
// export const getAll = async (active: boolean) => {
//     try {
//       if (active) {
//     return await prisma.user.findMany( { where : { active : true } } )
//       }
//       return await prisma.user.findMany()
//     } catch (error: any) {
//       console.log( error );
//       if ( error.code === 'P2025') {
//           throw Boom.notFound(' nothing to show my dear ')
//       } else {
//         throw (error)
//       }
//     }
//   }
const createUser = async (user) => {
    try {
        const { email, password, is_admin, name } = user;
        return await prisma.user.create({
            data: {
                email,
                password: await bcrypt.hash(user.password, 10),
                is_admin,
                name
            },
        });
    }
    catch (error) {
        if (error.code == "P2002") {
            throw boom_1.default.conflict("Email must be unique");
        }
        else {
            throw error;
        }
    }
};
exports.createUser = createUser;
async function login(email, passsword) {
    const user = await prisma.user.findFirstOrThrow({ where: { email } });
    console.log(user.password, passsword, ' are something wrong');
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(passsword, user.password);
    if (!passwordMatch) {
        // Password does not match
        // If you want to throw a http error, you can. This is throw internal server error
        throw Error("Password not correct");
    }
    // Generate a token
    const accessToken = jwt.sign({ userId: user.id, is_admin: user.is_admin }, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ userId: user.id, is_admin: user.is_admin }, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: "7d",
    });
    // Return the token to the client
    return { success: true, accessToken, refreshToken };
}
exports.login = login;
async function refresh(userId) {
    const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
    // Generate a token
    const accessToken = jwt.sign({ userId: user.id, isAdmin: user.is_admin }, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: '1d',
    });
    // Return the accessToken to the client
    return { success: true, accessToken };
}
exports.refresh = refresh;
// export const signup = async (req: Request, res: Response) => {
//   const { email, password } = req.body
//   const result = await prisma.user.create({
//       data: {
//           title,
//           email,
//           password: await bcrypt.hash(password as string, 10),
//       },
//   })
//   res.json(result)
// }
// export const update = async (id: number, todo: any) => {
//    try {
//     return await prisma.user.update({
//       data:{
//         title: user.title,
//         active: true
//       },
//       where:{
//           id: id
//       }
//     })
// }catch(error: any) {
//   console.log( error )
//   if ( error.code === 'P2025') {
//     throw Boom.notFound('Nothing to change my dear')
//    } else {
//     throw(error)
//    }
//  }
// }
const remove = async (userId) => {
    try {
        return await prisma.user.delete({ where: { id: userId } });
    }
    catch (error) {
        console.log(error);
        if (error.code === 'P2025') {
            throw boom_1.default.notFound(' No todos');
        }
        else {
            throw (error);
        }
    }
};
exports.remove = remove;
// export const findOne = async ( id: number ) => {
//   try {
//    return await prisma.user.findFirstOrThrow ({ where: {
//     id: id
//   },
// })
//  } catch (error: any){
//    console.log( error )
//    if ( error.code === 'P2025') {
//     throw Boom.notFound('Nothing posted my dear')
//    } else {
//     throw(error)
//    }
//  }
//  }
//# sourceMappingURL=user.service.js.map