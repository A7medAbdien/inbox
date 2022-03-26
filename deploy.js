const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const provider = new HDWalletProvider(
    "system dinner tag suit bunker hammer present picture reward drink pact engine",
    "https://rinkeby.infura.io/v3/361ed5d6cd44471b85f4e71c2ac4aadf"
);
const web3 = new Web3(provider);
const { interface, bytecode } = require("./compile");

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ["hi there"] })
        .send({ from: accounts[0], gas: "1000000" });

    console.log("contract deployed to", result.options.address);

    provider.engine.stop();
};
deploy();