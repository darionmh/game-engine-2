import { Component, OnInit } from '@angular/core';
import { EntityComponent } from '../entity/entity.component';
import { CollisionService } from '../services/collision.service';
import { CollisionEvent, Collision } from '../model/CollisionEvent';

@Component({
  selector: 'app-static-entity',
  templateUrl: './static-entity.component.html',
  styleUrls: ['./static-entity.component.scss']
})
export class StaticEntityComponent extends EntityComponent implements OnInit {

  isStatic = true;

  constructor(protected collisionService: CollisionService) { 
    super(collisionService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
