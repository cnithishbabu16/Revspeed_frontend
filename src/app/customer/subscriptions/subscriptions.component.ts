// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { loadStripe } from '@stripe/stripe-js';
// import { ActivatedRoute, Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { PaymentService } from '../../services/payment.service';
// import { SubscriptionService } from '../../services/subscription.service';
// import { PlanService } from '../../services/plan.service';

// @Component({
//   selector: 'app-subscriptions',
//   templateUrl: './subscriptions.component.html',
//   styleUrls: ['./subscriptions.component.css']
// })
// export class SubscriptionsComponent implements OnInit {
//   paymentForm: FormGroup;
//   plan: any;
//   stripe:any;

//   constructor(
//     private fb: FormBuilder,
//     private paymentService: PaymentService,
//     private subscriptionService: SubscriptionService,
//     private planService : PlanService,
//     private route: ActivatedRoute,
//     private router: Router,
//     private snackBar: MatSnackBar
//   ) {
//     this.paymentForm = this.fb.group({
//       cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
//       expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])/[0-9]{2}$')]],
//       cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
//     });
//   }

//   ngOnInit(): void {
//     this.setupStripe();
//     const planId = this.route.snapshot.paramMap.get('id'); // Get planId from route
//     if (planId) {
//       this.getPlanById(planId); // Fetch the plan details using the planId
//     }
//   }
//   async setupStripe() {
//     this.stripe = await loadStripe('your_stripe_public_key'); // Replace with your Stripe public key
//   }

//   // Method to fetch plan details
//   getPlanById(planId: string): void {
//     this.planService.getPlanById(planId).subscribe(
//       (plan) => {
//         this.plan = plan;  // Assign the fetched plan details
//       },
//       (error) => {
//         this.snackBar.open('Failed to fetch plan details', 'Close', { duration: 3000 });
//         console.error('Error fetching plan details:', error);
//       }
//     );
//   }

//  async proceedToPayment(): Promise<void> {
//     if (this.paymentForm.valid) {
//       const cardDetails = this.paymentForm.value;
//       const { token, error } = await this.stripe.createToken({
//         type: 'card',
//         card: {
//           number: cardDetails.cardNumber,
//           exp_month: parseInt(cardDetails.expiryDate.split('/')[0], 10),
//           exp_year: parseInt(cardDetails.expiryDate.split('/')[1], 10),
//           cvc: cardDetails.cvc
//         }
//       });
  
//       if (error) {
//         this.snackBar.open(`Payment Error: ${error.message}`, 'Close', { duration: 3000 });
//         return;
//       }
  
//       const paymentData = {
//         ...this.paymentForm.value,
//         token: token.id // Send the token ID to your backend
//       };
//       //const paymentData = this.paymentForm.value;
//       // Process payment via PaymentService
//       this.paymentService.processPayment(paymentData, this.plan).subscribe(
//         (response) => {
//           if (response.success) {
//             // Subscribe the user to the plan
//             this.subscriptionService.subscribeToPlan(this.plan).subscribe(
//               (subResponse) => {
//                 this.snackBar.open('Subscription Successful!', 'Close', { duration: 3000 });
//                 this.router.navigate(['/customer/view-plans']);
//               },
//               (error) => {
//                 this.snackBar.open('Subscription Failed!', 'Close', { duration: 3000 });
//               }
//             );
//           } else {
//             this.snackBar.open('Payment Failed!', 'Close', { duration: 3000 });
//           }
//         },
//         (error) => {
//           this.snackBar.open('Payment Error!', 'Close', { duration: 3000 });
//         }
//       );
    
//     }
//   }
// }


import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentService } from '../../services/payment.service';
import { SubscriptionService } from '../../services/subscription.service';
import { PlanService } from '../../services/plan.service';
import { loadStripe, Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { tokenToString } from 'typescript';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit,AfterViewInit {
  paymentForm!: FormGroup;
  user:any={};
  plan: any={};
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;
  paymentSuccessful: any;
  // cardElement: any;
  // userId: any;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private subscriptionService: SubscriptionService,
    private planService: PlanService,
    private userService:UserService,
    private authService:AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.paymentForm = this.fb.group({
      cardDetails: ['']
    });
    
  }

  async ngOnInit(): Promise<void> {
  
    //this.paymentForm=this.fb.group({cardDetails:''})
    //this.stripe = await loadStripe('your_stripe_public_key'); // Replace with your Stripe public key
    
    const planId = this.route.snapshot.paramMap.get('id'); // Get planId from route
    if (planId) {
      this.getPlanById(planId); // Fetch the plan details using the planId
    }
  }
 

  async ngAfterViewInit(): Promise<void> {
    this.stripe = await loadStripe('pk_test_51PvyLS07yTsI6F7jIE81LCavBtdQ1xLSYWtH4AmJhUBL0snl0b7dvDlZMiMF6CGpnhPFRpczCB0kqYVvEw0EmNgo00gWKJ7pEe'); // Replace with your Stripe public key
    if (this.stripe) {
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');
      const cardElement = document.getElementById('card-element');
      if (cardElement) {
        this.card.mount(cardElement);
        this.card.on('change', this.handleCardChange.bind(this));
      } else{

        console.error('Card element not found');
      }
      
    }
    else{
      console.error('Stripe not loaded');
    }
  }

  private handleCardChange(event: { error?: { message: string } }): void {
    if (event.error) {
      this.snackBar.open(event.error.message, 'Close', { duration: 3000 });
    }
  }


  getPlanById(planId: string): void {
    this.planService.getPlanById(planId).subscribe(
      (plan) => {
        this.plan = plan;  // Assign the fetched plan details
      },
      (error) => {
        this.snackBar.open('Failed to fetch plan details', 'Close', { duration: 3000 });
        console.error('Error fetching plan details:', error);
      }
    );
  }

  async proceedToPayment(): Promise<void> {
    
        if (this.paymentForm&&this.stripe && this.card) {
          //const cardDetails = this.paymentForm.value;
          const { token, error } = await this.stripe.createToken(this.card);
      
          if (error) {
            this.snackBar.open(`Payment Error: ${error.message}`, 'Close', { duration: 3000 });
            console.log(error);
            return;
          }
      
          const paymentData = {
            //...this.paymentForm.value,
            
            token: token.id, 
            amount : this.plan.price,
            currency:'usd',
            description: `Subscription to ${this.plan.name}`
            
          };
          //const paymentData = this.paymentForm.value;
          // Process payment via PaymentService
          this.paymentService.processPayment(paymentData).subscribe(
            (response) => {
              console.log(response);
              this.paymentSuccessful=response.status==='success';
              if (this.paymentSuccessful) {
                console.log("entered subscription process");
                //const startDate = new Date();
                const endDate = this.calculateEndDate( this.plan.duration);
                const subscriptionRequest = {
                  userEmail : this.authService.getUserEmail(),
                  planId: this.plan.id,
                  paymentSuccessful: this.paymentSuccessful,
                  endDate:endDate.toISOString()
                };
                
                console.log('Subscription Request:', subscriptionRequest);
                // Subscribe the user to the plan
                //const user=localStorage.getItem('userId');
                this.subscriptionService.subscribeToPlan(subscriptionRequest).subscribe(
                  //console.log(response);
                  
                  (subResponse) => {
                    console.log('Subscription Response:', subResponse);
                    if (subResponse.status === 'Subscription successful') {
                      alert('Subscription Successful!');
                      this.router.navigate(['/customer/view-plans']);
                    } else {
                      this.snackBar.open('Subscription Failed! frontend', 'Close', { duration: 3000 });
                      
                    }
                  },
                );
              } else {
                this.snackBar.open('Payment Failed!', 'Close', { duration: 3000 });
              }
            },
            (error) => {
              console.log(error);
              this.snackBar.open('Payment Error!', 'Close', { duration: 3000 });
            }
          );
        
        } else {
          this.snackBar.open('Invalid Form Data', 'Close', { duration: 3000 });
        }
      } 
      calculateEndDate(duration: number): Date {
        let endDate = new Date();
        endDate.setDate(endDate.getDate() + duration);
        return endDate;
      }
}
