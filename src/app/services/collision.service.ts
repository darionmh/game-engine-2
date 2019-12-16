import { Injectable } from '@angular/core';
import { Collidable } from '../model/Collidable';
import { Square } from '../model/Square';
import { Vector2Clamp } from '../model/Vector2Clamp';
import { CollisionEvent2, Collision, Side } from '../model/CollisionEvent';
import { Range } from '../model/Range';
import { Vector2 } from '../model/Vector2';
import { OptionsService } from './options.service';

@Injectable({
  providedIn: 'root'
})
export class CollisionService {

  private collidables = {};

  private width;
  private height;
  private chunkSize;

  private collidableChunks: Chunk[][] = [];

  constructor(private optionsService: OptionsService) {
    this.width = optionsService.windowWidth;
    this.height = optionsService.windowHeight;
    this.chunkSize = optionsService.chunkSize;

    let yChunks = Math.ceil(this.height / this.chunkSize);
    let xChunks = Math.ceil(this.width / this.chunkSize);
    for (let y = 0; y < yChunks; y++) {
      let row = [];
      for (let x = 0; x < xChunks; x++) {
        row.push(new Chunk())
      }
      this.collidableChunks.push(row);
    }
  }

  public checkForCollision(curr: Collidable, sides: Side[], exclude: Collidable = null): boolean {
    const currSquare = curr.getSquare();
    let collisionCount = 0;

    const surroundingChunks = this.getSurroundingCollidables(curr.getPosition(), curr.getSquare().height, curr.getSquare().width);
    const stagedCollisions = [];
    

    for (const other of surroundingChunks) {
      
      if (other === null || other === curr || other === exclude) {
        continue;
      }

      const otherSquare = other.getSquare();
      const touchingSide: Side = currSquare.touches(otherSquare);
      const isColliding = curr.isColliding(other);
      if (touchingSide !== null && sides.includes(touchingSide)) {
        // curr.onCollision({side: touchingSide, collidedWith: other});
        curr.didCollide(touchingSide);
        stagedCollisions.push(() => other.onCollision({ side: touchingSide, collidedWith: curr }))
        collisionCount++;
      }

      if (touchingSide !== null && sides.includes(touchingSide) && !isColliding) {
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
    
    // this.getChunk(collidable.getPosition()).collidables.push(collidable);

    this.getChunks(collidable.getPosition(), collidable.getSquare().height, collidable.getSquare().width).forEach(it => it.collidables.push(collidable));

    return () => this.unsubscribe(collidable);
  }

  public updateLocation(collidable: Collidable, oldPosition: Vector2) {
    this.removeFromChunk(collidable, oldPosition);
    this.getChunks(collidable.getPosition(), collidable.getSquare().height, collidable.getSquare().width).forEach(it => it.collidables.push(collidable));
  }

  private getSurroundingCollidables(position: Vector2, height: number, width: number): Collidable[] {
    const chunkYSpan = Math.ceil(height / this.chunkSize);
    const chunkXSpan = Math.ceil(width / this.chunkSize);
    const chunkXStart = Math.floor(position.x / this.chunkSize);
    const chunkYStart = Math.floor(position.y / this.chunkSize);
    const chunkXMin = Math.max(chunkXStart - 1, 0);
    const chunkXMax = Math.min(chunkXStart + chunkXSpan + 1, this.chunkSize);
    const chunkYMin = Math.max(chunkYStart - 1, 0);
    const chunkYMax = Math.min(chunkYStart + chunkYSpan + 1, this.chunkSize);

    let collidables = [];
    for(let y=chunkYMin;y<chunkYMax;y++){
      for(let x=chunkXMin;x<chunkXMax;x++){
        if(this.collidableChunks[y] && this.collidableChunks[y][x]){
        for(let c of this.collidableChunks[y][x].collidables){
          if(!collidables.includes(c)){
            collidables.push(c);
          }
        }
      }
      }
    }
    return collidables;
  }

  private getChunks(position: Vector2, height: number, width: number): Chunk[] {
    const chunkYSpan = Math.ceil(height / this.chunkSize);
    const chunkXSpan = Math.ceil(width / this.chunkSize);
    const chunkXStart = Math.floor(position.x / this.chunkSize);
    const chunkYStart = Math.floor(position.y / this.chunkSize);

    const chunks = [];

    for(let dy=0;dy<chunkYSpan;dy++){
      for(let dx=0;dx<chunkXSpan;dx++){
        chunks.push(this.collidableChunks[dy + chunkYStart][dx + chunkXStart]);
      }
    }

    return chunks;
  }

  private removeFromChunk(collidable: Collidable, oldPosition: Vector2) {
    const chunks = this.getChunks(oldPosition, collidable.getSquare().height, collidable.getSquare().width);
    chunks.forEach(chunk => chunk.collidables = chunk.collidables.filter(it => it.id !== collidable.id));
  }

  unsubscribe(collidable: Collidable) {
    this.collidables[collidable.id] = null;
  }
}

class Chunk {
  collidables: Collidable[] = [];
}
