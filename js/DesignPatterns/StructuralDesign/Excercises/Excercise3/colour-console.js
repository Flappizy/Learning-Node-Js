import styles from 'ansi-styles';

const enhancedConsoleMethods = [ 'red', 'yellow', 'green' ];

const handler = {
    get: (target, prop) => {
        if (prop === 'yellow') {
            return function(...args) {
             target.log(`${styles.yellow.open}${args}${styles.yellow.close}`);   
            }            
        } else if(prop === 'green') {
            return function(...args) {
                target.log(`${styles.green.open}${args}${styles.green.close}`);   
            }
        } else if(prop === 'red') {
            return function(...args) {
                target.log(`${styles.red.open}${args}${styles.red.close}`);   
            }
        }
    }
}

export const consoleDecorator = new Proxy(console, handler);
