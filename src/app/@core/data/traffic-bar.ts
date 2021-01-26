import { Observable } from 'rxjs';

export interface TrafficBar {
  data: number[];
  labels: string[];
  formatter: string;
}

export abstract class TrafficBarData {
  abstract getTrafficBarData(period: number): Observable<TrafficBar>;
}
