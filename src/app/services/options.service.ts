import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  public windowWidth = 700;
  public windowHeight = 700;

  public chunkSize = 50;

  constructor() { }
}
