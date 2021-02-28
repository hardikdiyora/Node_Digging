#!/usr/bin/env node
// Making JS file to executable, kindly change mode to executable: chmod u+x <JS_FILE>

"use strict"

const util = require('util')
const path = require('path')
const fs = require('fs')

const getStdin = require('get-stdin')

const args = require('minimist')( process.argv.slice(2), {
    boolean: ['help', 'in'],
    string: ['file']
})

if (args.help) {
    printHelp()
}
else if (args.in || args['_'].includes('-')) {
    getStdin().then(processFile)
} 
else if (args.file) {
    let filePath = path.resolve(args.file)
    fs.readFile(filePath, (err, contents) => {
        if (err) {
            error(err.toString())
        } else {
            contents = contents.toString()
            processFile(contents)
        }
    })
} else {
    error('Incorrect usage, Kindly follow the below help', true)
}

// **************

function processFile(contents) {
    process.stdout.write(contents.toUpperCase())
}

function error(msg, includeHelp = false) {
    console.error(msg);
    includeHelp && printHelp()
}

function printHelp() {
    console.log('ex1 usage:')
    console.log('   ex1.js --file={FILENAME}')
    console.log('')
    console.log('--help                 print this help')
    console.log('--file={FILENAME}      process the file')
    console.log('- or in                STDIN stream')
    console.log('')
}