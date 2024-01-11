import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = new User();

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    console.log(this.user);
    this.authService.register(this.user).subscribe(
      (data) => {
        console.log(data);
        if (data) {
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.log(error.error);
      }
    );
  }
}
