/* eslint-disable @typescript-eslint/no-misused-promises */

import UserService from '../service/UserService'
import { Express, NextFunction, Request, Response } from 'express'
import UserDto from '../dto/UserDto'
import bcrypt from 'bcrypt'
import { AuthService } from '../../auth/module'
import fromUserDtoToEntity from '../mapper/fromUserDtoToEntity'

export default class UserController {
  private readonly authService
  private readonly userService
  private readonly baseRoute
  constructor (userService: UserService, authService: AuthService) {
    this.authService = authService
    this.userService = userService
    this.baseRoute = '/user'
  }

  configureRoutes (app: Express): void {
    const BASEROUTE = this.baseRoute
    app.post(`${BASEROUTE}/signup`, this.signUp.bind(this))
    app.get(`${BASEROUTE}/records`, this.authService.authenticateToken, this.getRecords.bind(this))
  }

  async getRecords (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.userService.getUserById((req as Request & { user: { id: number } }).user.id)

      const records = await this.userService.getRecords(user)

      res.status(200)
      res.json({ records })
    } catch (err) {
      next(err)
    }
  }

  async signUp (req: Request, res: Response, next: NextFunction): Promise<void> {
    const userDto = new UserDto(req.body)

    try {
      userDto.validate()
      const salt = await bcrypt.genSalt()
      const hash = await bcrypt.hash(userDto.password, salt)
      userDto.password = hash
      const newUser = fromUserDtoToEntity(userDto)
      await this.userService.newUser(newUser)

      res.sendStatus(200)
    } catch (err) {
      next(err)
    }
  }
}
