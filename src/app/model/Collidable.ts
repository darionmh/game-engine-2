import { Square } from './Square';
import { CollisionEvent } from './CollisionEvent';
import { Vector2 } from './Vector2';

export interface Collidable {
    isStatic: boolean;

    onCollision(event: CollisionEvent): void;
    getSquare(): Square;
    getVelocityVector(): Vector2;
}