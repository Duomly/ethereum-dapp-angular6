import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/';

@Injectable()
export class RouletteService {
  web3;
  contractAddress = '';
  contract;
  account;
  totalBetSubject: BehaviorSubject<any> = new BehaviorSubject(<any>0);
  accountSubject: BehaviorSubject<any> = new BehaviorSubject(<any>null);
  lastWinnerSubject: BehaviorSubject<any> = new BehaviorSubject(<any>null);
  betValueSubject: BehaviorSubject<any> = new BehaviorSubject(<any>null);
  balanceSubject: BehaviorSubject<any> = new BehaviorSubject(<any>null);
  playersSubject: BehaviorSubject<any> = new BehaviorSubject(<any>[]);
  historySubject: BehaviorSubject<any> = new BehaviorSubject(<any>[]);
  minningSubject: BehaviorSubject<any> = new BehaviorSubject(<any>false);
  betsInfoSubject: BehaviorSubject<any> = new BehaviorSubject(<any>{});

  constructor() {

  }

  createAvatar() {

  }

  getPlayers() {

  }

  getMyBets() {

  }

  getHistory() {

  }

  getTotalBet() {

  }

  getLastWinner() {

  }

  getBetValue() {

  }

  getBalance() {

  }

  bet() {

  }

  play() {

  }
}
