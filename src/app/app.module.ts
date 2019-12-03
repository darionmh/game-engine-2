import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EntityComponent } from './entity/entity.component';
import { WindowComponent } from './window/window.component';
import { ControlledEntityComponent } from './controlled-entity/controlled-entity.component';
import { MazeComponent } from './maze/maze.component';

@NgModule({
  declarations: [
    AppComponent,
    EntityComponent,
    WindowComponent,
    ControlledEntityComponent,
    MazeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EntityComponent]
})
export class AppModule { }
