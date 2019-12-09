import { Injectable } from '@angular/core';
import { Collidable } from '../model/Collidable';
import { Square } from '../model/Square';
import { Vector2Clamp } from '../model/Vector2Clamp';
import { CollisionEvent2, Collision } from '../model/CollisionEvent';

@Injectable({
  providedIn: 'root'
})
export class CollisionService {

  private collidables: Collidable[] = [];

  constructor() { }

  public checkForCollision2(curr: Collidable, exclude: Collidable = null): boolean {
    const currSquare = curr.getSquare();
    let collisionCount = 0;

    for (const other of this.collidables) {
      if (other === curr || other === exclude) {
        continue;
      }
      const otherSquare = other.getSquare();
      const side = currSquare.touchesV2(otherSquare);
      const isColliding = curr.isColliding(other);

      if(side !== null){
        console.log('collided')
        other.onCollision({side, collidedWith: curr})
      }

      if (side !== null && !isColliding) {
        curr.beginCollision({ side, collidedWith: other })
        // other.beginCollision({ side, collidedWith: curr })
        collisionCount++;
      } else if (side === null && isColliding) {
        curr.endCollision(other)
      }
    }

    return collisionCount > 0;
  }

  public subscribe(collidable: Collidable): () => void {
    this.collidables.push(collidable);

    return () => this.unsubscribe(collidable);
  }

  unsubscribe(collidable: Collidable) {
    this.collidables = this.collidables.filter(it => it !== collidable);
  }
}
