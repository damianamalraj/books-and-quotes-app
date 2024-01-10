import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = new User();

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.user).subscribe(
      (data) => {
        sessionStorage.setItem('authToken', data);
        console.log(data);
        if (data) {
          this.router.navigate(['/books']);
        }
      },
      (error) => {
        console.log(`Error: ${error}`);
      }
    );
  }
}
