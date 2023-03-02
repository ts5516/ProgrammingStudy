import Web3 from "web3";

async function run() {
    const fromNode = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
    const toNode = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8546"));

    try {
        const fromAccount = await getAccount(fromNode);
        const toAccount = await getAccount(toNode);

        await unlockAccount(fromNode, fromAccount, '123456789');
        await unlockAccount(toNode, toAccount, '123456789');

        fromNode.eth.getBalance(fromAccount).then((result) => {
            console.log("fromNode 보내기 전: " + result);
        });
        toNode.eth.getBalance(toAccount).then((result) => {
            console.log("toNode 보내기 전: " + result);
        });

        await sendTransaction(fromNode, fromAccount, toAccount, '300000');

        fromNode.eth.getBalance(fromAccount).then((result) => {
            console.log("fromNode 보낸 후: " + result);
        });
        toNode.eth.getBalance(toAccount).then((result) => {
            console.log("toNode 보낸 후: " + result);
        });

    } catch (error) {
        console.log('에러 발견\n' + error);
    }
}

async function getAccount(web3: Web3): Promise<string> {
    return web3.eth.getAccounts()
        .then((result) => { return result[0]; })
        .catch((error) => { throw new Error(error); })
}

async function unlockAccount(web3: Web3, account: string, password: string): Promise<void> {
    return web3.eth.personal.unlockAccount(account, password, 500)
        .then(() => console.log('Account unlocked: ' + account))
        .catch((error) => { throw new Error(error); });
}

async function sendTransaction(fromNode: Web3, fromAccount: string, toAccount: string, value: string): Promise<void> {
    return fromNode.eth.sendTransaction({
        from: fromAccount,
        to: toAccount,
        gas: 100000,
        gasPrice: 0,
        value: Web3.utils.toWei(value, 'wei')
    })
        .once('transactionHash', (transactionHash) => {
            fromNode.eth.getTransaction(transactionHash).then(console.log);
        })
        .then((receipt) => {
            console.log("receipt: " + receipt);
        })
        .catch(() => {
            fromNode.eth.getBalance(fromAccount).then((balance) => {
                console.log('error: 잔액이 ' + balance + '여서 ' + value + '보다 작음');
            });
        });
}

run();