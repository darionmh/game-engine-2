export class Range {
    public min: number;
    public max: number;

    constructor(min: number, max: number){
        this.min = min;
        this.max = max;
    }

    contains(other: number, inclusive: boolean): boolean {
        if(inclusive)
            return this.min <= other && other <= this.max;
        else
            return this.min < other && other < this.max;
    }

    containsV2(other: number): boolean {
        return (this.min < other && other <= this.max) || (this.min <= other && other < this.max);
    }

    containsBoth(a: number, b: number): boolean {
        return this.contains(a, true) && this.contains(b, true);
    }

    containsEither(a: number, b: number): boolean {
        return this.containsV2(a) || this.containsV2(b);
    }
}