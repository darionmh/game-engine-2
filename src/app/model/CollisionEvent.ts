import { Collidable } from './Collidable';
import { Vector2 } from './Vector2';

export interface CollisionEvent {
    sides: Side[],
    collidable: Collidable,
    collidedWith: Collidable,
    collisionVector: Vector2,
}

export enum Side {
    TOP, LEFT, BOTTOM, RIGHT
}