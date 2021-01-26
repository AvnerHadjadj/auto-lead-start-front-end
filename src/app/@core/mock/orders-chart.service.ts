import { Injectable } from '@angular/core';
import { PeriodsService } from './periods.service';
import { OrdersChart, OrdersChartData } from '../data/orders-chart';
import SAMPLE from '../../../assets/data/sample';

@Injectable()
export class OrdersChartService extends OrdersChartData {

  constructor(private period: PeriodsService) {
    super();
  }

  getOrdersChartData(period: number): OrdersChart {
    let sample = SAMPLE.data.slice(-period);
    return {
      chartLabel: sample.map(item => new Date(item.timestamp).toLocaleDateString()),
      linesData: [
        sample.map(item => 100 * item.conversions / item.clicks),
        sample.map(item => 100 * item.clicks/ item.impressions),
        sample.map(item => 100 * item.cost / item.clicks),
      ]
    }
  }
}