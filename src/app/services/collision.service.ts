import { Injectable } from '@angular/core';
import { Collidable } from '../model/Collidable';
import { Square } from '../model/Square';
import { Vector2Clamp } from '../model/Vector2Clamp';
import { CollisionEvent2, Collision, Side } from '../model/CollisionEvent';
import { Range } from '../model/Range';
import { Vector2 } from '../model/Vector2';

@Injectable({
  providedIn: 'root'
})
export class CollisionService {

  private collidables = {};

  private width = 700;
  private height = 700;
  private chunkSize = 50;

  private collidableChunks: Collidable[][][] = [];

  constructor() {
    let yChunks = Math.ceil(this.height / this.chunkSize);
    let xChunks = Math.ceil(this.width / this.chunkSize);
    for (let y = 0; y < yChunks; y++) {
      let row = [];
      for (let x = 0; x < xChunks; x++) {
        row.push([])
      }
      this.collidableChunks.push(row);
    }
  }

  public checkForCollision(curr: Collidable, sides: Side[], exclude: Collidable = null): boolean {
    console.log("Checking", curr)
    const currSquare = curr.getSquare();
    let collisionCount = 0;

    const surroundingChunks = this.getSurroundingChunks(curr.getPosition());
    console.log("surrounding", surroundingChunks)
    const stagedCollisions = [];
    for (const other of surroundingChunks) {
      console.log('looing at ', other)
      if (other === null || other === curr || other === exclude) {
        continue;
      }
      const otherSquare = other.getSquare();
      const touchingSide: Side = currSquare.touches(otherSquare);
      const isColliding = curr.isColliding(other);

      if (touchingSide !== null && sides.includes(touchingSide)) {
        console.log('collided', other)
        stagedCollisions.push(() => other.onCollision({ side: touchingSide, collidedWith: curr }))
        collisionCount++;
      }

      if (touchingSide !== null && sides.includes(touchingSide) && !isColliding) {
        console.log('collided', other)
        curr.beginCollision({ side: touchingSide, collidedWith: other })
        // other.beginCollision({ side, collidedWith: curr })
        collisionCount++;
      } else if (touchingSide === null && isColliding) {
        curr.endCollision(other)
      }
    }
    stagedCollisions.forEach(it => it())

    return collisionCount > 0;
  }

  public subscribe(collidable: Collidable): () => void {
    this.collidables[collidable.id] = collidable;
    console.log(collidable)
    this.getChunk(collidable.getPosition()).push(collidable);

    return () => this.unsubscribe(collidable);
  }

  public updateLocation(collidable: Collidable, oldPosition: Vector2) {
    this.removeFromChunk(collidable, oldPosition);
    this.getChunk(collidable.getPosition()).push(collidable);
  }

  private getSurroundingChunks(position: Vector2): Collidable[] {
    let yChunk = Math.floor(position.y / this.chunkSize);
    let xChunk = Math.floor(position.x / this.chunkSize);

    let chunks = [];
    for (let dy = -1; dy < 2; dy++) {
      if (dy + yChunk < 0 || dy + yChunk >= this.collidableChunks.length) {
        continue;
      }

      for (let dx = -1; dx < 2; dx++) {
        if (dx + xChunk < 0 || dx + xChunk >= this.collidableChunks[dy + yChunk].length) {
          continue;
        }

        chunks.push(...this.collidableChunks[dy + yChunk][dx + xChunk]);
      }
    }

    return chunks;
  }

  private getChunk(position: Vector2): Collidable[] {
    console.log(position)
    let yChunk = Math.floor(position.y / this.chunkSize);
    let xChunk = Math.floor(position.x / this.chunkSize);
    console.log(yChunk, xChunk);

    return this.collidableChunks[yChunk][xChunk];
  }

  private removeFromChunk(collidable: Collidable, oldPosition: Vector2) {
    let yChunk = Math.floor(oldPosition.y / this.chunkSize);
    let xChunk = Math.floor(oldPosition.x / this.chunkSize);

    this.collidableChunks[yChunk][xChunk] = this.collidableChunks[yChunk][xChunk].filter(it => it.id !== collidable.id);
  }

  unsubscribe(collidable: Collidable) {
    this.collidables[collidable.id] = null;
  }
}
