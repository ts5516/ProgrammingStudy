export interface ISortedQueue<T> {
    enqueue(item: T): void
    dequeue(): T | undefined
    peek(): T | undefined
    clear(): void

    get length(): number

    isEmpty(): boolean
    isContain(item: T): boolean

    clone(): SortedQueue<T>
    concat(squeue: SortedQueue<T>): SortedQueue<T>

    filter(predicate: (value: T, index: number, array: T[]) => unknown): SortedQueue<T>
    map(predicate: (value: T, index: number, array: T[]) => T): SortedQueue<T>
    foreach(predicate: (value: T, index: number, array: T[]) => void): void

    [Symbol.iterator](): Iterator<T>;
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
            const firstItem = this.items[0];
            this.items = this.items.slice(1, this.items.length);
            return firstItem;
        }
    }

    peek(): T | undefined {
        return this.items.length === 0 ? undefined : this.items[0];
    }

    clear(): void { this.items = []; }

    get length(): number { return this.items.length; }

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
        return new SortedQueue<T>(this.items.filter(predicate), this.comparer);
    }

    map(predicate: (value: T, index: number, array: T[]) => T)
        : SortedQueue<T> {
        return new SortedQueue<T>(this.items.map(predicate), this.comparer);
    }

    concat(squeue: SortedQueue<T>): SortedQueue<T> {
        return new SortedQueue<T>([...this.items, ...squeue.items], this.comparer);
    }

    foreach(predicate: (value: T, index: number, array: T[]) => void)
        : void {
        this.items.forEach(predicate);
    }

    [Symbol.iterator](): Iterator<T> {
        let index = 0;
        return {
            next: (): IteratorResult<T> => {
                if (this.items.length === index) {
                    return { value: undefined, done: true };
                } else {
                    return { value: this.items[index++], done: false };
                }
            }
        }
    }
}