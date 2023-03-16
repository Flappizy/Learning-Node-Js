export class ZmqMiddlewareManager{
    constructor(socket) {
        this.socket = socket;
        this.inboundMiddlewares = [];
        this.outboundMiddlerwares = [];

        this.handleIncomingMessages()
            .catch(err => console.log(err));
    }

    async handleIncomingMessages() {
        for await (const [message] of this.socket) {
            await this.executeMiddlewares(this.inboundMiddlewares, message)
                .catch(err => console.log('Error while processing the message', err));
        }
    }

    async send(message) {
        const finalMessage = await this.executeMiddlewares(this.outboundMiddlerwares, message);
        return this.socket.send(finalMessage);
    }

    use(middleware) {
        if (middleware.inbound) {
            this.inboundMiddlewares.push(middleware.inbound);
        }
        if (middleware.outbound) {
            this.outboundMiddlerwares.unshift(middleware.outbound);
        }
    }

    async executeMiddlewares(middlewares, initialMessage){
        let message = initialMessage;
        for await (const middlewareFunc of middlewares) {
            message = await middlewareFunc.call(this, message)
        }
        return message;
    }
}