import { Range } from './Range'
import { Vector2 } from './Vector2';

export class Vector2Clamp{
    public xRange: Range;
    public yRange: Range;

    constructor(xRange: Range, yRange: Range){
        this.xRange = xRange;
        this.yRange = yRange;
    }

    clamp(a: Vector2): Vector2{
        return Vector2.ClampVectorWithRange(a, this.xRange, this.yRange);
    }
}