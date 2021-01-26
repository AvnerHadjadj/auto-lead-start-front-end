import { Injectable } from '@angular/core';
import { of as observableOf,  Observable } from 'rxjs';
import SAMPLE from '../../../assets/data/sample';
import { ProfitBarAnimationChartData } from '../data/profit-bar-animation-chart';

@Injectable()
export class ProfitBarAnimationChartService extends ProfitBarAnimationChartData {

  constructor() {
    super();
  }

  getChartData(): Observable<{ firstLine: number[]; secondLine: number[]; }> {
    return observableOf({
      firstLine: SAMPLE.data.map(item => item.cost),
      secondLine: SAMPLE.data.map(item => item.conversions),
    });
  }
}
