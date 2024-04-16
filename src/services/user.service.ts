import { PrismaClient } from "@prisma/client";
import Boom from "@hapi/boom";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
// import { createTodoDtoBody } from "../validator/create-user.validator";
import { z } from "zod";
import { createUserDtoBody } from "../validator/create-user.validator";
const prisma = new PrismaClient();

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

export const createUser = async (user: z.infer<typeof createUserDtoBody>) => {
  try {
    const {  email, password, is_admin, name} = user;
    
    return await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash(user.password as string, 10),
        is_admin,
        name
      },
    });
  } catch (error: any) {
    if (error.code == "P2002") {
      throw Boom.conflict("Email must be unique");
    } else {
      throw error;
    }
  }
};

export async function login(email: string, passsword: string) {
  const user = await prisma.user.findFirstOrThrow({ where: { email } });
  console.log(user.password, passsword, ' are something wrong')
  // Compare the provided password with the stored hashed password
  const passwordMatch = await bcrypt.compare(passsword, user.password);

  if (!passwordMatch) {
    // Password does not match
    // If you want to throw a http error, you can. This is throw internal server error
    throw Error("Password not correct");
  }

  // Generate a token
  const accessToken= jwt.sign({ userId: user.id, is_admin: user.is_admin },
    process.env.ACCESS_TOKEN_KEY as string,
      {
    expiresIn: "1d",
  });

  const refreshToken= jwt.sign({ userId: user.id, is_admin: user.is_admin },
    process.env.ACCESS_TOKEN_KEY as string,{
   expiresIn: "7d",
 });

  // Return the token to the client
  return { success: true, accessToken,refreshToken };
}

export async function refresh(userId: number) {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } })


  // Generate a token
  const accessToken = jwt.sign(
      { userId: user.id, isAdmin: user.is_admin },
      process.env.ACCESS_TOKEN_KEY as string,
      {
          expiresIn: '1d',
      }
  )


  // Return the accessToken to the client
  return { success: true, accessToken }
}

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

export const remove = async ( userId: number ) => {
 try {
  return await prisma.user.delete ({ where: { id: userId  } })

  

} catch (error: any){
  console.log( error );

  if ( error.code === 'P2025') {
    throw Boom.notFound(' No todos')
  } else {
    throw(error)
  }
}
}

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
