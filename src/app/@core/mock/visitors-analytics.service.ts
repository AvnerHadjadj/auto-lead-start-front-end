import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { PeriodsService } from './periods.service';
import { OutlineData, VisitorsAnalyticsData } from '../data/visitors-analytics';
import SAMPLE from '../../../assets/data/sample';
import { timestamp } from 'rxjs/operators';

@Injectable()
export class VisitorsAnalyticsService extends VisitorsAnalyticsData {

  constructor(private periodService: PeriodsService) {
    super();
  }

  private pieChartValue = (100 * +SAMPLE.data.map(item => item.conversions/item.clicks).reduce((a,b) => a+b) / SAMPLE.data.length);
  private innerLinePoints: number[] = SAMPLE.data.map(item => item.conversions);
  private outerLinePoints: string[] = SAMPLE.data.map(item => item.timestamp);
  private generateOutlineLineData(): OutlineData[] {

    return this.outerLinePoints.map((timestamp, index) => {
      return {
        label: (index % Math.round(this.outerLinePoints.length / 4) === 0) 
                ? Intl.DateTimeFormat().format(new Date(timestamp))
                : '',
        value: SAMPLE.data[index].clicks,
      }
    });

  }

  getInnerLineChartData(): Observable<number[]> {
    return observableOf(this.innerLinePoints);
  }

  getOutlineLineChartData(): Observable<OutlineData[]> {
    return observableOf(this.generateOutlineLineData());
  }

  getPieChartData(): Observable<number> {
    return observableOf(this.pieChartValue);
  }
}
