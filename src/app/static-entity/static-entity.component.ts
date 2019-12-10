import { Component, OnInit } from '@angular/core';
import { EntityComponent } from '../entity/entity.component';
import { CollisionService } from '../services/collision.service';
import { CollisionEvent, Collision } from '../model/CollisionEvent';
import { OptionsService } from '../services/options.service';

@Component({
  selector: 'app-static-entity',
  templateUrl: './static-entity.component.html',
  styleUrls: ['./static-entity.component.scss']
})
export class StaticEntityComponent extends EntityComponent implements OnInit {

  isStatic = true;

  constructor(protected collisionService: CollisionService, protected optionsService: OptionsService) { 
    super(collisionService, optionsService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
