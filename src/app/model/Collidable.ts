import { Square } from './Square';
import { CollisionEvent, CollisionEvent2, Collision, Side } from './CollisionEvent';
import { Vector2 } from './Vector2';
import { EntityComponent } from '../entity/entity.component';

export interface Collidable {
    isStatic: boolean;
    activeCollisions: Collision[];

    onCollision(collision: Collision): void;
    beginCollision(collision: Collision): void;
    isColliding(collidable: Collidable): boolean;
    endCollision(collidable: Collidable): void;
    getSquare(): Square;
    getVelocityVector(): Vector2;
    getEntity(): EntityComponent;
    getBlockedSides(sides: Side[]): Side[];
}