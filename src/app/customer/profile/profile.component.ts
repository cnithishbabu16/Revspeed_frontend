
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../User/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: any;
  isModalOpen=false;

  constructor(
    private fb: FormBuilder,
    //private userService: UserService,
    private userService: UserService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      address: [''],
      phoneNo: ['']
    });
  }
  openModal(){
    this.isModalOpen=true;
  }
  closeModal(){
    this.isModalOpen=false;
  }

  ngOnInit(): void {
    const email=localStorage.getItem('userEmail');
    if(email){
      this.userService.getUserProfile(email).subscribe((data)=>{
        this.user=data;
        this.profileForm.patchValue({
          name:this.user.name,
          email:this.user.email,
          address: this.user.address,
          phoneNo:this.user.phoneNo
        })
      })
    }
  }

  // loadUserProfile(): void {
  //   this.userService.getUserProfile(this.user.email).subscribe((data) => {
  //     this.user = data;
  //     this.profileForm.patchValue({
  //       name: this.user.name,
  //       email: this.user.email,
  //       address: this.user.address,
  //       phoneNo: this.user.phoneNo
  //     });
  //   });
  // }

  updateProfile(): void {
    if (this.profileForm.valid) {
      const updatedData = this.profileForm.getRawValue();
      this.userService.updateUserProfile(updatedData,this.user.email).subscribe(
        () => {
          alert('Profile Updated Successfully!');
        },
        () => {
          alert('Profile Update Failed!');
        }
        
      );
      this.closeModal();
    }
  }

  deleteProfile(): void {
    if (confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      this.userService.deleteUserProfile(this.user.email).subscribe(
        () => {
          alert('Profile Deleted Successfully!');
          this.router.navigate(['/register']);
        },
        () => {
          alert('Profile Deletion Failed!');
        }
      );
    }
  }
}
