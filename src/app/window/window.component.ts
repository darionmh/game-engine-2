import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {

  public height = 700;
  public width = 700;

  constructor() { }

  ngOnInit() {
  }

}
