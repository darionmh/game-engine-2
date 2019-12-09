import { Square } from './Square';
import { CollisionEvent, CollisionEvent2, Collision } from './CollisionEvent';
import { Vector2 } from './Vector2';
import { EntityComponent } from '../entity/entity.component';

export interface Collidable {
    isStatic: boolean;

    onCollision(collision: Collision): void;
    beginCollision(collision: Collision): void;
    isColliding(collidable: Collidable): boolean;
    endCollision(collidable: Collidable): void;
    getSquare(): Square;
    getVelocityVector(): Vector2;
    getEntity(): EntityComponent;
}