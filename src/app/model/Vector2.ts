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
}