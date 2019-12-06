import { Square } from './Square';
import { CollisionEvent, CollisionEvent2 } from './CollisionEvent';
import { Vector2 } from './Vector2';

export interface Collidable {
    isStatic: boolean;

    onCollision(event: CollisionEvent): void;
    onCollision2(event: CollisionEvent2): void;
    getSquare(): Square;
    getVelocityVector(): Vector2;
}