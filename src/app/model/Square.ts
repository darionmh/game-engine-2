import { Vector2 } from './Vector2';
import { Range } from './Range';
import { Vector2Clamp } from './Vector2Clamp';
import { range } from 'rxjs';
import { Side } from './CollisionEvent';

export class Square {
    public position: Vector2;
    public width: number;
    public height: number;

    constructor(position: Vector2, width: number, height: number){
        this.position = position;
        this.width = width;
        this.height = height;
    }

    relativeDistanceFrom(other: Square): Vector2 {
        let x;
        let y;

        // x = this.position.x - other.position.x - other.width;
        if(this.position.x > other.position.x + other.width){
            x = this.position.x - other.position.x - other.width;
        }else if(this.position.x + this.width < other.position.x){
            x = other.position.x - this.position.x - this.width;
        }else{
            x = 0;
        }

        // y = this.position.y - other.position.y - other.height;
        if(this.position.y > other.position.y + other.height){
            y = this.position.y - other.position.y - other.height;
        }else if(this.position.y + this.height < other.position.y){
            y = other.position.y - this.position.y - this.height;
        }else{
            y = 0;
        }

        return new Vector2(x, y);
    }

    actualDistanceFrom(other: Square): Vector2 {
        let x;
        let y;

        if(this.position.x > other.position.x){
            x = this.position.x - other.position.x - other.width;
        }else{
            x = other.position.x - this.position.x - this.width;
        }

        if(this.position.y < other.position.y){
            y = this.position.y - other.position.y + other.height;
        }else{
            y = other.position.y - this.position.y + this.height;
        }
        return new Vector2(x, y);
    }

    distanceFromCenter(other: Square): Vector2 {
        let x = Math.max(this.position.x + this.width / 2, other.position.x + other.width / 2) - Math.min(this.position.x + this.width / 2, other.position.x + other.width / 2)
        let y = Math.max(this.position.y + this.height / 2, other.position.y + other.height / 2) - Math.min(this.position.y + this.height / 2, other.position.y + other.height / 2)

        return new Vector2(x, y);
    }

    touchV2(other: Square): Side {
        if(this.relativeDistanceFrom(other).isZero()){
            console.log("touching", this.distanceFromCenter(other));
            if(this.position.x < other.position.x){
                return Side.RIGHT;
            }
            if(this.position.x > other.position.x){
                return Side.LEFT;
            }
            if(this.position.y < other.position.y){
                return Side.BOTTOM;
            }
            if(this.position.y > other.position.y){
                return Side.TOP;
            }
        }else{
            return null;
        }
    }

    touches(other: Square): Side {
        if(this.position.x === other.position.x + other.width || this.almostEqual(this.position.x, other.position.x + other.width)){
            const thisYRange = new Range(this.position.y, this.position.y + this.height);
            const otherYRange = new Range(other.position.y, other.position.y + other.height);
            if((otherYRange.containsEither(this.position.y, this.position.y + this.height) || thisYRange.containsEither(other.position.y, other.position.y + other.height)) && !(this.position.y === other.position.y + other.height) && !(this.position.y + this.height === other.position.y)){
                return Side.LEFT
            }
        }

        if(this.position.x + this.width === other.position.x || this.almostEqual(this.position.x + this.width, other.position.x)){
            const thisYRange = new Range(this.position.y, this.position.y + this.height);
            const otherYRange = new Range(other.position.y, other.position.y + other.height);
            if((otherYRange.containsEither(this.position.y, this.position.y + this.height) || thisYRange.containsEither(other.position.y, other.position.y + other.height)) && !(this.position.y === other.position.y + other.height) && !(this.position.y + this.height === other.position.y)){
                return Side.RIGHT
            }
        }

        if(this.position.y === other.position.y + other.height || this.almostEqual(this.position.y, other.position.y + other.height)){
            const thisXRange = new Range(this.position.x, this.position.x + this.width);
            const otherXRange = new Range(other.position.x, other.position.x + other.width);
            if((otherXRange.containsEither(this.position.x, this.position.x + this.width) || thisXRange.containsEither(other.position.x, other.position.x + other.width)) && !(this.position.x === other.position.x + other.width) && !(this.position.x + this.width === other.position.x)){
                return Side.TOP
            }
        }

        if(this.position.y + this.height === other.position.y || this.almostEqual(this.position.y + this.height, other.position.y)){
            const thisXRange = new Range(this.position.x, this.position.x + this.width);
            const otherXRange = new Range(other.position.x, other.position.x + other.width);
            if((otherXRange.containsEither(this.position.x, this.position.x + this.width) || thisXRange.containsEither(other.position.x, other.position.x + other.width)) && !(this.position.x === other.position.x + other.width) && !(this.position.x + this.width === other.position.x)){
                return Side.BOTTOM;
            }
        }

        return null
    }

    almostEqual(a: number, b: number): boolean {
        return new Range(Math.min(a), Math.max(a)).containsV2(b);
    }
}