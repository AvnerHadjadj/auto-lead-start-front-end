import { Injectable } from '@angular/core';
import SAMPLE from '../../../assets/data/sample';

@Injectable()
export class PeriodsService {
  getYears() {
    return SAMPLE.data.map(item => new Date(item.timestamp).toString().split(' ')[3])
  }

  getMonths() {
    return SAMPLE.data.map(item => new Date(item.timestamp).toString().split(' ')[1])
  }

  getWeeks() {
    return [
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun',
    ];
  }
}
