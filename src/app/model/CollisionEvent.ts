import { Collidable } from './Collidable';

export interface CollisionEvent {
    sides: Side[],
    collidedWith: Collidable
}

export enum Side {
    TOP, LEFT, BOTTOM, RIGHT
}