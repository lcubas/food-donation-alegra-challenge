import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class MarketApiService {
  private readonly MARKET_API_URL =
    'https://recruitment.alegra.com/api/farmers-market/buy';

  getIngredient(ingredient: string): Observable<number> {
    return from(fetch(`${this.MARKET_API_URL}?ingredientt=${ingredient}`)).pipe(
      switchMap((response) => from(response.json())),
      map((data) => parseInt(data.quantitySold) || 0),
    );
  }
}
