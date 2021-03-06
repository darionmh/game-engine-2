import { Component, OnInit, Input } from '@angular/core';
import { Vector2 } from '../model/Vector2';
import { Collidable } from '../model/Collidable';
import { Square } from '../model/Square';
import { CollisionService } from '../services/collision.service';
import { CollisionEvent, Side } from '../model/CollisionEvent';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent implements OnInit, Collidable {

  isStatic: boolean = false;

  public position: Vector2;
  protected velocity: Vector2;

  @Input() windowWidth: number = 700;
  @Input() windowHeight: number = 700;

  @Input() x: number = 0;
  @Input() y: number = 0;

  protected width: number;
  protected height: number;

  public topStyle: string;
  public leftStyle: string;
  public widthStyle: string;
  public heightStyle: string;

  protected blockedSides: Side[] = [];
  protected renderTimeout = null;
  private speed = 1;

  constructor(protected collisionService: CollisionService) { 
    this.draw = this.draw.bind(this)
    this.adjustPosition = this.adjustPosition.bind(this)
    collisionService.subscribe(this);
    this.move = this.move.bind(this);
  }

  ngOnInit() {
    this.position = new Vector2(this.x, this.y);
    this.velocity = new Vector2(0, 0);

    this.width = 50;
    this.height = 50;

    this.draw();
  }

  draw(){
    this.topStyle = `${this.position.y}px`
    this.leftStyle = `${this.position.x}px`
    this.widthStyle = `${this.width}px`
    this.heightStyle = `${this.height}px`
  }

  adjustVelocity(x: number, y: number){
    this.velocity.x = x;
    this.velocity.y = y;
  }

  adjustPosition(){
    this.position = Vector2.ClampVector(Vector2.AddVectors(this.position, this.velocity), this.windowWidth - this.width, this.windowHeight - this.height);
  }

  move(x: number, y: number, callback: () => void){
    
    if(this.blockedSides.includes(Side.TOP) && y < 0) y = 0;
    if(this.blockedSides.includes(Side.BOTTOM) && y > 0) y = 0;
    if(this.blockedSides.includes(Side.LEFT) && x < 0) x = 0;
    if(this.blockedSides.includes(Side.RIGHT) && x > 0) x = 0;

    this.adjustVelocity(x, y);
    this.adjustPosition();

    this.renderTimeout = setTimeout(() => {
      this.renderTimeout = null;
      callback();
    }, this.speed)
  }

  onCollision(event: CollisionEvent){
    if(event.collidedWith.isStatic){
      this.blockedSides = event.sides;
    }else{
      if(event.collidedWith === this){
        //move
        this.move(event.collisionVector.x, event.collisionVector.y, this.draw);
        console.log(this)
      }else{
        //nothing
      }
    }
  }

  getSquare(): Square{
    return new Square(this.position, this.width, this.height);
  }

  getVelocityVector(): Vector2 {
    return this.velocity;
  }
}
