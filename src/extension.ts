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

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.commands.registerCommand('4536.test', async () => {
		  const output = await execShell('powershell pwd');
		  vscode.window.showInformationMessage(output);
		})
	  );

	console.log('Congratulations, your extension "4536" is now active!');

	let disposable = vscode.commands.registerCommand('4536.gitPruneLocalBranches', () => {
		var terminal = vscode.window.createTerminal(`Git Pruning Local Branches`);
		terminal.show();
		terminal.sendText("git checkout master -f");
		terminal.sendText("git fetch --prune");
		terminal.sendText("git branch -l| %{$_.Trim()}| ?{-not ((git branch -r) -like '*' + $_) }| ?{-not($_ -match 'master' )} | %{git branch -d $_.Trim()}");
	});
	let disposableFully = vscode.commands.registerCommand('4536.gitPruneLocalBranchesFull', () => {
		var terminal = vscode.window.createTerminal(`Git Pruning Local Branches FULLY`);
		terminal.show();
		terminal.sendText("git checkout master -f");
		terminal.sendText("git fetch --prune");
		terminal.sendText("git branch -l| %{$_.Trim()}| ?{-not ((git branch -r) -like '*' + $_) }| ?{-not($_ -match 'master' )} | %{git branch -D $_.Trim()}");
	});	
	let disposableAll = vscode.commands.registerCommand('4536.gitDeleteAllLocalBranches', () => {
		var terminal = vscode.window.createTerminal(`Git Pruning All Local Branches`);
		terminal.show();
		terminal.sendText("git checkout master -f");
		terminal.sendText("git fetch --prune");
		terminal.sendText("git branch -l | ?{$_ -ne '* master' }| %{git branch -D $_.Trim()}");
	});
	context.subscriptions.push(disposable);
	context.subscriptions.push(disposableFully);
}

export function deactivate() {}
