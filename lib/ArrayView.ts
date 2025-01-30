class ArrayView<T> {
    private array: T[];
    private start: number;
    private end: number;

    constructor(array: T[], start: number = 0, end: number = array.length) {
        this.array = array;
        this.start = start;
        this.end = end;
    }

    get length(): number {
        return this.end - this.start;
    }

    map<U>(callback: (value: T, index: number) => U): U[] {
        return this.slice(this.start, this.end).map(callback);
    }

    slice(newStart: number, newEnd: number): ArrayView<T> {
        return new ArrayView(this.array, this.start + newStart, Math.min(this.start + newEnd, this.end));
    }

    toArray(): T[] {
        return this.array.slice(this.start, this.end);
    }
}

export default ArrayView;