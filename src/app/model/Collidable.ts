import { Square } from './Square';
import { CollisionEvent } from './CollisionEvent';

export interface Collidable {
    onCollision(event: CollisionEvent): void;
    getSquare(): Square;
}