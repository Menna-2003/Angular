import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestParameterService implements CanActivate {
  constructor() {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // here check the params
    const id = next.paramMap.get('id');
    // Convert id to a number, handling potential null values
    const numericId = id ? parseInt(id) : 0;

    if (!isNaN(numericId)) {
      return true;
    } else {
      // route it or do something you want
      return false;
    }
  }
}
