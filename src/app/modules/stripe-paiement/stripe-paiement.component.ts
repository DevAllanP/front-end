import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/models/user.model';
import { listProduit } from 'src/app/models/listProduit.model';
import { Produit } from 'src/app/models/Produit.model';
import { PaiementService } from 'src/app/services/paiement.service';
import {ProduitsService} from 'src/app/services/produits.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { StripePaiementModule } from './stripe-paiement.module';
import { StripeService } from 'ngx-stripe';


/*const Stripe = require('stripe');
const stripe = Stripe('sk_test_51Kb3R1ASJH3PI53qo0Des8MLgewbQeQ1ieWwchtLaBPibiswwGD23KGh4uarku5jXWE0GKkETeocvljwz0NpuPKT00K6qaIsTV');*/
@Component({
  selector: 'app-stripe-paiement',
  templateUrl: './stripe-paiement.component.html',
  styleUrls: ['./stripe-paiement.component.css']
})
export class StripePaiementComponent implements OnInit {
  paiement : FormGroup;
  currentUser!: User;
  listeproduits!: listProduit;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private paiementService: PaiementService,
    private service: UtilisateurService,
    private Stripe : StripeService
  ) { 
    this.paiement = this.fb.group({
      nom: ['', Validators.required],
      prix: ['', Validators.required],
      price: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.authService.currentUser.subscribe({
      next: (u) => {
        this.paiementService.getOrder().subscribe()
        console.log(u);
        this.currentUser = u;
      },
    });
    
    
  }

onSubmit(): void {
 this.paiementService.cree
}

      // This is your test publishable API key.
    
        stripe = require('stripe')("pk_test_51Kb3R1ASJH3PI53qIMReKI1VHjOxF14Apm5MH9qIckiKYhGDFoGDx2n59ijkBpvdef9gpDUU8g9vA0FzqVKSIXXD008WQPy3xd");
      // The items the customer wants to buy
       items = [{ id: "xl-tshirt" }];
      
         elements : any ;
      

      
      // Fetches a payment intent and captures the client secret
      async  initialize(elements : any, items : any) {
        const response = await fetch("/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        });
        const { clientSecret } = await response.json();
      
        const appearance = {
          theme: 'night',
        };
        
         elements = this.stripe.elements({
          clientSecret: 'CLIENT_SECRET',
        });
      
        const paymentElement = elements.create("payment");
        paymentElement.mount("#payment-element");
      }
      
      async  handleSubmit(e:any) {
        e.preventDefault();
        this.setLoading(true);
      
        const { error } = await this.stripe.confirmPayment({
        
          confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: "http://localhost:4200/test",
          },
        });
      
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
          this.showMessage(error.message);
        } else {
          this.showMessage("An unexpected error occured.");
        }
      
        this.setLoading(false);
      }
      

      // Fetches the payment intent status after payment submission
      async  checkStatus() {
        const clientSecret = new URLSearchParams(window.location.search).get(
          "payment_intent_client_secret"
        );
      
        if (!clientSecret) {
          return;
        }
      
        const { paymentIntent } = await this.stripe.retrievePaymentIntent(clientSecret);
      
        switch (paymentIntent.status) {
          case "succeeded":
            this.showMessage("Payment succeeded!");
            break;
          case "processing":
            this.showMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            this.showMessage("Your payment was not successful, please try again.");
            break;
          default:
            this.showMessage("Something went wrong.");
            break;
        }
      }
      
      // ------- UI helpers -------
      
      showMessage(messageText:any) {
        let messageContainer = document.querySelector("#payment-message");
      
        messageContainer?.classList.remove("hidden");
        messageContainer = messageText;
      
        setTimeout(function () {
          messageContainer?.classList.add("hidden");
          messageText.textContent = "";
        }, 4000);
      }
      
      // Show a spinner on payment submission
       setLoading(isLoading:any) {
        if (isLoading) {
          // Disable the button and show a spinner
          <HTMLInputElement>document.querySelector("#submit");
          document.querySelector("#spinner")?.classList.remove("hidden");
          document.querySelector("#button-text")?.classList.add("hidden");
        } else {
          document.querySelector("#submit");
          document.querySelector("#spinner")?.classList.add("hidden");
          document.querySelector("#button-text")?.classList.remove("hidden");
        }
      }


    }
function Stripe(arg0: string) {
  throw new Error('Function not implemented.');
}

