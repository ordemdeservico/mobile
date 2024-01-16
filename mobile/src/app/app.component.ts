import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './shared/services/storage.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private router: Router,
    private storage: StorageService,
    private loadingCtrl: LoadingController
  ) { }

  async onLogout() {
    this.loadingCtrl.create({
      message: 'Saindo...'
    })
      .then(async loadingEl => {
        loadingEl.present();
        await this.storage.delete('token');
        await this.storage.delete('userId');
        await this.storage.delete('name');
        await this.storage.delete('role');
        await this.storage.delete('email');
        this.router.navigate(['/auth']);
        loadingEl.dismiss();
      })
  }
}
