import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../User/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }
  trackByUserId(index: number, user: User): number {
    return user.id; // or any other unique identifier
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next:(response: string)=>{
        this.loadUsers();
      // Filter out the deleted user from the local users array
      this.users = this.users.filter(user => user.id !== userId);

      // Show a success message
      this.snackBar.open('User deleted successfully!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    },
    error:(error)=>{
      console.error('Error deleting user:', error);
      this.snackBar.open('Failed to delete user.','Close',{
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    }
  });

  }
}
