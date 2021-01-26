import { Injectable } from '@angular/core';
import { of as observableOf,  Observable } from 'rxjs';
import { PeriodsService } from './periods.service';
import { TrafficList, TrafficListData } from '../data/traffic-list';
import SAMPLE from '../../../assets/data/sample';

@Injectable()
export class TrafficListService extends TrafficListData {

  private data = {};

  constructor() {
    super();
  }

  getTrafficListData(period: number): Observable<TrafficList[]> {
    return observableOf(
      SAMPLE.data
      .slice(-period)
      .map((item, index) => {
        let previousItem = index - 1 > 0 ? SAMPLE.data[index - 1] : SAMPLE.data[SAMPLE.data.length - period - 1];
        let nextItem = index + 1 < period ? SAMPLE.data[index + 1] : null;
        let deltaValue = (item.conversions + previousItem.conversions) / previousItem.conversions;
        
        return {
          date: item.timestamp,
          value: item.conversions,
          delta: {
            up: deltaValue <= 0,
            value: +Math.abs(deltaValue).toFixed(2),
          },
          comparison: {
            prevDate: previousItem.conversions.toFixed(0),
            prevValue: previousItem.conversions,
            nextDate: nextItem ? nextItem.conversions.toFixed(0) : '0',
            nextValue: nextItem ? nextItem.conversions : 0,
          },
        };
      })
    );
  }
}
