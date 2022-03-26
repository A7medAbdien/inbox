// to keep path portable
const path = require("path");
// file sys model to read file
const fs = require("fs");
// solidity compiler
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
// reading file with its way of encoding
const source = fs.readFileSync(inboxPath, "utf8");

// now source have contract in it, we ues it to compile it with the no. of contract we attempt to compile
module.exports = solc.compile(source, 1).contracts[":Inbox"];
// the o/p is always: object