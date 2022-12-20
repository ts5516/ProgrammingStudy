import { SortedQueue } from "./sorted_queue";

const queue = new SortedQueue<string>("22", (i1: string, i2: string) => i1.length > i2.length);
console.log(queue.getComparer());