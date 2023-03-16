export class LogManager {
    constructor() {
        this.middlewares = [];
    }

    async log(message) {
        await this.executeMiddlewares(this.middlewares, message);
    }

    use(middleware){
        this.middlewares.push(middleware);
        return this;
    }

    async executeMiddlewares(middlewares, message) {
        let newMessage;
        for await (const middleware of middlewares) {
            newMessage = await middleware.call(this, message);
        }
        return newMessage;
    }
}