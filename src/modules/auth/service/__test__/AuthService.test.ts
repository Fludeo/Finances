import { Request, Response } from "express"
import User from "../../../user/entity/User"
import {  UserRepository, } from "../../../user/module"
import LoginDto from "../../dto/LoginDto"
import InvalidTokenError from "../../errors/InvalidTokenError"
import { AuthService } from "../../module"
import bcrypt from 'bcrypt'
import IncorrectPasswordError from "../../errors/IncorrectPasswordError"
import UserNotFound from "../../../user/errors/UserNotFound"
import  jwt  from "jsonwebtoken"
import InvalidRefreshTokenError from "../../errors/InvalidRefreshToken"


const mockAuthRepository : any = {

    saveRefreshToken: jest.fn(),
    removeRefreshToken: jest.fn()
}

const mockUserService: any = {
    userRepository: {} as UserRepository,
    newUser: jest.fn(),
    getUserByEmail: jest.fn(),
    comparePassword: jest.fn(),
    getUserById: jest.fn(),
    saveRefreshToken: jest.fn(),
    addRecord: jest.fn(),
    getRecords: jest.fn(),
}



const mockService = new AuthService(mockUserService,mockAuthRepository)



describe('Testing all methods in AuthService',  ()=>{


    test('Access Token generation and authentication', async ()=>{


       const user = new User(1,'leandro','leandro@gmail.com','pass',undefined,undefined,undefined,undefined)
       const response:any = {cookie: jest.fn()}
       const result =  await mockService.giveAccessToken(user,response)

       expect(mockUserService.saveRefreshToken).toBeCalled()
       expect(result).toHaveProperty('accessToken',`${result.accessToken}`)
          
       const req = { headers:  { authorization: `Bearer ${result.accessToken}`} }
       const res = {}
       const next = jest.fn()

       await mockService.authenticateToken(req as Request, res as Response, next)

       expect(next).toBeCalled()


    })


    test('Testing login method', async ()=>{

                  
           const req = { headers:  { authorization: ``} }
           const res = {}
           const next = jest.fn()
           await expect( mockService.authenticateToken(req as Request, res as Response, next)).rejects.toThrowError(InvalidTokenError)
           
        })


        test('Login success', async ()=>{

            const loginDto :LoginDto = {
                email:'user@email.com',
                password:'password',
                validate: jest.fn()
            }

            const salt = await bcrypt.genSalt()
            const hash = await bcrypt.hash(loginDto.password,salt)
            loginDto.password =  hash

            const salt2 = await bcrypt.genSalt()
            const hash2 = await bcrypt.hash(loginDto.password,salt2)

           await mockUserService.getUserByEmail.mockReturnValue({id:1,email:loginDto.email,hash:hash2})

           const res :any = {cookie:jest.fn()}

           const result = await mockService.login(loginDto,res)
          

          expect(res.cookie).toBeCalled()
          expect(mockUserService.getUserByEmail).toBeCalledWith(loginDto.email)
          expect(result).toHaveProperty('accessToken',`${result.accessToken}`)
         })



         test('Login Fail: Wrong password', async ()=>{

            const loginDto :LoginDto = {
                email:'user@email.com',
                password:'password',
                validate: jest.fn()
            }

            loginDto.password =  'wrong hash'

            const salt2 = await bcrypt.genSalt()
            const hash2 = await bcrypt.hash('password',salt2)

           await mockUserService.getUserByEmail.mockReturnValue({id:1,email:loginDto.email,hash:hash2})

           const res :any = {cookie:jest.fn()}
           
           await  expect( mockService.login(loginDto,res)).rejects.toThrowError(IncorrectPasswordError)
          
            
       
         })


         test('Login Fail: User does not exist', async ()=>{

            const loginDto :LoginDto = {
                email:'user@email.com',
                password:'password',
                validate: jest.fn()
            }



           await mockUserService.getUserByEmail.mockImplementation(()=>{throw new UserNotFound()})

           const res :any = {cookie:jest.fn()}
           
           await  expect( mockService.login(loginDto,res)).rejects.toThrowError(UserNotFound)
          
            
       
         })

         test('Logout: Remove refresh token', async ()=>{

     
            const mockRefreshToken = 'refreshtoken'

        
           
          const result = await mockService.logout(mockRefreshToken)
          
          expect(mockAuthRepository.removeRefreshToken).toBeCalledWith(mockRefreshToken)
       
         })

         test('Refresh Token', async ()=>{

          
     
            const mockRefreshToken = jwt.sign({id:1,email:'mock@email.com'}, String(process.env.REFRESH_TOKEN_SECRET),{expiresIn: 60*60*24*7})   

          const res :any = {cookie:jest.fn()}
          mockUserService.getUserByEmail.mockReturnValue({id:1,email:'mock@email.com',hash:'password'})
          const result = await mockService.refreshToken(mockRefreshToken,res)
          
          expect(mockAuthRepository.removeRefreshToken).toBeCalledWith(mockRefreshToken)
          expect(mockUserService.getUserByEmail).toBeCalled()
          expect(res.cookie).toBeCalled()
          expect(result).toHaveProperty('accessToken')
         })


         test('Invalid refresh token', async ()=>{

          
     
            const mockRefreshToken = 'invalidtoken'   

          const res :any = {cookie:jest.fn()}
       
          await expect(mockService.refreshToken(mockRefreshToken,res)).rejects.toThrowError(InvalidRefreshTokenError)
          
         
         })




})