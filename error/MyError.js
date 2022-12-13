class MyError extends Error {
    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }

    static badRequest(message) {
        return new MyError(404, message)
    }

    static internal(message) {
        return new MyError(500, message)
    }

    static forbidden(message) {
        return new MyError(403, message)
    }
}

module.exports = MyError
