import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/';
import rouletteAbi from '../../abi/roulette';
import * as avatars from 'identity-img';

declare global {
  interface Window { web3: any; }
}

window.web3 = window.web3 || {};

@Injectable()
export class RouletteService {
  web3;
  contractAddress = '0x818811b304b0f283f7ca9cff616921e3b1ed2bd2';
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
    this.web3 = window.web3;
    this.contract = this.createContract(rouletteAbi, this.contractAddress);
    this.updateData();
  }

  createContract(contractAbi, contractAddress) {
    const contract = new this.web3.eth.Contract(contractAbi, contractAddress);
    return contract;
  }

  updateData() {
    this.web3.eth.getAccounts().then((res) => {
      this.accountSubject.next(res.length > 0 ? res[0] : null);
      this.account = res.length > 0 ? res[0] : null;
      if (this.account) {
        this.getBalance(this.account);
        this.getPlayers();
        this.getHistory();
        this.getTotalBet();
        this.getLastWinner();
        this.getBetValue();
        this.getMyBets();
      }
    });
  }

  createAvatar(address) {
    const src = avatars.create(address);
    return src;
  }

  getPlayers() {
      this.contract.methods.betsCount().call({}).then((res) => {
        const players = [];
        if(res === 0) {
          this.playersSubject.next(players)
        }
        for (let i = 0; i < res; i++) {
          this.contract.methods.players(i).call({}).then((playerRes) => {
            const player = {
              avatar: this.createAvatar(playerRes),
              address: playerRes,
            };
            players.push(player);
            if (Number(i + 1) >= res) {
              this.playersSubject.next(players);
            }
          });
        }
      });
  }

  getMyBets() {
    this.contract.methods.betsCount().call({}).then((res) => {
      const betsCount = Number(res);
      let myBets = 0;
      for (let i = 0; i < res; i++) {
        this.contract.methods.players(i).call({}).then((playerRes) => {
          if (playerRes === this.account) {
            myBets += 1;
          }
          if (Number(i + 1) >= res) {
            const chance = (100 / betsCount) * myBets;
            const betsInfo = {
              betsCount,
              myBets,
              chance
            }
            this.betsInfoSubject.next(betsInfo);
          }
        });
      }
    });
  }

  getHistory() {
      this.contract.methods.games().call({}).then((res) => {
        const games = [];
        for (let i = 0; i < res; i++) {
          this.contract.methods.history(i).call({}).then((gameRes) => {
            const game = {
              blockNumber: gameRes.blockNumber,
              address: gameRes.winnerAddress,
              amount: this.web3.utils.fromWei(gameRes.value, 'ether'),
            };
            games.push(game);
            if (Number(i + 1) >= res) {
              this.historySubject.next(games);
            }
          });
        }
      });
  }

  getTotalBet() {
    this.contract.methods.totalBet().call({}).then((res) => {
      this.totalBetSubject.next(res);
    });
  }

  getLastWinner() {
    this.contract.methods.lastWinner().call({}).then((res) => {
      this.lastWinnerSubject.next(res);
    });
  }

  getBetValue() {
    this.contract.methods.betValue().call({}).then((res) => {
      this.betValueSubject.next(res);
    });
  }

  getBalance(address) {
    this.web3.eth.getBalance(address).then((res)=>{
      this.balanceSubject.next(res);
    });
  }

  bet() {
    const that = this;
    if (this.account) {
      this.contract.methods.bet().send({
        gas:  4665264,
        from: this.account,
        value: this.web3.utils.toWei('0.001', 'ether'),
      }, (err) => {
        if (!err) {
          that.minningSubject.next(true);
        }
      }).then(() => {
        this.minningSubject.next(false);
        this.updateData();
      }).catch(() => {
        this.minningSubject.next(false);
        this.updateData();
      });
    }

  }

  play() {
    if (this.account) {
      this.contract.methods.startLottery().send({
        gas:  4665264,
        from: this.account,
      }, (err) => {
        if (!err) {
          this.minningSubject.next(true);
        }
      }).then(() => {
        this.minningSubject.next(false);
        this.updateData();
        window.location.reload();
      }).catch(() => {
        this.minningSubject.next(false);
        this.updateData();
        window.location.reload();
      });
    }
  }
}
