import { Component, OnInit } from '@angular/core';
import { RouletteService } from '../../services/roulette.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  totalBet = 0;
  web3;
  account;
  bets = 0;
  myBets = 0;
  chance = 0;
  balance = 0;
  betValue = 0;
  constructor(
    public rouletteService: RouletteService
  ) {
  }

  subscribeData() {
    this.rouletteService.accountSubject.subscribe((res) => {
      this.account = res;
    });
    this.rouletteService.balanceSubject.subscribe((res) => {
      this.balance = res;
    });
    this.rouletteService.betValueSubject.subscribe((res) => {
      this.betValue = res ? res : 0;
    });
    this.rouletteService.totalBetSubject.subscribe((res) => {
      this.totalBet = res ? res : 0;
    });
    this.rouletteService.betsInfoSubject.subscribe((res) => {
      this.bets = res.betsCount ? res.betsCount : 0;
      this.myBets = res.myBets ? res.myBets : 0;
      this.chance = res.chance ? res.chance.toPrecision(4) : 100;
    });
  }
  ngOnInit() {
    this.subscribeData();
  }

}
