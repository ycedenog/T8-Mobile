import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service'; // Asegúrate de importar correctamente el servicio
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public authService: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")
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

  get errorControl() {
    return this.loginForm.controls;
  }

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Logging in...',
    });

    await loading.present();

    if (this.loginForm.valid) {
      try {
        const user = await this.authService.loginUser(
          this.loginForm.value.email,
          this.loginForm.value.password
        );

        if (user) {
          loading.dismiss();
          this.showToast('Logging Succesfully.');
          this.router.navigate(['/tabs']);
        } else {
          this.showToast('Logging Succesfully.');
          console.log('Provide correct values');
        }
      } catch (error) {
        this.showToast('User o password invalid. Try again');
        console.error('Error during login:', error);
        // Mostrar mensaje de error al usuario si lo deseas
      } finally {
        loading.dismiss();
      }
    } else {
      loading.dismiss();
    }
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      icon: "checkmark-outline",
    });
    toast.present();
  }
}
