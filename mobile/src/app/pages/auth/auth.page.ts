import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  password_type: string = 'password';

  constructor(
    private authService: AuthService,
    private storage: StorageService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  togglePasswordMode() {
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    };

    const values = {
      email: form.value.email,
      senha: form.value.password
    };

    this.loadingCtrl.create({
      message: 'Autenticando...'
    })
      .then(loadingEl => {
        loadingEl.present();
        this.authService.login(values).subscribe({
          next: async (res) => {
            if (res.cargo !== 'Tecnico') {
              await this.alertCtrl.create({
                header: 'Aplicativo restrito para técnicos!',
                message: 'Para acessar o sistema entre pela web.',
                buttons: ['Ok']
              }).then(alertlEl => {
                alertlEl.present();
                loadingEl.dismiss();
                return;
              })
            } else {
              console.log('Usuário autenticado: ', res);
              this.authService.setIsAuthenticated(true);
              await this.storage.set('token', res.token);
              loadingEl.dismiss();
              form.reset();
              this.router.navigate(['/tabs/dashboard']);
            }
          },
          error: async (err) => {

            console.error('Erro: ', err);
            await this.alertCtrl.create({
              header: 'Ocorreu um erro ao tentar fazer login!',
              message: err.error.message,
              buttons: ['Ok']
            }).then(alertEl => {
              loadingEl.dismiss();
              alertEl.present();
            })
          }
        })
      })

  }


}
