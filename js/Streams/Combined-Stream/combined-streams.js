import { createCipheriv, createDecipheriv, scryptSync } from 'crypto';
import pumpify from 'pumpify';
import { createGunzip, createGzip } from 'zlib';

function createKey(password) {
    return scryptSync(password, 'salt', 24);
}

export function createCompressAndEncrypt(password, iv) {
    const key = createKey(password);
    const combinedStream = pumpify(createGzip(), createCipheriv('aes192', key, iv));// compress and encrypt
    combinedStream.iv = iv;

    return combinedStream;
}

export function createDecryptAndDecompress(password, iv) {
    const key = createKey(password);
    return pumpify(createDecipheriv('aes192', key, iv), createGunzip());// decrypt and decompress
}