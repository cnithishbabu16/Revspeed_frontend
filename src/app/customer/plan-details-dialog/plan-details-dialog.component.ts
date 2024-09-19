// // src/app/customer/plan-details-dialog/plan-details-dialog.component.ts
// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// @Component({
//   selector: 'app-plan-details-dialog',
//   templateUrl: './plan-details-dialog.component.html',
//   styleUrls: ['./plan-details-dialog.component.css']
// })
// export class PlanDetailsDialogComponent {
//   constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
// }

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { PlanService } from '../services/plan.service';
//import { SubscriptionService } from '../services/subscription.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanService } from '../../services/plan.service';
import { SubscriptionService } from '../../services/subscription.service';
import { Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-plan-details-dialog',
  templateUrl: './plan-details-dialog.component.html',
  styleUrls: ['./plan-details-dialog.component.css']
})
export class PlanDetailsDialogComponent implements OnInit {
  planDetails: any;
  plans: any[] = [];
  paymentDetails:any;
  

  constructor(
    private dialogRef: MatDialogRef<PlanDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private planService: PlanService,
    private paymentService:  PaymentService,
    private router: Router,
    private subscriptionService: SubscriptionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPlanDetails();
  }

  loadPlanDetails(): void {
    this.planService.getPlans().subscribe((plans: any[]) => {
      this.planDetails = plans.find(plan => plan.id === this.data.planId);
    });
  }
  getPlatformNames(plan: any): string {
    return plan.ottPlatforms.map((platform: any) => platform.name).join(', ');
  }


  // subscribe(): void {
  //   this.paymentService.processPayment(this.paymentDetails,this.planDetails.price).subscribe(paymentResult => {
  //     if (paymentResult.success) {
  //       // Create subscription
  //       this.subscriptionService.subscribeToPlan({
  //         userId: 1, // Replace with actual user ID
  //         planId: this.planDetails.id,
  //         startDate: new Date(),
  //         endDate: this.calculateEndDate(this.planDetails.duration)
  //       }).subscribe(subscriptionResult => {
  //         if (subscriptionResult.success) {
  //           this.snackBar.open('Subscription successful!', 'Close', { duration: 2000 });
  //           this.dialogRef.close({ subscribe: true, plan: this.planDetails });
  //         } else {
  //           this.snackBar.open('Subscription failed. Please try again.', 'Close', { duration: 2000 });
  //         }
  //       });
  //     } else {
  //       this.snackBar.open('Payment failed. Please try again.', 'Close', { duration: 2000 });
  //     }
  //   });
  // }

  subscribe(): void {
    // Close the dialog and pass the subscription event back
    this.dialogRef.close({ subscribe: true, plan: this.planDetails });

    // Navigate to the subscription or payment page with the selected plan
    this.router.navigate(['/customer/subscriptions', this.planDetails.id ]);
  }

  

  closeDialog(): void {
    this.dialogRef.close();
  }
  calculateEndDate(duration: number): Date {
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + duration);
    return endDate;
  }
}
