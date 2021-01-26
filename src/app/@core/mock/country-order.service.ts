import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import SAMPLE from '../../../assets/data/sample';
import { CountryOrderData } from '../data/country-order';

@Injectable()
export class CountryOrderService extends CountryOrderData {

  private countriesCategories = [
    'Clicks',
    'Cost',
    'Conversions',
  ];
  private generateRandomData(): number[] {
    let randomCountryIndex = Math.floor(Math.random() * (SAMPLE.data.length - 1));
    return [ 
      SAMPLE.data[randomCountryIndex].clicks,
      SAMPLE.data[randomCountryIndex].cost,
      SAMPLE.data[randomCountryIndex].conversions,
    ];
  }

  getCountriesCategories(): Observable<string[]> {
    return observableOf(this.countriesCategories);
  }

  getCountriesCategoriesData(): Observable<number[]> {
    return observableOf(this.generateRandomData());
  }
}
