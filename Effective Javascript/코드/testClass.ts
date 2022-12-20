import { SortedQueue } from "./sorted_queue";

const queue = new SortedQueue<string>("22", (item1: string, item2: string) => {
    return item1 < item2;
});

queue.enqueue('11');
queue.enqueue('33');
queue.enqueue('44');
queue.enqueue('55');

console.log(queue.count());

//queue.clear();

while (!queue.isEmpty()) {
    console.log(queue.dequeue());
}

console.log(queue.getComparer());