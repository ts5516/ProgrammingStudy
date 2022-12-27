import { SortedQueue } from "./sorted_queue";

function test() {
    test_isSortedQueue();
    test_fnContainAndClear()
    test_isClone();
    test_mapReduceFilterForeach();
    test_iterator();
}

function test_isSortedQueue() {
    const queue = new SortedQueue<number>(); //기본적으로 오름차순으로 정렬됨

    queue.enqueue(1);
    queue.enqueue(0);
    queue.enqueue(3);
    queue.enqueue(7);
    queue.enqueue(6);
    queue.enqueue(5);
    queue.enqueue(4);
    queue.enqueue(2);

    while (!queue.isEmpty()) {
        console.log(queue.dequeue()); // 0 1 2 3 4 5 6 7
    }
}

function test_fnContainAndClear() {
    const queue = new SortedQueue<number>([0, 1, 2, 3, 4, 5, 6, 7]);

    if (queue.isContain(1)) {
        console.log('1이 포함되어 있음'); // write!
    } else {
        console.log('1이 포함되어 있지 않음');
    }

    console.log('배열 길이: ' + queue.length); // 8

    queue.clear();

    if (queue.isEmpty()) {
        console.log('배열이 초기화 됨'); // write!
    } else {
        console.log('배열이 초기화 되지 않음');
    }
}

function test_isClone() {
    const queue1 = new SortedQueue<number>([0, 1, 2, 3, 4, 5, 6, 7]);
    const queue2 = queue1;
    const queue3 = queue1.clone();
    const queue4 = queue1.concat(queue3);

    queue1.clear();

    console.log('queue1: ' + [...queue1]); // empty
    console.log('queue2: ' + [...queue2]); // empty
    console.log('queue3: ' + [...queue3]); // 0,1,2,3,4,5,6,7
    console.log('queue4: ' + [...queue4]); // 0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7
}

function test_mapReduceFilterForeach() {
    const numQueue = new SortedQueue<number>([0, 1, 2, 3, 4, 5, 6, 7]);
    const oddNumQueue = numQueue.filter(num => num % 2 === 1);
    const numMultyplyQueue = numQueue.map(num => num * 2)

    console.log('odd num queue: ' + [...oddNumQueue]); // 1,3,5,7
    console.log('num queue * 2: ' + [...numMultyplyQueue]); // 0,2,4,6,8,10,12,14

    numMultyplyQueue.foreach((num, index) => {
        console.log('num ' + index + ': ' + num);
    });
    // num 0: 0
    // num 1: 2
    // num 2: 4
    // num 3: 6
    // num 4: 8
    // num 5: 10
    // num 6: 12
    // num 7: 14

    console.log(numMultyplyQueue.reduce((acc, cur) => { return acc += cur; }, 0)); // 56
}

function test_iterator() {
    const numQueue = new SortedQueue<number>([0, 1, 2, 3, 4, 5, 6, 7]);
    const strQueue = new SortedQueue<string>(['a', 'b', 'c', 'd', 'e', 'f', 'g']);

    console.log([...numQueue]); // [0, 1, 2, 3, 4, 5, 6, 7]
    console.log(...strQueue); // a b c d e f g

    for (let num of numQueue) {
        console.log(num); // 0 1 2 3 4 5 6 7
    }

    for (let str of strQueue) {
        console.log(str); // a b c d e f g
    }
}

test();