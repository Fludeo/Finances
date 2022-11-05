
import AuthRepository from "../repository/AuthRepository";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserService } from "../../user/module";
import LoginDto from "../dto/LoginDto";
import User from "../../user/entity/User";
import { NextFunction, Request, Response } from "express";
import { IncorrectPasswordError, InvalidRefreshTokenError, InvalidTokenError } from "../errors/_index";


export default class AuthService {
   
    private authRepository;
    private userService;

    
        constructor(userService : UserService,authRepository :AuthRepository){
            this.userService = userService;
            this.authRepository = authRepository
        }


        async login(userLogin :LoginDto,res :Response){

            const checkUser = await this.userService.getUserByEmail(userLogin.email) 

            if(!(await comparePassword(userLogin.password,checkUser.hash))){
                throw new IncorrectPasswordError()
            }
         

           const accessToken =  await this.giveAccessToken(checkUser,res)
           return accessToken
        }



async logout (refreshToken :string){

       
        await this.authRepository.removeRefreshToken(refreshToken)
      
}




      
        async giveAccessToken (user : User , res : Response){
       
          const accessToken = generateAccessToken(user) 
          const refreshToken = generateRefreshToken(user)

          await setCookies(res,refreshToken)
      
          await this.userService.saveRefreshToken(user,refreshToken)
          
          return {accessToken:accessToken}
        }
          

       async authenticateToken(req : Request , res : Response, next : NextFunction){
 
            const authHeader : string | undefined = req.headers['authorization']
            if(authHeader === undefined) {throw new InvalidTokenError()}
            const token : string = authHeader && authHeader.split(' ')[1]
          
             jwt.verify(token , String(process.env.ACCESS_TOKEN_SECRET),  (err, user)=>{

                if(err){
                    throw new InvalidTokenError()
                }
                
                (req as Request & {user:any}).user =  user
                next()
               
            })
            
          }
    
          async refreshToken (refreshToken : string , res : Response){

            await this.authRepository.removeRefreshToken(refreshToken)
    
            let userToRefresh : any

           jwt.verify(refreshToken, String(process.env.REFRESH_TOKEN_SECRET),  (err,user)=>{

                if(err){ throw new InvalidRefreshTokenError()}
          
                 userToRefresh = user
               
            })
            
           const user = await this.userService.getUserByEmail(userToRefresh.email) 
           const accessToken = await this.giveAccessToken(user,res)
  
           return accessToken

          }






    }


    function generateAccessToken (user : User){
        const accesToken = jwt.sign({id:user.id,email:user.email}, String(process.env.ACCESS_TOKEN_SECRET), {expiresIn: 60*15})   
        return accesToken   
    }
    function generateRefreshToken (user : User){
        const accesToken = jwt.sign({id:user.id,email:user.email}, String(process.env.REFRESH_TOKEN_SECRET),{expiresIn: 60*60*24*7})   
        return accesToken   
    }

 async function comparePassword (hash1:string,hash2:string){
    const result = await bcrypt.compare(hash1,hash2)
    return result
 }
 

   async function setCookies (res : Response, refreshToken :string){
        res.cookie(String(process.env.HTTPONLY_COOKIE_NAME), refreshToken,{
        httpOnly:true,
        secure: true,
        path:"/auth/session",
        expires: new Date(new Date().getTime() + 60*60*24*7 * 1000)
    })


    }