import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  regForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public authService: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          ),
        ],
      ],
    });
  }

  async signUp() {
    const loading = await this.loadingCtrl.create({
      message: 'Signing up...',
    });

    await loading.present();

    if (this.regForm.valid) {
      try {
        const user = await this.authService.registerUser(
          this.regForm.value.email,
          this.regForm.value.password
        );

        if (user) {
          this.router.navigate(['/login']);
        } else {
          this.showToast('Registration failed. Please try again.');
        }
      } catch (error) {
        this.showToast('An error occurred. Please try again later.');
        console.error('Error during signup:', error);
      } finally {
        loading.dismiss();
      }
    } else {
      this.showToast('Please fill in all the required fields.');
      loading.dismiss();
    }
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }
}
