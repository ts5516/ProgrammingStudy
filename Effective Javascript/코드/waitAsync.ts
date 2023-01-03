
async function run(){
    const d = new Date();
    d.getTime();
    await waitAsync();
    console.log('finished');
}

async function waitAsync(condition: Function, callback: Function): Promise<void>{

};

run();