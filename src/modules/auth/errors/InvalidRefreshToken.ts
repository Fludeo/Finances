
export default class InvalidRefreshTokenError extends Error {
    code : number
    constructor(){
        super()
        this.name = this.constructor.name
        this.message = 'No refresh token'
        this.code = 401
    }

}