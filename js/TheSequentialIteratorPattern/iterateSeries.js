function iterator (collection, iteratorCallBack, finalCallBack) {
    if (tasks.length === 0) {
        return process.nextTick(finalCallBack);
    }

    function iterate (index) {
        if (collection.length === index) {
            return finalCallBack();
        }
        
        const element = collection[index];
        iteratorCallBack(element, err => {
            if (err) {
                return finalCallBack();
            }
            iterate(index + 1);
        });
        /*
        setTimeout(() => {
            task(iteratorCallBack);
            iterate(index + 1);
        }, 50);*/
    }

    iterate(0);
}