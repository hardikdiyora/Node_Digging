#!/usr/bin/env node

"use strict";

var util = require("util");
var childProc = require("child_process");


// ************************************

const HTTP_PORT = 8039;
const MAX_CHILDREN = 5;

var delay = util.promisify(setTimeout);


main().catch(console.error);


// ************************************

async function main() {
	console.log(`Load testing http://localhost:${HTTP_PORT}...`);

	let x = 0
	while (true) {
		x++
		process.stdout.write(`Sending ${MAX_CHILDREN} requests...`);

		let children = [];

		for (let i = 0; i < MAX_CHILDREN; i++) {
			children.push(
				childProc.spawn("node",["ex7-child.js"])
			);
		}

		let responses = children.map(function wait(child){
			return new Promise(function c(res){
				child.on("exit",function onExit(code){
					if (code === 0) res(true);
					res(false);
				});
			});
		});

		if(x > 20) {
			foo()
		}
		responses = await Promise.all(responses);

		if (responses.every(Boolean)) {
			console.log(" success!");
		}
		else {
			console.log(" failures.");
		}

		await delay(500);
	}
}