// // import { Component } from '@angular/core';
// // import { User } from '../user';
// // import { AuthService } from '../auth.service';


// // @Component({
// //   selector: 'app-register',
// //   templateUrl: './register.component.html',
// //   styleUrl: './register.component.css'
// // })
// // export class RegisterComponent {
// //   user: User = new User();
// //     name:string='';
// //     email:string='';
// //     password:string='';
// //     phoneNo:bigint | undefined;
// //     address:string='';


// //   constructor(private authService: AuthService) { }

// //   register(): void {
// //     this.authService.register(this.user).subscribe(
// //       (response) => {
// //         console.log('User registered successfully', response);
// //       },
// //       (error) => {
// //         console.error('Registration failed', error);
// //       }
// //     );
// //   }

// // }

// import { Component } from '@angular/core';

// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
//   registerForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router,
//     private snackBar: MatSnackBar
//   ) {
//     this.registerForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   onSubmit() {
//     if (this.registerForm.valid) {
//       this.authService.register(this.registerForm.value).subscribe(
//         () => {
//           this.snackBar.open('Registration successful', 'Close', { duration: 3000 });
//           this.router.navigate(['/login']);
//         },
//         (error: any) => {
//           this.snackBar.open('Registration failed', 'Close', { duration: 3000 });
//         }
//       );
//     }
//   }
// }




// import { Component } from '@angular/core';
// import { AuthService } from '../../services/auth.service';


// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
//   user: any = {
//     email: '',
//     name: '',
//     password: '',
//     phoneNo: '',
//     address:''
//   };


//   constructor(private authService: AuthService) {}

//   register() {
//     this.authService.register(this.user).subscribe({
//       next: (response: any) => {
//         console.log('User registered successfully', response);
//       },
//       error: (err: any) => {
//         console.error('Registration failed', err);
//       }
//     });
//   }
// }



import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNo: ['', [Validators.required]],
      address: ['']
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response: any) => {
          this.snackBar.open('Registration successful', 'Close', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          this.snackBar.open('Registration failed', 'Close', { duration: 3000 });
          console.error('Registration failed', err);
        }
      });
    }
   
  }
  
}
