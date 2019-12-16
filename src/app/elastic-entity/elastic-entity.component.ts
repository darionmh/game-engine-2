import { Component, OnInit } from '@angular/core';
import { EntityComponent } from '../entity/entity.component';
import { CollisionService } from '../services/collision.service';
import { OptionsService } from '../services/options.service';
import { Collision, Side } from '../model/CollisionEvent';
import { Vector2 } from '../model/Vector2';
import { Collidable } from '../model/Collidable';

@Component({
  selector: 'app-elastic-entity',
  templateUrl: './elastic-entity.component.html',
  styleUrls: ['./elastic-entity.component.scss']
})
export class ElasticEntityComponent extends EntityComponent implements OnInit {

  public rotation: number = 0;

  constructor(protected collisionService: CollisionService, protected optionsService: OptionsService) {
    super(collisionService, optionsService);

    this.tick = this.tick.bind(this);
    this.onCollision = this.onCollision.bind(this);
   }

  ngOnInit() {
    super.ngOnInit();

    this.velocity = new Vector2(Math.random(), 1);
    this.tick();
  }

  tick(){    
    const x = this.velocity.x;
    const y = this.velocity.y;

    const sides: Side[] = [];

    if(x > 0){
      sides.push(Side.RIGHT);
    }
    if(x < 0){
      sides.push(Side.LEFT);
    }
    if(y > 0){
      sides.push(Side.BOTTOM);
    }
    if(y < 0){
      sides.push(Side.TOP);
    }

    this.collisionService.checkForCollision(this, sides)
    this.move(x, y, () => requestAnimationFrame(this.tick));
  }

  didCollide(side: Side){
    this.velocity = this.velocity.applySide(side);

    this.move(this.velocity.x, this.velocity.y, ()=>{});

    if (this.isStatic) {
      //no op
    } else {
    }
  }
}
