interface ISortedQueue<T> {
    enqueue(item: T, priority: number): void
    dequeue(): T | undefined
    clear(): void
    peek(): T | undefined
    count(): number
    clone(): SortedQueue<T>
    isEmpty(): boolean
    isContain(item: T): boolean
    getComparer(): string
    filter(predicate: (value: T, index: number, array: T[]) => unknown): SortedQueue<T>
    map(predicate: (value: T, index: number, array: T[]) => unknown): SortedQueue<T>
    foreach(predicate: (value: T, index: number, array: T[]) => unknown): SortedQueue<T>
    concat(squeue: SortedQueue<T>): SortedQueue<T>
    iterator(): T | undefined
}

export class SortedQueue<T> implements ISortedQueue<T>{
    private items: T[] = [];
    private readonly comparer: (item1: T, item2: T) => boolean =
        (item1, item2) => item1 > item2;

    constructor(_items?: T[] | T, comparer?: (item1: T, item2: T) => boolean) {
        if (comparer) { this.comparer = comparer; }
        if (_items) {
            this.items.concat(_items).forEach(item => { this.enqueue(item); });
        }
    }

    enqueue(item: T): void {
        const index = this.getEnqueueIndex(item);
        this.items =
            [...this.items.slice(0, index), item, ...this.items.slice(index)];
    }

    private getEnqueueIndex(item: T): number {
        for (let i = 0; i < this.items.length; i++) {
            if (this.comparer(this.items[i], item)) { return i; }
        }

        return this.items.length;
    }

    dequeue(): T | undefined {
        if (this.items.length === 0) {
            return undefined;
        } else {
            const lastItem = this.items[this.items.length - 1];
            this.items = this.items.slice(0, this.items.length - 1);
            return lastItem;
        }
    }

    peek(): T | undefined {
        return this.items.length === 0 ? undefined : this.items[0];
    }

    getComparer(): string { return this.comparer.toString(); }

    clear(): void { this.items = []; }

    count(): number { return this.items.length; }

    isEmpty(): boolean { return this.items.length === 0; }

    isContain(compareItem: T): boolean {
        let bContain = false;
        this.items.forEach(item => {
            if (item === compareItem) { bContain = true; }
        });

        return bContain;
    }

    clone(): SortedQueue<T> {
        return new SortedQueue<T>(this.items, this.comparer);
    }

    filter(predicate: (value: T, index: number, array: T[]) => unknown)
        : SortedQueue<T> {
        this.items = this.items.filter(predicate);
        return this.clone();
    }

    map(predicate: (value: T, index: number, array: T[]) => unknown)
        : SortedQueue<T> {
        this.items.map(predicate);
        return this.clone();
    }

    concat(squeue: SortedQueue<T>): SortedQueue<T> {
        return new SortedQueue<T>([...this.items, ...squeue], this.comparer);
    }

    foreach(): SortedQueue<T> {
        return this;
    }

    iterator(): T | undefined {
        return this.peek();
    }
}