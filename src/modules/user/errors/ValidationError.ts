export default class ValidationError extends Error {
    code : number
    constructor(msg : string ){
        super()
       if (msg) this.message = msg
        this.code = 400
    }
}