export class LoggerTemplate {
    debug(...args) {
        this._debug(args);
     }
 
     error(...args) {
        this._error(args);
     }
 
     warn(...args) {
        this._warn(args);
     }
 
     info(...args) {
        this._info(args);
     }
    
    _debug(message) {
        throw new Error("debug method must be implemented");
     }
 
     _error() {
        throw new Error("error method must be implemented");
     }
 
     _warn() {
        throw new Error("warn method must be implemented");
     }
 
     _info() {
        throw new Error("info method must be implemented");
     }
}