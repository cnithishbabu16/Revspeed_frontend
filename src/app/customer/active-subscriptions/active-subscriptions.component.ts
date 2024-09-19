import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { AuthService } from '../../services/auth.service';
//import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-active-subscriptions',
  templateUrl: './active-subscriptions.component.html',
  styleUrls: ['./active-subscriptions.component.css']
})
export class ActiveSubscriptionsComponent implements OnInit {
  subscriptions: any[] = [];
  userId!:number;
  userEmail!: string;

  constructor(private subscriptionService: SubscriptionService,private authService:AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    console.log(this.userId);
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    this.subscriptionService.getUserSubscriptions(this.userId).subscribe((data) => {
      this.subscriptions = data;
    });
  }

  cancelSubscription(subId: number): void {
    this.subscriptionService.cancelSubscription(subId).subscribe(
      () => {
        //alert('Subscription Cancelled!');
        this.loadSubscriptions();
      },
      (error) => {
        //alert('Cancellation Failed!');
      }
    );
  }
}
