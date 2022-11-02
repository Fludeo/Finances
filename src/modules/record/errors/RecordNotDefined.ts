
export default class RecordNotDefined extends Error {
    code : number

    constructor( ){
        super()
        this.name = this.constructor.name
        this.message = 'object is not defined as instance of Record'
        this.code = 400
    }
  
}




