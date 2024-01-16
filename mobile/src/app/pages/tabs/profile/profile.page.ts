import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username: string = '';
  password_type: string = 'password';

  constructor(
    private storage: StorageService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  async ngOnInit() {
    this.username =  await this.storage.get('name');
  }

  togglePasswordMode() {
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
  }

  async onChangePassword(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const values = {
      senhaVelha: form.value.oldPassword,
      senhaNova: form.value.newPassword
    }

    const userId = await this.storage.get('userId');
    this.loadingCtrl.create({
      message: 'Atualizando...'
    })
      .then(loadingEl => {
        loadingEl.present();
        this.authService.changePassword(userId, values).subscribe({
          next: async (res) => {
            console.log(res);
            loadingEl.dismiss();
            form.reset();
            await this.toastCtrl.create({
              message: 'Senha alterada com sucesso!',
              duration: 3500,
              position: 'top',
            }).then(toastEl => {
              toastEl.present();
            })

          },
          error: (error) => {
            console.error('Erro: ', error);
          }
        })

      })


  }

}
