const Web3 = require("web3");
const ganache = require("ganache-cli");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

const assert = require("assert");
// const { it } = require("mocha");
const { it } = require("mocha");

// class Car {
//     park() {
//         return "stopped";
//     }

//     drive() {
//         return "vroom";
//     }
// }

// let car;

// beforeEach(() => {
//     car = new Car();
// });

// describe("Car", () => {
//     it("can park", () => {
//         assert.equal(car.park(), "stopped");
//     });
//     it("car drive", () => {
//         assert.equal(car.drive(), "vroom");
//     });
// });

// USING PROMISEES
// beforeEach(() => {
//     // get a list of all accounts
//     web3.eth.getAccounts().then((fetchedAccounts) => {
//         console.log(fetchedAccounts);
//     });

//     // use one of those accounts to deploy the contract
// });

// describe("inbox", () => {
//     it("deploy account", () => {});
// });

// USING AWAIT/ASYNC
let accounts;
let inbox;
beforeEach(async() => {
    // Get a list of all unlocked accounts
    accounts = await web3.eth.getAccounts();

    // use on of those accounts to deploy th contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ["hi there"] })
        .send({ from: accounts[0], gas: "1000000" });
});
describe("inbox", () => {
    // test contactor
    it("deployment", () => {
        // console.log(inbox);
        assert.ok(inbox.options.address);
    });

    // test getter
    it("has a default", async() => {
        // call specify who will send the transaction and the amount of gas
        const message = await inbox.methods.message().call();
        assert.equal(message, "hi there");
    });

    // test setter
    it("can change message", async() => {
        await inbox.methods.setMessage("bye").send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, "bye");
    });
});