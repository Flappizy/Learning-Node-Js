export function delay (milliseconds, isError) {
    return new Promise((resolve, reject) => {
        if (isError) {
            reject(()=> {
                console.log(`An Error Occured`);
            });
        }

        setTimeout(() => {
            resolve(new Date());
        }, milliseconds);
    });
}


console.log(`Delaying..... ${new Date().getSeconds()}s`);
delay(1000).then(newDate => {
    console.log(`Done ${newDate.getSeconds()}s`);
});