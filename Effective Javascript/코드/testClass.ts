import { SortedQueue } from "./sorted_queue";

const queue = new SortedQueue<string>(['99', '22', '77'], (item1, item2) => item1 < item2);

queue.enqueue('11');
queue.enqueue('33');
queue.enqueue('44');
queue.enqueue('55');

const queue2 = queue.clone();
queue2.enqueue('00');

while (!queue.isEmpty()) {
    console.log(queue.dequeue());
}

console.log(queue.getComparer());