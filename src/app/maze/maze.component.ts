import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';
import { EntityComponent } from '../entity/entity.component';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss']
})
export class MazeComponent implements OnInit {
  @ViewChild("mazeContainer", {read: ViewContainerRef, static: false}) container;
  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
   
    const width = 50;
    const max = 5;

    for(let i=0;i<10;i++){
      const x = Math.floor(Math.random() * (max - 1)) + 1;
      const y = Math.floor(Math.random() * (max - 1)) + 1;

      this.createComponent(x * width, y * width);
    }
  }

  createComponent(x: number, y: number) {
    const factory: ComponentFactory<EntityComponent> = this.resolver.resolveComponentFactory(EntityComponent)
    const entity: ComponentRef<EntityComponent> = this.container.createComponent(factory);
    
    entity.instance.x = x;
    entity.instance.y = y;

    entity.instance.ngOnInit();
  }
}
