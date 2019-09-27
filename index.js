const core = require('@actions/core');
const execSync = require('child_process').execSync;


// most @actions toolkit packages have async methods
async function run() {
    try {
        let output = execSync('ls', {encoding: 'utf-8'});  // the default is 'buffer'
        console.log('ls Output was:\n', output);

        output = execSync('pwd', {encoding: 'utf-8'});  // the default is 'buffer'
        console.log('Pwd Output was:\n', output);

        output = execSync('env', {encoding: 'utf-8'});  // the default is 'buffer'
        console.log('Env Output was:\n', output);

	output = execSync('/home/runner/work/_actions/nurmi/anchore-scan-action/master/inline_scan-v0.5.0', {encoding: 'utf-8'});
	console.log('ILS Output was:\n', output);
	
	
        core.debug((new Date()).toTimeString());

        core.setOutput('time', new Date().toTimeString());
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
