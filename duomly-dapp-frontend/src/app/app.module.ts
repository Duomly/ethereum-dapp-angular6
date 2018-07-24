import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouletteComponent } from './roulette/roulette.component';
import { RouletteService } from './roulette/services/roulette.service';
import { HistoryComponent } from './roulette/components/history/history.component';
import { GameComponent } from './roulette/components/game/game.component';
import { BetsComponent } from './roulette/components/bets/bets.component';
import { LotteryComponent } from './roulette/components/lottery/lottery.component';
import { FooterComponent } from './roulette/components/footer/footer.component';
import { GameHeaderComponent } from './roulette/components/game-header/game-header.component';

@NgModule({
   declarations: [
      AppComponent,
      RouletteComponent,
      HistoryComponent,
      GameComponent,
      BetsComponent,
      FooterComponent,
      LotteryComponent,
      GameHeaderComponent,
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpModule
   ],
   providers: [
     RouletteService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
