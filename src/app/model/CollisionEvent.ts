import { Collidable } from './Collidable';
import { Vector2 } from './Vector2';

export interface CollisionEvent {
    sides: Side[],
    collidable: Collidable,
    collidedWith?: Collidable,
    collisionVector: Vector2,
}

export interface CollisionEvent2 {
    collisions: Collision[]
}

export interface Collision {
    side: Side,
    collidedWith: Collidable
}

export enum Side {
    TOP, LEFT, BOTTOM, RIGHT
}   

export function invertSide(side: Side): Side{
    switch(side){
        case Side.TOP: return Side.BOTTOM;
        case Side.BOTTOM: return Side.TOP;
        case Side.LEFT: return Side.RIGHT;
        case Side.RIGHT: return Side.LEFT;
    }
}