
import AuthService from "../service/AuthService";
import { Express, NextFunction, Request, Response } from "express";
import InvalidRefreshTokenError from "../errors/InvalidRefreshToken";
import LoginDto from "../dto/LoginDto";



export default class AuthController {

    private authService;
    private baseRoute;

    constructor(authService: AuthService ){
        this.authService = authService
        this.baseRoute = '/auth'
    }

    configureRoutes(app : Express ){
       
            const BASEROUTE = this.baseRoute;
            app.post(`${BASEROUTE}/login`, this.login.bind(this));
            app.post(`${BASEROUTE}/session`, this.session.bind(this));
          
    }

    


 async login(req : Request , res: Response, next : NextFunction){
        console.log(req.body)
    const loginDto = new LoginDto( req.body )
    
try{
loginDto.validate()
const token = await this.authService.login(loginDto,res)
res.status(200)
res.json(token)

}
catch(err){
  next(err)
}
}


 async logout(req : Request , res: Response, next : NextFunction){
  
 
try{
  const cookie = req.headers['cookie']
  res.clearCookie( String( process.env.HTTPONLY_COOKIE_NAME ) , {httpOnly:true,secure:true,path:'/auth/session'})
  
 
  const httpOnlyToken = cookie && cookie.split('=')[1]
  if(httpOnlyToken === undefined){
    throw new InvalidRefreshTokenError()
  }

await this.authService.logout(httpOnlyToken)

res.status(200)
res.send()

}
catch(err){
next(err)
}
}



async session (req : Request , res: Response, next : NextFunction){

    if(req.body.logout){return this.logout(req,res,next) }
    
   try{
    const cookie = req.headers['cookie']
    
    if(cookie===undefined){
      throw new InvalidRefreshTokenError()
    }  
    const httpOnlyToken: string  = cookie && cookie.split('=')[1]
    const newAccesToken = await this.authService.refreshToken(httpOnlyToken,res)
    
    res.status(200)
    res.json(newAccesToken)
    
    }
    catch(err){
      next(err)
    }

}



}
