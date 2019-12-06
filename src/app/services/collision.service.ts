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

  public checkForCollision(collidable: Collidable, exclude: Collidable = null): boolean {
    const square = collidable.getSquare();

    const sides = [];
    for (const other of this.collidables) {
      if (other === collidable || other === exclude) {
        continue;
      }

      const otherSquare = other.getSquare();
      const currSides = square.touchesV2(otherSquare)
      // console.log(sides)
      if (currSides.length > 0) {
        // console.log("boop")
        sides.push(...square.touchesV2(otherSquare));
        collidable.onCollision({ sides, collidable, collidedWith: other, collisionVector: collidable.getVelocityVector() });
        other.onCollision({ sides, collidable, collidedWith: other, collisionVector: collidable.getVelocityVector() });
      }
    }

    return sides.length > 0;
  }

  public checkForCollision2(curr: Collidable, exclude: Collidable = null): boolean {

    let collisions: Collision[] = [];

    const currSquare = curr.getSquare();

    for (const other of this.collidables) {
      if (other === curr || other === exclude) {
        continue;
      }

      const otherSquare = other.getSquare();
      const sides = currSquare.touchesV2(otherSquare);
      if (sides.length > 0) {
        collisions.push({side: sides[0], collidedWith: other});
        other.onCollision2({collisions: [{side: sides[0], collidedWith: curr}]})
      }
    }

    curr.onCollision2({collisions})

    return collisions.length > 0;
  }

  public subscribe(collidable: Collidable): () => void {
    this.collidables.push(collidable);

    return () => this.unsubscribe(collidable);
  }

  unsubscribe(collidable: Collidable) {
    this.collidables = this.collidables.filter(it => it !== collidable);
  }
}
