import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router : Router, private authService : AuthenticationService) { }

  ngOnInit() {
  }

  async logout() {
    try {
      await this.authService.signOut();
      this.router.navigate(['/login']); // Redirige a la página de login
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

}
