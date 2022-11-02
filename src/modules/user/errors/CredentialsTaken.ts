export default class CredentialsTaken extends Error {
    code : number
    constructor ( email = null ) {
        super()
        this.name = this.constructor.name
        this.message = 'Credentials taken'
        this.code = 400
    }
}