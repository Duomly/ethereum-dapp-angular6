import { Component, OnInit } from '@angular/core';
import { RouletteService } from './../../services/roulette.service';
@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.scss']
})
export class LotteryComponent implements OnInit {
  lastWinner;
  loading;
  constructor(public rouletteService: RouletteService) {
  }


  subScribeData() {
    this.rouletteService.lastWinnerSubject.subscribe((winner) => {
      this.lastWinner = winner;
    });
    this.rouletteService.minningSubject.subscribe((res) => {
      this.toggleLoader(res);
    });
  }

  toggleLoader(open) {
    this.loading = open;
  }

  play() {
    this.loading = true;
    this.rouletteService.play();
  }


  bet() {
    this.loading = true;
    this.rouletteService.bet();
  }

  ngOnInit() {
    this.subScribeData();
  }

}
