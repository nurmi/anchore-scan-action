const core = require('@actions/core');
const execSync = require('child_process').execSync;
//const exec = require('@actions/exec');

// most @actions toolkit packages have async methods
async function run() {
    try {
        var output = execSync('ls', {encoding: 'utf-8'});  // the default is 'buffer'
        console.log('ls Output was:\n', output);

        output = execSync('pwd', {encoding: 'utf-8'});  // the default is 'buffer'
        console.log('Pwd Output was:\n', output);

        output = execSync('env', {encoding: 'utf-8'});  // the default is 'buffer'
        console.log('Env Output was:\n', output);

        core.debug((new Date()).toTimeString());
        core.addPath('.');
        var img = core.getInput('image_reference');
        var cmd = 'inline_scan-v0.5.0 ' + img;
        //await exec.exec(cmd);
        output = execSync(cmd, {encoding: 'utf-8'});  // the default is 'buffer'
        console.log('Output was:\n', output);

        core.debug((new Date()).toTimeString());

        core.setOutput('time', new Date().toTimeString());
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
