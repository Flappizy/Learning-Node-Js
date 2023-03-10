import { readdir, readFile, stat } from 'fs';
import { relative, resolve } from 'path';
import { nextTick } from 'process';
import { TaskQueue } from '../WebSpider/QueuesToTheRescue/QueueLimitingConcurrency.js';

const __dirname = resolve()

// I don't like this global variable but too lazy to rewrite this for now
const filesWithKeyword = []

/** Checks if the file contents contain the keyword */
function checkFileForKeyword (path, keyword, done) {
  readFile(path, 'utf-8', (err, data) => {
    if (err) return done(err)

    const fileIncludesKeyword = data.includes(keyword)

    if (fileIncludesKeyword) filesWithKeyword.push(relative(__dirname, path))

    done()
  })
}

/** Handles a path within the directory being scanned */
function handlePath (path, keyword, queue, done) {
  stat(path, (err, stats) => {
    if (err) return done(err)

    const isDir = stats.isDirectory()

    if (!isDir) return checkFileForKeyword(path, keyword, done)

    recursiveFind(path, keyword, queue)
    done()
  })
}

/** Scans a directory to determine which files contain the keyword */
function scanDir (dir, keyword, queue, doneWithDir) {
  if (dir.includes('node_modules')) return nextTick(() => doneWithDir())

  readdir(dir, 'utf-8', (err, paths) => {
    if (err) return doneWithDir(err)

    paths.forEach(path => {
      queue.pushTask(doneWithPath => {
        const fullPath = resolve(dir, path)
        handlePath(fullPath, keyword, queue, doneWithPath)
      })
    })

    return doneWithDir()
  })
}

/**
 * Recursively scans a directory to determine which files within it contain
 *   a given keyword
 */
function recursiveFind (dir, keyword, queue) {
  queue.pushTask(done => {
    scanDir(dir, keyword, queue, done)
  })
}

const taskQueue = new TaskQueue(5)

taskQueue.on('error', console.error)
taskQueue.once('empty', () => {
  console.log(filesWithKeyword)
  console.log('==> Donesky <==')
})

recursiveFind('../WebSpider', 'bbc', taskQueue)