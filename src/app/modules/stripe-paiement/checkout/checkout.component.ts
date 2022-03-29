import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

import { StripeService } from 'ngx-stripe';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  constructor(
    private http: HttpClient,
    private stripeService: StripeService
  ) {}


}