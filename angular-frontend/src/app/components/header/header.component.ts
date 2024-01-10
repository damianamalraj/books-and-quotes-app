import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    console.log('isLoggedIn' + this.isLoggedIn);
  }

  logout(): void {
    this.authService.signout();
    this.isLoggedIn = false;
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
