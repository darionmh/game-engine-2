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

    touches(other: Square): Side[]{
        const minX = this.position.x;
        const maxX = this.position.x + this.width;
        const minY = this.position.y;
        const maxY = this.position.y + this.height;

        const xRange = new Range(minX, maxX);
        const yRange = new Range(minY, maxY);

        const otherMinX = other.position.x;
        const otherMaxX = other.position.x + other.width;
        const otherMinY = other.position.y;
        const otherMaxY = other.position.y + other.height;

        const otherXRange = new Range(otherMinX, otherMaxX);
        const otherYRange = new Range(otherMinY, otherMaxY);

        const sides: Side[] = []

        if(minX === otherMaxX || maxX === otherMinX){
            if(yRange.containsBoth(otherMinY, otherMaxY) || otherYRange.containsBoth(minY, maxY) || (yRange.contains(otherMinY, false) && otherYRange.contains(maxY, true)) || (yRange.contains(otherMaxY, false) && otherYRange.contains(minY, true))){
                console.log("collision", `${minY} - ${maxY} and ${otherMinY} - ${otherMaxY}`)
                
                // const otherCenterX = otherMinX + (other.width/2)
                if(maxX === otherMinX)
                    sides.push(Side.RIGHT)
                else
                    sides.push(Side.LEFT)
            }
        }
        if(minY === otherMaxY || maxY === otherMinY){
            if(xRange.containsBoth(otherMinX, otherMaxX) || otherXRange.containsBoth(minX, maxX) || (xRange.contains(otherMinX, false) && otherXRange.contains(maxX, false)) || (xRange.contains(otherMaxX, false) && otherXRange.contains(minX, false))){
                console.log("collision", `${minX} - ${maxX} and ${otherMinX} - ${otherMaxX}`)

                // const otherCenterY = otherMinY + (other.height/2)
                if(maxY === otherMinY)
                    sides.push(Side.BOTTOM)
                else
                    sides.push(Side.TOP)
            }
        }

        return sides;
    }

    touchesV2(other: Square): Side[] {
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
}