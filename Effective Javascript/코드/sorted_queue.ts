interface ISortedQueue<T> {
    enqueue(item: T, priority: number): void
    dequeue(): T | undefined
    clear(): void
    peek(): T | undefined
    count(): number
    isEmpty(): boolean
    getComparer(): string
}

type SQComparer = (item1: any, item2: any) => boolean;

export class SortedQueue<T> implements ISortedQueue<T>{
    private items: T[] = [];
    private comparer: SQComparer = (item1: T, item2: T) => item1 > item2;

    constructor(item?: T, comparer?: SQComparer) {
        if (item) { this.items.push(item); }
        if (comparer) { this.comparer = comparer; }
    }

    enqueue(item: T): void {
        for (let i = 0; i < this.items.length; i++) {
            if (this.comparer(this.items[i], item)) {
                this.items.splice(i, 0, item);
                return;
            }
        }
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.length === 0 ? undefined : this.items.shift();
    }

    clear(): void {
        this.items = [];
    }

    peek(): T | undefined {
        return this.items.length === 0 ? undefined : this.items[0];
    }

    count(): number { return this.items.length; }

    isEmpty(): boolean { return this.items.length === 0; }

    getComparer(): string { return this.comparer.toString(); }

}