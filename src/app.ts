import express, { NextFunction, Request, Response } from 'express'

import cors from 'cors'

import ConfigureDIC from './config/DIconfig'
import { initAuthModule } from './modules/auth/module'
import { initRecordModule } from './modules/record/module'
import { initUserModule } from './modules/user/module'
import { IDIContainer } from 'rsdi'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
export const app = express()
const port: string | undefined = String(process.env.PORT)

// DIcontainer initialization

const container = ConfigureDIC()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes initialization
initAuthModule(container as IDIContainer, app)
initRecordModule(container as IDIContainer, app)
initUserModule(container as IDIContainer, app)

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  console.log(err)
  res.status(err.code)
  res.json(err)
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
