import { Square } from './Square';
import { CollisionEvent, CollisionEvent2, Collision, Side } from './CollisionEvent';
import { Vector2 } from './Vector2';
import { EntityComponent } from '../entity/entity.component';

export interface Collidable {
    id: string;
    isStatic: boolean;
    activeCollisions: Collision[];

    onCollision(collision: Collision): void;
    beginCollision(collision: Collision): void;
    isColliding(collidable: Collidable): boolean;
    endCollision(collidable: Collidable): void;
    didCollide(side: Side): void;
    getSquare(): Square;
    getVelocityVector(): Vector2;
    getEntity(): EntityComponent;
    getBlockedSides(sides: Side[]): Side[];
    getPosition(): Vector2;
}