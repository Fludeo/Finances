require('dotenv').config({
    path: '.env.test'
});

import AuthModel from '../auth/model/AuthModel'
import RecordModel from '../record/model/RecordModel'
import UserModel from '../user/model/UserModel'

import { initAuthModule } from '../auth/module'
import { initRecordModule } from '../record/module'
import { initUserModule } from '../user/module'

import ConfigureDIC from '../../config/DIconfig'
import { IDIContainer } from 'rsdi'


export default async function bootstrapTests() {

    const app :any = jest.fn();
    app.get = jest.fn();
    app.post = jest.fn();

    const container = ConfigureDIC() as IDIContainer;

    const sequelize = container.get('Sequelize');
    await AuthModel.setup(sequelize).sync({ force: true });
    await RecordModel.setup(sequelize).sync({ force: true });
    await UserModel.setup(sequelize).sync({ force: true });

    initAuthModule(container, app);
    initRecordModule(container, app);
    initUserModule(container,app);
    return container;
}