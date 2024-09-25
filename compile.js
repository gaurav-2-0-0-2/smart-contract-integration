const solc = require("solc");
const path = require("path");
const fs = require("fs");

const contractName = "MyContract";
const filename = `${contractName}.sol`;

console.log(filename);

const contractPath = path.join(__dirname, filename);
const sourceCode = fs.readFileSync(contractPath, "utf8");

const input = {

	language: "Solidity",
	sources: {
		[filename]: {
			content: sourceCode,
		},
	},
	settings: {
		outputSelection: {
			"*": {
				"*": ["*"],
			},
		},
	},
};

const compiledCode = JSON.parse(solc.compile(JSON.stringify(input)));

const bytecode = compiledCode.contracts[filename][contractName].evm.bytecode.object;

const bytecodePath = path.join(__dirname, "MyContractByteCode.bin");
fs.writeFileSync(bytecodePath, bytecode);

console.log("Contract Bytecode:\n", bytecode);

const abi = compiledCode.contracts[filename][contractName].abi

const abiPath = path.join(__dirname, "MyContractAbi.json");
fs.writeFileSync(abiPath, JSON.stringify(abi, null, "\t"));

console.log("Contract ABI:\n", abi);



