async function run() {
    await waitTimer(5);
    console.log('finished');
}

async function waitTimer(seconds: number): Promise<void> {
    try {
        const result = await promiseTimer(seconds);
        console.log(result + ' seconds wait');
    } catch (error) {
        console.log(error + ': condition value 오류');
    }
}

function promiseTimer(seconds: number): Promise<number> {
    return new Promise((resolve, reject) => {
        if (seconds < 0) {
            reject(seconds);
        } else {
            setTimeout(resolve, seconds * 1000, seconds);
        }
    });
}

run();