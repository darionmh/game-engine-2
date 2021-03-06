import { Component, OnInit, HostListener } from '@angular/core';
import { EntityComponent } from '../entity/entity.component';
import { CollisionService } from '../services/collision.service';
import { CollisionEvent, Side } from '../model/CollisionEvent';
import { Vector2Clamp } from '../model/Vector2Clamp';
import { Vector2 } from '../model/Vector2';

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

  private keyCount = 0;

  constructor(protected collisionService: CollisionService) { 
    super(collisionService);

    this.render = this.render.bind(this)
    this.move = this.move.bind(this)
    this.handleMove = this.handleMove.bind(this);
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
        this.handleMove();
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

  handleMove(){
    if(this.keyCount){
      let x = this.heldKeys[KEYS.A] && !this.heldKeys[KEYS.D] ? -1 : this.heldKeys[KEYS.D] && !this.heldKeys[KEYS.A] ? 1 : 0
      let y = this.heldKeys[KEYS.W] && !this.heldKeys[KEYS.S] ? -1 : this.heldKeys[KEYS.S] && !this.heldKeys[KEYS.W] ? 1 : 0

      if(!this.collisionService.checkForCollision(this)){
        this.blockedSides = [];
      }
      
      this.move(x, y, this.handleMove);
    }
  }

  render(){
    console.log("render");
    if(this.keyCount){
      this.draw();
      window.requestAnimationFrame(this.render);
    }
  }
}

enum KEYS {
  W = 87, A = 65, S = 83, D = 68
}