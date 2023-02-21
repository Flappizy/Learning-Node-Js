export function createObservable (target, observer) {
    const observable = new Proxy(target, {
        set: (obj, prop, value) => {
            if (value !== obj[prop]) {
                const previousValue = obj[prop];
                obj[prop] = value;
                observer({ prop, previousValue, currentValue: value }); 
            }
            return true;
        }
    });

    return observable;
}


