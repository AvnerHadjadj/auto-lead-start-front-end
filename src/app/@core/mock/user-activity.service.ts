import { Injectable } from '@angular/core';
import { of as observableOf,  Observable } from 'rxjs';
import { PeriodsService } from './periods.service';
import { UserActive, UserActivityData } from '../data/user-activity';
import SAMPLE from '../../../assets/data/sample';

@Injectable()
export class UserActivityService extends UserActivityData {

  constructor() {
    super();
  }

  getUserActivityData(period: number): Observable<UserActive[]> {
    return observableOf(
      SAMPLE.data
      .sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(- period)
      .map((item, i) => {
        return {
          date: item.timestamp,
          pagesVisitCount: item.impressions,
          deltaUp: SAMPLE.data[i-1] ? (item.impressions - SAMPLE.data[i-1].impressions) < 0 : true,
          newVisits: item.clicks,
        }
      })
    );
  }
}
