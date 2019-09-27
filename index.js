const core = require('@actions/core');
const execSync = require('child_process').execSync;
const exec = require('@actions/exec');


// most @actions toolkit packages have async methods
async function run() {
    try {
        let output = execSync('ls', {encoding: 'utf-8'});  // the default is 'buffer'
        console.log('ls Output was:\n', output);

        output = execSync('pwd', {encoding: 'utf-8'});  // the default is 'buffer'
        console.log('Pwd Output was:\n', output);

        output = execSync('env', {encoding: 'utf-8'});  // the default is 'buffer'
        console.log('Env Output was:\n', output);

        core.debug((new Date()).toTimeString());
        core.addPath('.');
        let img = core.getInput('image_reference');
        let cmd = 'inline_scan-v0.5.0 ' + img;
        let myOutput = '';
        let myError = '';

        const options = {};
        options.listeners = {
            stdout: (data: Buffer) => {
                myOutput += data.toString();
            },
            stderr: (data: Buffer) => {
                myError += data.toString();
            }
        };
        options.cwd = './lib';
        await exec.exec(cmd, options);
        //output = execSync(cmd, {encoding: 'utf-8'});  // the default is 'buffer'
        console.log('Output was:\n', myOutput);
        console.log('Error was:\n', myError);

        core.debug((new Date()).toTimeString());

        core.setOutput('time', new Date().toTimeString());
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
