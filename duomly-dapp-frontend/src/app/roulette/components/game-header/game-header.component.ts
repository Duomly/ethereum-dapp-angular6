import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.scss']
})
export class GameHeaderComponent implements OnInit {
  logoUrl = 'assets/logo.png';
  constructor() { }

  ngOnInit() {
  }

}
