import { Transform } from 'stream'

export class ReplaceStream extends Transform {
    constructor (searchStr, replaceStr, options) {
        super({ ...options })
        this.searchStr = searchStr
        this.replaceStr = replaceStr
        this.tail = ''
    }

    _transform (chunk, encoding, callback) {
        //Splits the array into a new array using the searchStr as seperator 
        const pieces = (this.tail + chunk).split(this.searchStr);
        //Takes the last item in the array 
        const lastPiece = pieces[pieces.length - 1];
        //This represents our tail length of the chunk
        const tailLen = this.searchStr.length - 1;
        //This represents our actual tail
        this.tail = lastPiece.slice(-tailLen);
        //This remove our actual tail from the current chunk
        pieces[pieces.length - 1] = lastPiece.slice(0, -tailLen);
        //the join method puts the replaceStr in between every element in the array as long the element 
        //in the array is greater than 1
        this.push(pieces.join(this.replaceStr)); 
        callback()
    }
    
    _flush (callback) {
        this.push(this.tail)
        callback()
    }
}