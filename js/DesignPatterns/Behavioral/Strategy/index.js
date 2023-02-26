import { Config } from './config.js';
import { iniStrategy, jsonStrategy } from './strategies.js';

async function main () {
    
    const iniConfig = new Config(iniStrategy);
    //Loads the config data from the config.ini file and store any config data  in the data varaiable
    await iniConfig.load('config.ini');
    //Sets new config data to the config file
    iniConfig.set('book.nodejs', 'design patterns');
    //Save the data into a new file
    await iniConfig.save('conf_mod.ini');

    iniConfig.set('name', 'Arsenal');
    iniConfig.set('position', '1');
    iniConfig.set('color', 'red');
    await iniConfig.save('conf_mod.ini');

    const jsonConfig = new Config(jsonStrategy);
    await jsonConfig.load('config.json');
    jsonConfig.set('book.nodejs', 'design patterns');
    await jsonConfig.save('conf_mod.json');
}

main();