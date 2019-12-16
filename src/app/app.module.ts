import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EntityComponent } from './entity/entity.component';
import { WindowComponent } from './window/window.component';
import { ControlledEntityComponent } from './controlled-entity/controlled-entity.component';
import { MazeComponent } from './maze/maze.component';
import { StaticEntityComponent } from './static-entity/static-entity.component';
import { ElasticEntityComponent } from './elastic-entity/elastic-entity.component';
import { CoreComponent } from './core/core.component';

@NgModule({
  declarations: [
    AppComponent,
    EntityComponent,
    WindowComponent,
    ControlledEntityComponent,
    MazeComponent,
    StaticEntityComponent,
    ElasticEntityComponent,
    CoreComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EntityComponent]
})
export class AppModule { }
