#!/usr/bin/env node
var exec = require('child_process').exec;
var os = require('os');
var command = 'ping google.com';
var interval = 5000;

if (os.platform() !== 'win32') {
    command += ' -c 1';
}

function ping() {
    var timeStamp = new Date();
    var time = 0;
    var message = '';

    exec(command, (error, stdout) => {
        if (error) {
            var errorParts = error.message.split('\n');
            message = errorParts[1] || errorParts[0];
        } else {
            var match = stdout.match(/time=(.+?) ms/);

            if (match && match[1]) {
                time = match[1];
            }
        }

        console.log([timeStamp, time, message].join(','));
    });
}


setInterval(ping, interval);
