export class ApiError extends Error{
    constructor(statusCode, message="Something went wrong, please try again later", stack="", errors=[]){
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.errors = errors
        this.success = false

        if (stack){
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}