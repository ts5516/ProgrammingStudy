async function run() {
    const promiseTimer = (seconds: number) => new Promise((resolve, reject) => {
        if (seconds < 0) {
            reject(seconds);
        } else {
            setTimeout(resolve, seconds * 1000, seconds);
        }
    });

    await wait(promiseTimer(-1));

    //console.log('finished');
}

async function wait(promiseFunction: Promise<unknown>): Promise<void> {
    promiseFunction
        .then(console.log)
        .catch((error) => console.log("error: " + error));
}

run();