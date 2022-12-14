/* eslint-disable @typescript-eslint/no-misused-promises */

import RecordService from '../service/RecordService'
import { Application, NextFunction, Request, Response } from 'express'
import { AuthService } from '../../auth/module'
import RecordDto from '../dto/RecordDto'
import FromRecordDtoToEntity from '../mapper/fromRecordDtotoEntity'

export default class RecordController {
  private readonly authService
  private readonly recordService
  private readonly baseRoute
  constructor (recordService: RecordService, authService: AuthService) {
    this.authService = authService
    this.recordService = recordService
    this.baseRoute = '/record'
  }

  configureRoutes (app: Application): void {
    const BASEROUTE = this.baseRoute
    app.get(`${BASEROUTE}/balance`, this.authService.authenticateToken, this.getBalance.bind(this))
    app.get(`${BASEROUTE}/get/:quantity?/type/:type?/category/:category?`, this.authService.authenticateToken, this.getRecords.bind(this))
    app.delete(`${BASEROUTE}/delete/:id`, this.authService.authenticateToken, this.deleteRecordById.bind(this))
    app.post(`${BASEROUTE}/new`, this.authService.authenticateToken, this.addRecord.bind(this))
    app.put(`${BASEROUTE}/update`, this.authService.authenticateToken, this.updateRecord.bind(this))
  }

  async updateRecord (req: Request, res: Response, next: NextFunction): Promise<void> {
    const recordDto = new RecordDto(req.body)

    try {
      recordDto.validate()
      await this.recordService.updateRecord(FromRecordDtoToEntity(recordDto))
      res.sendStatus(200)
    } catch (err) {
      next(err)
    }
  }

  async getRecords (req: Request, res: Response, next: NextFunction): Promise<void> {
    const filters: any = { where: {} }
    req.params.quantity !== undefined && (filters.limit = Number(req.params.quantity));

    (req as Request & { user: any }).user.id !== undefined && (filters.where.user_id = (req as Request & { user: any }).user.id)

    req.params.type !== undefined && (filters.where.type = req.params.type)

    req.params.category !== undefined && (filters.where.category = req.params.category)

    console.log(filters)

    try {
      const records = await this.recordService.getRecords(filters)

      res.status(200)
      res.json({ records })
    } catch (err) {
      next(err)
    }
  }

  async getBalance (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = (req as Request & { user: any }).user
      const balance = await this.recordService.getBalance(user)
      res.status(200)
      res.json({ balance })
    } catch (err) {
      next(err)
    }
  }

  async addRecord (req: Request, res: Response, next: NextFunction): Promise<void> {
    const recordDto = new RecordDto(req.body)
    const user = (req as Request & { user: any }).user
    try {
      recordDto.validate()
      const record = FromRecordDtoToEntity(recordDto)
      await this.recordService.addRecord(record, user)

      res.sendStatus(200)
    } catch (err) {
      next(err)
    }
  }

  async deleteRecordById (req: Request, res: Response, next: NextFunction): Promise<void> {
    const recordId: number = Number(req.params.id)
    try {
      await this.recordService.deleteRecordById(recordId)
      res.sendStatus(200)
    } catch (err) {
      next(err)
    }
  }
}
