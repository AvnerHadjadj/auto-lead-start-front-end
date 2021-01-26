import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { OrdersChart, OrdersChartData } from '../data/orders-chart';
import { OrderProfitChartSummary, OrdersProfitChartData } from '../data/orders-profit-chart';
import { ProfitChart, ProfitChartData } from '../data/profit-chart';
import SAMPLE from '../../../assets/data/sample';

@Injectable()
export class OrdersProfitChartService extends OrdersProfitChartData {
  private sample = SAMPLE.data;
  private summary = [
    {
      title: 'Total Impressions',
      value: this.sample.reduce((a,b) => a + b.impressions, 0),
    },
    {
      title: 'Last Month',
      value: this.sample.slice(-30).reduce((a,b) => a + b.impressions, 0),
    },
    {
      title: 'Last Week',
      value: this.sample.slice(-7).reduce((a,b) => a + b.impressions, 0),
    },
    {
      title: 'Today',
      value: this.sample[this.sample.length - 1].impressions,
    },
  ];

  constructor(private ordersChartService: OrdersChartData,
              private profitChartService: ProfitChartData) {
    super();
  }

  getOrderProfitChartSummary(): Observable<OrderProfitChartSummary[]> {
    return observableOf(this.summary);
  }

  getOrdersChartData(period: number): Observable<OrdersChart> {
    return observableOf(this.ordersChartService.getOrdersChartData(period));
  }

  getProfitChartData(period: number): Observable<ProfitChart> {
    return observableOf(this.profitChartService.getProfitChartData(period));
  }
}
