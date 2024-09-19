import { Component } from '@angular/core';
import { OttPlatform, Plan } from '../../services/plans';
import { PlanService } from '../../services/plan.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { OttplatformService } from '../../services/ottplatform.service';

@Component({
  selector: 'app-admin-plans',
  templateUrl: './admin-plans.component.html',
  styleUrl: './admin-plans.component.css'
})
export class AdminPlansComponent {
  planForm: FormGroup;
  plans: Plan[] = [];
  ottPlatforms: OttPlatform[] = [];
  isModalOpen = false;
  currentPlanId: number | null = null; // Track the current plan ID being edited

  constructor(
    private fb: FormBuilder,
    private planService: PlanService,
    private ottPlatformService: OttplatformService
  ) {
    this.planForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      duration: [''],
      speed: [''],
      selectedOttPlatforms: this.fb.array([])  // Form array for OTT platform checkboxes
    });
  }

  ngOnInit(): void {
    console.log('ng on it');
    this.loadPlans();
    this.loadOttPlatforms();  
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.planForm.reset();
    this.currentPlanId = null; 
  }

  loadPlans(): void {
    this.planService.getPlans().subscribe((data: Plan[]) => {
      this.plans = data;
    });
  }

  loadOttPlatforms(): void {
    this.ottPlatformService.getAllOttPlatforms().subscribe((data: OttPlatform[]) => {
      this.ottPlatforms = data;
      this.setOttPlatforms();
    });
  }

  setOttPlatforms(): void {
    const control = <FormArray>this.planForm.get('selectedOttPlatforms');
    this.ottPlatforms.forEach(() => {
      control.push(this.fb.control(false)); // Initialize each checkbox control
    });
  }

  onSubmit(): void {
    const formValue = this.planForm.value;
    const selectedPlatforms = this.ottPlatforms.filter((platform, index) =>
      formValue.selectedOttPlatforms[index]
    ).map(platform => platform.id);

    const newPlan: Plan = {
      ...formValue,
      ottPlatforms: selectedPlatforms
    };

    if (this.currentPlanId) {
      // Update existing plan
      const selectedPlatforms = this.ottPlatforms.filter((platform, index) =>
        formValue.selectedOttPlatforms[index]
      ).map(platform => platform);
  
      const newPlan: Plan = {
        ...formValue,
        ottPlatforms: selectedPlatforms
      };
      console.log('.....' + JSON.stringify(newPlan));
      newPlan.id = this.currentPlanId;
      this.planService.updatePlan(newPlan).subscribe(() => this.loadPlans());
    } else {
      const selectedPlatforms = this.ottPlatforms.filter((platform, index) =>
        formValue.selectedOttPlatforms[index]
      ).map(platform => platform.id);
  
      const newPlan: Plan = {
        ...formValue,
        ottPlatforms: selectedPlatforms
      };
      console.log('.....' + JSON.stringify(newPlan));
      // Create a new plan
      this.planService.createPlan(newPlan).subscribe(() => this.loadPlans());
    }

    this.planForm.reset();
    this.closeModal();
  }

  editPlan(id: number): void {
    const plan = this.plans.find(p => p.id === id);
    if (plan) {
      const selectedPlatforms = this.ottPlatforms.map(platform =>
       // plan.ottPlatforms.includes(platform)
       platform.id
       
      );

      this.planForm.patchValue({
        ...plan,
        selectedOttPlatforms: selectedPlatforms
      });

      this.currentPlanId = plan.id; // Set the current plan ID for updating
    }

    this.openModal();
  }

  deletePlan(id: number): void {
    this.planService.deletePlan(id).subscribe(() => this.loadPlans());
  }
}