// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as cp from 'child_process';

const execShell = (cmd: string) =>
    new Promise<string>((resolve, reject) => {
        cp.exec(cmd, (err, out) => {
            if (err) {
                return reject(err);
            }
            return resolve(out);
        });
    });



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.commands.registerCommand('4536.test', async () => {
		  const output = await execShell('powershell pwd');
		  vscode.window.showInformationMessage(output);
		})
	  );
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "4536" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('4536.gitPruneLocalBranches', () => {
		// The code you place here will be executed every time your command is executed
		var terminal = vscode.window.createTerminal(`Git Pruning Local Branches`);
		terminal.show();
		terminal.sendText("git checkout master -f");
		terminal.sendText("git fetch --prune");
		terminal.sendText("git branch -l| %{$_.Trim()}| ?{-not ((git branch -r) -like '*' + $_) }| ?{-not($_ -match 'master' )} | %{git branch -d $_}");
	});
	let disposableFully = vscode.commands.registerCommand('4536.gitPruneLocalBranchesFull', () => {
		// The code you place here will be executed every time your command is executed
		var terminal = vscode.window.createTerminal(`Git Pruning Local Branches FULLY`);
		terminal.show();
		terminal.sendText("git checkout master -f");
		terminal.sendText("git fetch --prune");
		terminal.sendText("git branch -l| %{$_.Trim()}| ?{-not ((git branch -r) -like '*' + $_) }| ?{-not($_ -match 'master' )} | %{git branch -D $_}");
	});	
	let disposableAll = vscode.commands.registerCommand('4536.gitDeleteAllLocalBranches', () => {
		// The code you place here will be executed every time your command is executed
		var terminal = vscode.window.createTerminal(`Git Pruning Local Branches FULLY`);
		terminal.show();
		terminal.sendText("git checkout master -f");
		terminal.sendText("git fetch --prune");
		terminal.sendText("git branch -l | ?{-not($_ -match 'master' )} | %{git branch -D $_}");
	});
	context.subscriptions.push(disposable);
	context.subscriptions.push(disposableFully);
}

// this method is called when your extension is deactivated
export function deactivate() {}
