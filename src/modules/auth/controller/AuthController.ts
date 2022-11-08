/* eslint-disable @typescript-eslint/no-misused-promises */

import AuthService from '../service/AuthService'
import { Express, NextFunction, Request, Response } from 'express'
import InvalidRefreshTokenError from '../errors/InvalidRefreshToken'
import LoginDto from '../dto/LoginDto'

export default class AuthController {
  private readonly authService
  private readonly baseRoute

  constructor (authService: AuthService) {
    this.authService = authService
    this.baseRoute = '/auth'
  }

  configureRoutes (app: Express): void {
    const BASEROUTE = this.baseRoute
    app.post(`${BASEROUTE}/login`, this.login.bind(this))
    app.post(`${BASEROUTE}/session`, this.session.bind(this))
  }

  async login (req: Request, res: Response, next: NextFunction): Promise<any> {
    console.log(req.body)
    const loginDto = new LoginDto(req.body)

    try {
      loginDto.validate()
      const token = await this.authService.login(loginDto, res)
      res.status(200)
      res.json(token)
    } catch (err) {
      next(err)
    }
  }

  async logout (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const cookie = req.headers.cookie
      res.clearCookie(String(process.env.HTTPONLY_COOKIE_NAME), { httpOnly: true, secure: true, path: '/auth/session' })

      const httpOnlyToken = cookie?.split('=')[1]

      await this.authService.logout(httpOnlyToken as string)

      res.status(200)
      res.send()
    } catch (err) {
      next(err)
    }
  }

  async session (req: Request, res: Response, next: NextFunction): Promise<any> {
    const cookie = req.headers.cookie
    try {
      if (cookie === undefined) {
        throw new InvalidRefreshTokenError()
      }
      if (req.body.logout === true) { return await this.logout(req, res, next) }
      const httpOnlyToken: string = cookie?.split('=')[1]

      const newAccesToken = await this.authService.refreshToken(httpOnlyToken, res)

      res.status(200)
      res.json(newAccesToken)
    } catch (err) {
      next(err)
    }
  }
}
