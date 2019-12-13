import { Component, OnInit } from '@angular/core';
import { EntityComponent } from '../entity/entity.component';
import { CollisionService } from '../services/collision.service';
import { OptionsService } from '../services/options.service';
import { bindNodeCallback } from 'rxjs';

@Component({
  selector: 'app-elastic-entity',
  templateUrl: './elastic-entity.component.html',
  styleUrls: ['./elastic-entity.component.scss']
})
export class ElasticEntityComponent extends EntityComponent implements OnInit {

  public rotation: number = 42;

  constructor(protected collisionService: CollisionService, protected optionsService: OptionsService) {
    super(collisionService, optionsService);

    this.tick = this.tick.bind(this);
  }

  ngOnInit() {
    super.ngOnInit();
    this.tick();
  }

  tick(){
    this.move(1, 0, () => {});
    this.rotation += 10;
    requestAnimationFrame(this.tick);
  }
}
