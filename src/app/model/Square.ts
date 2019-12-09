import { Vector2 } from './Vector2';
import { Range } from './Range';
import { Vector2Clamp } from './Vector2Clamp';
import { Side } from './CollisionEvent';
import { range } from 'rxjs';

export class Square {
    public position: Vector2;
    public width: number;
    public height: number;

    constructor(position: Vector2, width: number, height: number){
        this.position = position;
        this.width = width;
        this.height = height;
    }

    touches(other: Square): Side[] {
        const sides:Side[] = [];

        if(this.position.x === other.position.x + other.width){
            const otherYRange = new Range(other.position.y, other.position.y + other.height);
            if(otherYRange.containsEither(this.position.y, this.position.y + this.height) && !(this.position.y === other.position.y + other.height) && !(this.position.y + this.height === other.position.y)){
                sides.push(Side.LEFT);
            }
        }

        if(this.position.x + this.width === other.position.x){
            const otherYRange = new Range(other.position.y, other.position.y + other.height);
            if(otherYRange.containsEither(this.position.y, this.position.y + this.height) && !(this.position.y === other.position.y + other.height) && !(this.position.y + this.height === other.position.y)){
                sides.push(Side.RIGHT);
            }
        }

        if(this.position.y === other.position.y + other.height){
            const otherXRange = new Range(other.position.x, other.position.x + other.width);
            if(otherXRange.containsEither(this.position.x, this.position.x + this.width) && !(this.position.x === other.position.x + other.width) && !(this.position.x + this.width === other.position.x)){
                sides.push(Side.TOP);
            }
        }

        if(this.position.y + this.height === other.position.y){
            const otherXRange = new Range(other.position.x, other.position.x + other.width);
            if(otherXRange.containsEither(this.position.x, this.position.x + this.width) && !(this.position.x === other.position.x + other.width) && !(this.position.x + this.width === other.position.x)){
                sides.push(Side.BOTTOM);
            }
        }

        return sides;
    } 

    touchesV2(other: Square): Side {
        if(this.position.x === other.position.x + other.width){
            const otherYRange = new Range(other.position.y, other.position.y + other.height);
            if(otherYRange.containsEither(this.position.y, this.position.y + this.height) && !(this.position.y === other.position.y + other.height) && !(this.position.y + this.height === other.position.y)){
                return Side.LEFT
            }
        }

        if(this.position.x + this.width === other.position.x){
            const otherYRange = new Range(other.position.y, other.position.y + other.height);
            if(otherYRange.containsEither(this.position.y, this.position.y + this.height) && !(this.position.y === other.position.y + other.height) && !(this.position.y + this.height === other.position.y)){
                return Side.RIGHT
            }
        }

        if(this.position.y === other.position.y + other.height){
            const otherXRange = new Range(other.position.x, other.position.x + other.width);
            if(otherXRange.containsEither(this.position.x, this.position.x + this.width) && !(this.position.x === other.position.x + other.width) && !(this.position.x + this.width === other.position.x)){
                return Side.TOP
            }
        }

        if(this.position.y + this.height === other.position.y){
            const otherXRange = new Range(other.position.x, other.position.x + other.width);
            if(otherXRange.containsEither(this.position.x, this.position.x + this.width) && !(this.position.x === other.position.x + other.width) && !(this.position.x + this.width === other.position.x)){
                return Side.BOTTOM;
            }
        }

        return null;
    }
}