import { Component, OnInit } from '@angular/core';
import { RouletteService } from '../../services/roulette.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history = [];
  constructor(public rouletteService: RouletteService) {
   }

  subscribeData() {
    this.rouletteService.historySubject.subscribe((res) => {
      this.history = res;
    });
  }

  ngOnInit() {
    this.subscribeData();
  }

}
