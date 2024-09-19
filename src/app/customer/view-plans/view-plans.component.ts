import { Component } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { PlanDetailsDialogComponent } from '../plan-details-dialog/plan-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-plans',
  templateUrl: './view-plans.component.html',
  styleUrl: './view-plans.component.css'
})
export class ViewPlansComponent {
  plans: any[] = [];
  filteredPlans: any[] = [];
  selectedDuration: string = 'all';
  selectedSpeed: string = 'all';
  selectedPlan: any = null;

  constructor(private planService: PlanService,private router: Router ,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPlans();
  }

  getPlans(): void {
    this.planService.getPlans().subscribe((data: any) => {
      this.plans = data;
      this.filteredPlans=data;
    });
  }

  // selectPlan(plan: any): void {
  //   this.selectedPlan = plan;
  // }

  applyFilters(): void {
    this.filteredPlans = this.plans.filter((plan) => {
      return (this.selectedDuration === 'all' || this.filterByDuration(plan)) &&
             (this.selectedSpeed === 'all' || this.filterBySpeed(plan));
    });
  }

  filterByDuration(plan : any): boolean {
    if (this.selectedDuration === 'monthly' && plan.duration <= 30) {
      return true;
    }
    if (this.selectedDuration === 'quarterly' && plan.duration > 30 && plan.duration <= 90) {
      return true;
    }
    if (this.selectedDuration === 'yearly' && plan.duration > 90 && plan.duration <= 365) {
      return true;
    }
    return false;
  }

  filterBySpeed(plan: any): boolean {
    if (this.selectedSpeed === 'slow' && plan.speed <= 50) {
      return true;
    }
    if (this.selectedSpeed === 'medium' && plan.speed > 50 && plan.speed <= 150) {
      return true;
    }
    if (this.selectedSpeed === 'fast' && plan.speed > 150) {
      return true;
    }
    return false;
  }

  openPlanDetails(planId: number): void {
    const dialogRef = this.dialog.open(PlanDetailsDialogComponent, {
      
      width: '400px',

      position: { top: '10%', left: '25%' },
      data: { planId: planId },
      
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.subscribe) {
        // Handle subscription logic here
      }
    });
  }
  selectPlan(plan: any): void {
    //this.router.navigate [("/customer/plan-details")];
    this.dialog.open(PlanDetailsDialogComponent);
  }
  getPlatformNames(plan: any): string {
    return plan.ottPlatforms.map((platform: any) => platform.name).join(', ');
  }

}
