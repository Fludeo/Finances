"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("../module");
const app = jest.fn();
const controller = {
    configureRoutes: jest.fn()
};
const container = {
    get: jest.fn(() => controller)
};
test('Auth module gets initialized correctly', () => {
    (0, module_1.initAuthModule)(container, app);
    expect(container.get).toHaveBeenCalledTimes(1);
    expect(container.get).toHaveBeenCalledWith('AuthController');
    expect(controller.configureRoutes).toHaveBeenCalledTimes(1);
    expect(controller.configureRoutes).toHaveBeenCalledWith(app);
});
