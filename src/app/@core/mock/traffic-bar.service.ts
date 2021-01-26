import { Injectable } from '@angular/core';
import { of as observableOf,  Observable } from 'rxjs';
import { PeriodsService } from './periods.service';
import { TrafficBarData, TrafficBar } from '../data/traffic-bar';
import SAMPLE from '../../../assets/data/sample';

@Injectable()
export class TrafficBarService extends TrafficBarData {

  constructor(private period: PeriodsService) {
    super();
  }

  getTrafficBarData(period: number): Observable<TrafficBar> {
    let slice = SAMPLE.data.slice(- period);
    return observableOf({
      data: slice.map(item => item.impressions),
      labels: slice.map(item => new Date(item.timestamp).toLocaleDateString()),
      formatter: '{c0} impressions',
    });
  }
}
