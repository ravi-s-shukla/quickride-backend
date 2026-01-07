// when call ApiError with status and message then it will return status and change Error message with custom message and immediately 
// call the global error handler
export default class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
