import { Component, OnInit } from '@angular/core';
import { RouletteService } from '../../services/roulette.service';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent implements OnInit {
  bets = [];

  constructor(public rouletteService: RouletteService) {
   }

  subscribeData() {
    this.rouletteService.playersSubject.subscribe((res) => {
      this.bets = res;
    });
  }

  ngOnInit() {
    this.subscribeData();
  }

}
