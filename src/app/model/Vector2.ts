import { Range } from './Range';

export class Vector2 {
    public x: number;
    public y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    static AddVectors(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x + b.x, a.y + b.y);
    }

    static ClampVector(a: Vector2, maxX: number, maxY: number){
        const x = Math.min(Math.max(0, a.x), maxX)
        const y = Math.min(Math.max(0, a.y), maxY)

        return new Vector2(x, y);
    }

    static ClampVectorWithRange(a: Vector2, xRange: Range, yRange: Range){
        const x = Math.min(Math.max(xRange.min, a.x), xRange.max)
        const y = Math.min(Math.max(yRange.min, a.y), yRange.max)

        return new Vector2(x, y);
    }
}