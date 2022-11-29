# Finances (Backend)
TypeScript version 
# How to run the project
- Clone repository or download zip. 
- Install the project with <code>npm install</code>
- Create .env and .env.test (in root folder) files with variables listed in .env.dist
- Set .env PROJECT_STATUS = development and .env.test PROJECT_STATUS = test
- Run server with <code>npm run dev</code> or <code>npm run start</code> (start does not keep track of changes in code)

# Introduction
This is the backend repository of https://fludeo.github.io/Finances_app/ webApp (frontend repo: https://github.com/Fludeo/Finances_app). The app is a basic Crud for tracking personal finance records. Signup or Login with: email: test@email.com, password: qwerty1234 to see an account with some data.

# Details
This app (server) is built with TypeScript, Node.js (using Express.js as lightweight framework) and rsdi. 
Sqlite was used through the ORM Sequelize to store Data and sessions. Sessions are implemented with jsonwebtoken using the access-token / refresh-token strategy.
On Login, the server sets a refresh-token inside a http-only-cookie. A user can have multiple sessions in different devices.
The app is tested with supertest, and jest. Use <code>npx jest</code> to run all tests. Run <code>npm run start:test</code> to run the api in test mode for e2e testing.

# C4 diagram

![Architecture-Page-1](https://user-images.githubusercontent.com/55941066/200713133-f7c55fd7-c670-443c-b785-8f8e33190bf1.jpg)
![Architecture-Page-2](https://user-images.githubusercontent.com/55941066/200713146-28fc3d31-f2ca-4351-9040-363989ab6f52.jpg)
![Architecture-Page-3](https://user-images.githubusercontent.com/55941066/200713151-d4365ffa-343b-420f-86cf-a5bc820ff188.jpg)

# e2e test and backend unit test

https://user-images.githubusercontent.com/55941066/204585925-d1578956-1d71-4544-b668-e1550559cdb4.mp4



https://user-images.githubusercontent.com/55941066/204586069-9892a951-62a2-49b4-b023-6a4ee06e4801.mp4

