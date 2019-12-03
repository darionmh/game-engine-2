import { Component, OnInit, HostListener } from '@angular/core';
import { EntityComponent } from '../entity/entity.component';
import { CollisionService } from '../services/collision.service';
import { CollisionEvent, Side } from '../model/CollisionEvent';
import { Vector2Clamp } from '../model/Vector2Clamp';

@Component({
  selector: 'app-controlled-entity',
  templateUrl: './controlled-entity.component.html',
  styleUrls: ['./controlled-entity.component.scss']
})
export class ControlledEntityComponent extends EntityComponent implements OnInit {

  private heldKeys = {
    87: false, //w
    65: false, //a
    83: false, //s
    68: false //d
  };

  private blockedSides: Side[] = [];

  private keyCount = 0;
  private renderTimeout = null;
  private speed = 1;

  constructor(protected collisionService: CollisionService) { 
    super(collisionService);

    this.render = this.render.bind(this)
    this.move = this.move.bind(this)
  }

  ngOnInit() {
    super.ngOnInit();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDownEvent(event: KeyboardEvent) { 
    if(!this.heldKeys[event.which]){
      this.heldKeys[event.which] = true;
      this.keyCount++;
      if(this.keyCount === 1){
        console.log("start render")
        this.move();
        this.render();
      }
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyUpEvent(event: KeyboardEvent) { 
    this.heldKeys[event.which] = false;
    this.keyCount--;

    if(this.keyCount === 0 && this.renderTimeout){
      clearTimeout(this.renderTimeout)
      this.renderTimeout = null;
    }
  }


  @HostListener('window:blur', ['$event'])
  onBlur(event: any): void {
      this.keyCount = 0;
      this.heldKeys[KEYS.W] = false;
      this.heldKeys[KEYS.A] = false;
      this.heldKeys[KEYS.S] = false;
      this.heldKeys[KEYS.D] = false;
  }

  move(){
    console.log("move");
    if(this.keyCount){
      if(!this.collisionService.checkForCollision(this)){
        this.blockedSides = [];
      }

      let x = this.heldKeys[KEYS.A] && !this.heldKeys[KEYS.D] ? -1 : this.heldKeys[KEYS.D] && !this.heldKeys[KEYS.A] ? 1 : 0
      let y = this.heldKeys[KEYS.W] && !this.heldKeys[KEYS.S] ? -1 : this.heldKeys[KEYS.S] && !this.heldKeys[KEYS.W] ? 1 : 0

      if(this.blockedSides.includes(Side.TOP) && y < 0) y = 0;
      if(this.blockedSides.includes(Side.BOTTOM) && y > 0) y = 0;
      if(this.blockedSides.includes(Side.LEFT) && x < 0) x = 0;
      if(this.blockedSides.includes(Side.RIGHT) && x > 0) x = 0;

      this.adjustVelocity(x, y);
      this.adjustPosition();

      // if(!this.collisionService.checkForCollision(this)){
        this.renderTimeout = setTimeout(() => {
          this.renderTimeout = null;
          this.move();
        }, this.speed)
      // }
    }
  }

  render(){
    console.log("render");
    if(this.keyCount){
      this.draw();
      window.requestAnimationFrame(this.render);
    }
  }

  onCollision(event: CollisionEvent){
    this.blockedSides = event.sides;
  }
}

enum KEYS {
  W = 87, A = 65, S = 83, D = 68
}