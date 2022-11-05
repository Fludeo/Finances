export default class ValidationError extends Error {
    code : number
    constructor(msg : string ){
        super()
        this.name = this.constructor.name
       if (msg) this.message = msg
        this.code = 400
    }
}