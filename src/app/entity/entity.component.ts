import { Component, OnInit, Input } from '@angular/core';
import { Vector2 } from '../model/Vector2';
import { Collidable } from '../model/Collidable';
import { Square } from '../model/Square';
import { CollisionService } from '../services/collision.service';
import { CollisionEvent, Side, CollisionEvent2, Collision, invertSide } from '../model/CollisionEvent';
import { debug } from 'util';
import uuidv1 from 'uuid/v1';
import { OptionsService } from '../services/options.service';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent implements OnInit, Collidable {
  id = uuidv1();
  isStatic: boolean = false;

  public position: Vector2;
  protected velocity: Vector2;
  protected tempVelocity: Vector2;

  private windowWidth;
  private windowHeight;

  @Input() x: number = 0;
  @Input() y: number = 0;

  @Input() width: number = 50;
  @Input() height: number = 50;

  public topStyle: string;
  public leftStyle: string;
  public widthStyle: string;
  public heightStyle: string;

  public activeCollisions: Collision[] = [];
  protected renderTimeout = null;
  private speed = 1;

  constructor(protected collisionService: CollisionService, protected optionsService: OptionsService) {
    this.windowWidth = optionsService.windowWidth;
    this.windowHeight = optionsService.windowHeight;

    this.draw = this.draw.bind(this)
    this.adjustPosition = this.adjustPosition.bind(this)
    this.move = this.move.bind(this);
  }

  ngOnInit() {
    this.position = new Vector2(this.x, this.y);
    this.velocity = new Vector2(0, 0);
    this.tempVelocity = new Vector2(0, 0);

    this.collisionService.subscribe(this);

    this.draw();
  }

  draw() {
    this.topStyle = `${this.position.y}px`
    this.leftStyle = `${this.position.x}px`
    this.widthStyle = `${this.width}px`
    this.heightStyle = `${this.height}px`
  }

  adjustVelocity(x: number, y: number) {
    this.velocity.x = x;
    this.velocity.y = y;
  }

  adjustPosition(x: number, y: number) {
    this.position = Vector2.ClampVector(Vector2.AddVectors(this.position, new Vector2(x, y)), this.windowWidth - this.width, this.windowHeight - this.height);
  }

  move(x: number, y: number, callback: () => void) {
    let blockedSides = this.getBlockedSides(new Vector2(x,y).toSides());

    if (blockedSides.includes(Side.TOP) && y < 0) y = 0;
    if (blockedSides.includes(Side.BOTTOM) && y > 0) y = 0;
    if (blockedSides.includes(Side.LEFT) && x < 0) x = 0;
    if (blockedSides.includes(Side.RIGHT) && x > 0) x = 0;

    const oldPosition = this.position;

    // this.adjustVelocity(x, y);
    this.adjustPosition(x, y);
    this.collisionService.updateLocation(this, oldPosition);

    this.draw();
    this.renderTimeout = setTimeout(() => {
      this.renderTimeout = null;
      callback();
    }, this.speed)
  }

  beginCollision(collision: Collision) {
    this.activeCollisions.push(collision);
  }

  isColliding(collidable: Collidable): boolean {
    for (let activeCollision of this.activeCollisions) {
      if (activeCollision.collidedWith === collidable) {
        return true;
      }
    }

    return false;
  }

  endCollision(collidable: Collidable) {
    this.activeCollisions = this.activeCollisions.filter(it => it.collidedWith !== collidable);
  }

  onCollision(collision: Collision) {
    if (this.isStatic) {
      //no op
    } else {
      console.log('collision')
      const velocity = collision.collidedWith.getVelocityVector().restrictToSide(collision.side).blockSides(collision.collidedWith.getBlockedSides([collision.side]));
      this.tempVelocity = velocity;
      if(!this.collisionService.checkForCollision(this, [collision.side], collision.collidedWith)){
        this.activeCollisions = [];
      }
      this.move(velocity.x, velocity.y, () => this.draw());
    }
  }

  getSquare(): Square {
    return new Square(this.position, this.width, this.height);
  }

  getVelocityVector(): Vector2 {
    return this.tempVelocity;
  }

  getEntity(): EntityComponent {
    return this;
  }

  getBlockedSides(activeSides: Side[]): Side[] {
    let blockedSides = [];
    if (this.position.x <= 0) {
      blockedSides.push(Side.LEFT);
    }
    if (this.position.x >= this.windowWidth - this.width) {
      blockedSides.push(Side.RIGHT);
    }
    if (this.position.y <= 0) {
      blockedSides.push(Side.TOP);
    }
    if (this.position.y >= this.windowHeight - this.height) {
      blockedSides.push(Side.BOTTOM);
    }
    this.activeCollisions.forEach(it => {
      if (activeSides.includes(it.side)) {
        if(it.collidedWith.isStatic)
          blockedSides.push(it.side)
        blockedSides.push(...it.collidedWith.getBlockedSides(activeSides));
      }
    })

    return blockedSides;
  }

  getPosition(): Vector2 {
    return this.position;
  }

  didCollide(side: Side){}
}
