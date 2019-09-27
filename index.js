const core = require('@actions/core');
const execSync = require('child_process').execSync;

// most @actions toolkit packages have async methods
async function run() {
    try {
        const ms = core.getInput('milliseconds');
        console.log(`Waiting ${ms} milliseconds ...`);

        core.debug((new Date()).toTimeString());
        var img = core.getInput('image_reference');
        var cmd = './inline_scan-v0.5.0 ' + img;
        const output = execSync(cmd, {encoding: 'utf-8'});  // the default is 'buffer'
        console.log('Output was:\n', output);

        core.debug((new Date()).toTimeString());

        core.setOutput('time', new Date().toTimeString());
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
