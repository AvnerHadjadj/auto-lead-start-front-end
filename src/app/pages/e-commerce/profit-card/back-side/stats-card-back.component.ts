import { Component, OnDestroy } from '@angular/core';
import { StatsBarData } from '../../../../@core/data/stats-bar';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-stats-card-back',
  styleUrls: ['./stats-card-back.component.scss'],
  templateUrl: './stats-card-back.component.html',
})
export class StatsCardBackComponent implements OnDestroy {

  private alive = true;

  chartData: number[];
  averageCPM: string;
  maxCostCPM: string;

  constructor(private statsBarData: StatsBarData) {
    this.statsBarData.getStatsBarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.chartData = data;
        this.averageCPM = (data.reduce((prev, cur) => prev + cur) / data.length).toFixed(2)
        this.maxCostCPM = Math.max(...data).toFixed(2)
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
