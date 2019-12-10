import { Range } from './Range';
import { Side } from './CollisionEvent';

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

    toSides(): Side[]{
        const sides = []
        if(this.x > 0){
            sides.push(Side.RIGHT);
        }
        if(this.x < 0){
            sides.push(Side.LEFT);
        }
        if(this.y > 0){
            sides.push(Side.BOTTOM);
        }
        if(this.y < 0){
            sides.push(Side.TOP);
        }
        return sides;
    }

    restrictToSide(side: Side): Vector2{
        if(side === Side.BOTTOM && this.y > 0){
            return new Vector2(0, this.y);
        }
        if(side === Side.TOP && this.y < 0){
            return new Vector2(0, this.y);
        }
        if(side === Side.RIGHT && this.x > 0){
            return new Vector2(this.x, 0);
        }
        if(side === Side.LEFT && this.x < 0){
            return new Vector2(this.x, 0);
        }

        return new Vector2(0,0);
    }

    blockSides(sides: Side[]){
        if(sides.includes(Side.LEFT) && this.x < 0){
            this.x = 0;
        }
        if(sides.includes(Side.RIGHT) && this.x > 0){
            this.x = 0;
        }
        if(sides.includes(Side.TOP) && this.y < 0){
            this.y = 0;
        }
        if(sides.includes(Side.BOTTOM) && this.y > 0){
            this.y = 0;
        }
        return this;
    }
}