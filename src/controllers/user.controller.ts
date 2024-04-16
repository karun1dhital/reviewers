import { NextFunction, Request, Response } from "express";
import * as UserService from "../services/user.service";
import HttpStatusCodes from "http-status-codes";


export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = req.body;
    console.log(req.body, " is request body");
    const users = await UserService.createUser(user);
    res.status(HttpStatusCodes.CREATED).send(users);
  } catch (error: any) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const { email, password }: { email: string; password: string } =
            req.body
        const { accessToken,refreshToken} = await UserService.login(email, password)
        res.cookie('refreshToken',refreshToken,
        {httpOnly:true,path:'/refresh'})

        res.json(accessToken)
    } catch (error) {
        next(error)
    }
  }
  export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id)
    console.log(userId, ' request params ko id yo ho hai')
    const user = await UserService.remove(userId)
    res.send()
  } catch (error) {
    next(error)
  }
  }

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