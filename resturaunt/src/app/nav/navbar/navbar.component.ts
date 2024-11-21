import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private authService:AuthService,
    private router: Router
   ){

  }

  logout(): void {
    this.authService.logout(); // Call the logout method from AuthService
    this.router.navigate(['/login']);
  }

  toggleSidenav() {
    const sidenav = document.getElementById('sidenav') as HTMLElement; // Cast the element to HTMLElement
    const mainContent = document.querySelector('.main-content') as HTMLElement; // Cast main content to HTMLElement

    if (sidenav.style.width === '250px' || sidenav.style.width === '') {
      sidenav.style.width = '0';
      mainContent.style.marginLeft = '0';
    } else {
      sidenav.style.width = '250px';
      mainContent.style.marginLeft = '250px';
    }
  }
}
