import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import SAMPLE from '../../../assets/data/sample';
import { StatsBarData } from '../data/stats-bar';

@Injectable()
export class StatsBarService extends StatsBarData {

  getStatsBarData(): Observable<number[]> {
    let sample = SAMPLE.data.map(item => +(1000 * item.cost / item.impressions) )
    return observableOf(
      sample
      .map((item, i) => i-1 >= 0 ? item - sample[i-1] : item)
      .map(item => +item.toFixed(2))
    );
  }
}
