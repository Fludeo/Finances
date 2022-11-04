require('dotenv').config({
    path: '.env.test'
});

import express, { Request,Response,NextFunction } from 'express';
import { initAuthModule } from '../auth/module'
import { initRecordModule } from '../record/module'
import { initUserModule } from '../user/module'

import ConfigureDIC from '../../config/DIconfig'
import { IDIContainer } from 'rsdi'
import cors from 'cors';


export default function AppBootstrapper() {

    const app = express()

    const container = ConfigureDIC() as IDIContainer;
    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    initAuthModule(container, app);
    initRecordModule(container, app);
    initUserModule(container,app);

    app.use(function (err: any , req : Request, res : Response , next :NextFunction){
 
        console.log(err)
        res.status(err.code)
        res.json(err)
      
      })
  

    return {container, app};
}