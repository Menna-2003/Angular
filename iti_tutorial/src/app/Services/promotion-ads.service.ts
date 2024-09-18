import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromotionAdsService {
  private adsList: string[];

  constructor() {
    this.adsList = [
      'Big discount',
      'sale up to 50%',
      'watch our white friday',
      // '',   //~ this will cause error so it won't complete
      'Special white friday offers up to 70%',
    ];
  }

  getScheduledAds(intervalInSeconds: number): Observable<string> {
    return new Observable<string>((observer) => {
      let counter = 0;
      let adsTimeer = setInterval(() => {
        if (counter == this.adsList.length) {
          observer.complete();
        }
        if (this.adsList[counter] == '') {
          observer.error('Error: Empty ads');
        }
        observer.next(this.adsList[counter]);
        counter++;
      }, intervalInSeconds * 1000);

      return {
        unsubscribe() {
          clearInterval(adsTimeer);
        },
      };
    });
  }
}
