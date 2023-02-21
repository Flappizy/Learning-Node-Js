export function levelSubscribe(db) {
    db.subscribe = (pattern, listener) => {
        db.on('put', (key, value) => {
            const match = Object.keys(pattern).every(k => pattern[k] === value[k]);
            if (match) {
                listener(key, value);
            }
        });
    }

    return db;
}