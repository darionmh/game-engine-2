import { Injectable } from '@angular/core';
import { Collidable } from '../model/Collidable';
import { Square } from '../model/Square';
import { Vector2Clamp } from '../model/Vector2Clamp';
import { CollisionEvent2, Collision, Side } from '../model/CollisionEvent';
import { Range } from '../model/Range';

@Injectable({
  providedIn: 'root'
})
export class CollisionService {

  private collidables: Collidable[] = [];

  constructor() { }

  public checkForCollision(curr: Collidable, sides: Side[], exclude: Collidable = null): boolean {
    console.log("Checking", curr)
    const currSquare = curr.getSquare();
    let collisionCount = 0;

    for (const other of this.collidables) {
      if (other === curr || other === exclude) {
        continue;
      }
      const otherSquare = other.getSquare();
      const touchingSide: Side = currSquare.touchesV2(otherSquare);
      const isColliding = curr.isColliding(other);

      if(touchingSide !== null && sides.includes(touchingSide)){
        console.log('collided')
        other.onCollision({side: touchingSide, collidedWith: curr})
      }

      if (touchingSide !== null && sides.includes(touchingSide) && !isColliding) {
        curr.beginCollision({ side: touchingSide, collidedWith: other })
        // other.beginCollision({ side, collidedWith: curr })
        collisionCount++;
      } else if (touchingSide === null && isColliding) {
        curr.endCollision(other)
      }
    }

    return collisionCount > 0;
  }

  private findNearbyCollidables(xRange: Range, yRange: Range): Collidable[]{
    const nearby = [];

    

    return nearby;
  }

  public subscribe(collidable: Collidable): () => void {
    this.collidables.push(collidable);

    return () => this.unsubscribe(collidable);
  }

  unsubscribe(collidable: Collidable) {
    this.collidables = this.collidables.filter(it => it !== collidable);
  }
}
