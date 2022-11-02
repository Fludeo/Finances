
import { Express } from "express";
import { IDIContainer } from "rsdi";
import RecordController from "./controller/RecordController";
import RecordService from "./service/RecordService";
import RecordRepository from "./repository/RecordRepository";
import RecordModel from "./model/RecordModel.js";




const initRecordModule = (container:IDIContainer, app:Express ) : void=> {
    const controller : RecordController = container.get('RecordController')
    controller.configureRoutes(app)
}

export  {
    initRecordModule,
    RecordController,
    RecordService,
    RecordRepository,
    RecordModel
    }