import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isDropdownVisible = false;
  
  constructor(private authService: AuthService){}
  logout(){
    this.authService.logout();
  }
  showDropdown() {
    // Cancel any pending timeout to hide the dropdown
    // if (this.dropdownTimeout) {
    //   clearTimeout(this.dropdownTimeout);
    // }
    
    this.isDropdownVisible = true;
    console.log(this.isDropdownVisible);
  }

  hideDropdown() {
    // Set a delay before hiding the dropdown
    // this.dropdownTimeout = setTimeout(() => {
    //   this.isDropdownVisible = false;
    // }, 30000); // 300ms delay
    setTimeout(() => {
      this.isDropdownVisible = false;
    }, 1000);
    console.log("mouseleave")
  }

}
