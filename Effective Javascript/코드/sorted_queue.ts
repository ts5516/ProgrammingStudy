interface ISortedQueue<T> {
    insert(item: T, priority: number): void
    peek(): T | undefined
    pop(): T | undefined
    size(): number
    isEmpty(): boolean
    getComparer(): string
}

type SQComparer = (item1: any, item2: any) => boolean;

export class SortedQueue<T> implements ISortedQueue<T>{
    private items: T[] = [];
    private comparer: SQComparer = (item1: T, item2: T): boolean => {
        return item1 > item2;
    };

    constructor(item?: T, comparer?: SQComparer) {
        if (item) { this.items.push(item); }
        if (comparer) { this.comparer = comparer; }
    }

    insert(item: T): void {
        for (let i = 0; i < this.items.length; i++) {
            if (this.comparer(this.items[i], item)) {
                this.items.splice(i, 0, item);
                return;
            }
        }
        this.items.push(item);
    }

    peek(): T | undefined {
        return this.items.length === 0 ? undefined : this.items[0];
    }
    pop(): T | undefined {
        return this.items.length === 0 ? undefined : this.items.pop();
    }
    size(): number { return this.items.length; }
    isEmpty(): boolean { return this.items.length === 0; }
    getComparer(): string { return this.comparer.toString(); }
}