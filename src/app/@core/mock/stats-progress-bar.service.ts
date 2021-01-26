import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import SAMPLE from '../../../assets/data/sample';
import { ProgressInfo, StatsProgressBarData } from '../data/stats-progress-bar';

@Injectable()
export class StatsProgressBarService extends StatsProgressBarData {
  private activeProgress = {
    conversions: +(SAMPLE.data[SAMPLE.data.length - 1].conversions / SAMPLE.data[SAMPLE.data.length - 8].conversions).toFixed(0),
    clicks: +(SAMPLE.data[SAMPLE.data.length - 1].clicks / SAMPLE.data[SAMPLE.data.length - 8].clicks).toFixed(0),
    cost: +(SAMPLE.data[SAMPLE.data.length - 1].cost / SAMPLE.data[SAMPLE.data.length - 8].cost).toFixed(0),
  };
  private progressInfoData: ProgressInfo[] = [
    {
      title: 'Today’s Conversions',
      value: SAMPLE.data[SAMPLE.data.length - 1].conversions,
      activeProgress: this.activeProgress.conversions,
      description: `Better than last week (${this.activeProgress.conversions}%)`,
    },
    {
      title: 'Today’s Clicks',
      value: SAMPLE.data[SAMPLE.data.length - 1].clicks,
      activeProgress: this.activeProgress.clicks,
      description: `Better than last week (${this.activeProgress.clicks}%)`,
    },
    {
      title: 'Today’s Costs ($)',
      value: SAMPLE.data[SAMPLE.data.length - 1].cost,
      activeProgress: this.activeProgress.cost,
      description: `Better than last week (${this.activeProgress.cost}%)`,
    }
  ];

  getProgressInfoData(): Observable<ProgressInfo[]> {
    return observableOf(this.progressInfoData);
  }
}
