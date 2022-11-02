export default class IncorrectPasswordError extends Error {
    code : number
    constructor(){
        super()
        this.name = this.constructor.name
        this.message = 'Wrong password'
        this.code = 401
    }

}