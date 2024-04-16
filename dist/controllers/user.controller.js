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
exports.remove = exports.login = exports.createUser = void 0;
const UserService = __importStar(require("../services/user.service"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createUser = async (req, res, next) => {
    try {
        const user = req.body;
        console.log(req.body, " is request body");
        const users = await UserService.createUser(user);
        res.status(http_status_codes_1.default.CREATED).send(users);
    }
    catch (error) {
        next(error);
    }
};
exports.createUser = createUser;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken } = await UserService.login(email, password);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, path: '/refresh' });
        res.json(accessToken);
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const remove = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        console.log(userId, ' request params ko id yo ho hai');
        const user = await UserService.remove(userId);
        res.send();
    }
    catch (error) {
        next(error);
    }
};
exports.remove = remove;
//   export const update = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//     const user: any = req.body
//     const id = Number(req.params.id)
//     const users = await UserService.update(id, user)
//     } catch(error) {
//       next(error)
//     }
//   }
// export const findOne =async (req: Request, res: Response, next: NextFunction) => {
//   try {
//       const  id  = Number(req.params.id);
//       const users =  await UserService.findOne(id);
//   } catch (error: any) {
//     next(error);
//   }
//   }
// export const getAll = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const activeStatus = req.query.active
//     const users = await UserService.getAll(Boolean(activeStatus))
//   } catch (error) {
//     next (error)
//   }
//   }
//# sourceMappingURL=user.controller.js.map