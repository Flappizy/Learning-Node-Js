//The Image classes are not Implemented, it is just used as example
function createImage (name) {
    if (name.match(/\.jpe?g$/)) {
        return new ImageJpeg(name)
    } else if (name.match(/\.gif$/)) {
        return new ImageGif(name)
    } else if (name.match(/\.png$/)) {
        return new ImagePng(name)
    } else {
        throw new Error('Unsupported format')
    }
}