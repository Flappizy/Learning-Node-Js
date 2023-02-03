class CustomPromise {
    // add methods to return on the instance
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.error = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onFulfilledCallbacks.forEach(cb => cb(value));
            }
        };

        const reject = (error) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.error = error;
                this.onRejectedCallbacks.forEach(cb => cb(error));
            }
        };

        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onFulfilled, onRejected) {
        let nextPromise;
    
        if (this.state === 'fulfilled') {
          nextPromise = new CustomPromise((resolve, reject) => {
            try {
              const result = onFulfilled(this.value);
              if (result instanceof CustomPromise) {
                result.then(resolve, reject);
              } else {
                resolve(result);
              }
            } catch (e) {
              reject(e);
            }
          });
        }
    
        if (this.state === 'rejected') {
          nextPromise = new CustomPromise((resolve, reject) => {
            try {
              const result = onRejected(this.reason);
              if (result instanceof CustomPromise) {
                result.then(resolve, reject);
              } else {
                resolve(result);
              }
            } catch (e) {
              reject(e);
            }
          });
        }
    
        if (this.state === 'pending') {
          nextPromise = new CustomPromise((resolve, reject) => {
            this.onFulfilledCallbacks.push(() => {
              try {
                const result = onFulfilled(this.value);
                if (result instanceof CustomPromise) {
                  result.then(resolve, reject);
                } else {
                  resolve(result);
                }
              } catch (e) {
                reject(e);
              }
            });
            this.onRejectedCallbacks.push(() => {
              try {
                const result = onRejected(this.reason);
                if (result instanceof CustomPromise) {
                  result.then(resolve, reject);
                } else {
                  resolve(result);
                }
              } catch (e) {
                reject(e);
              }
            });
          });
        }
    
        return nextPromise;
      }
    

    catch(onRejected) {
        return this.then(null, onRejected);
    }
}