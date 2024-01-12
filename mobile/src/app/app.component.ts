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
        this.router.navigate(['/auth']);
        loadingEl.dismiss();
      })
  }
}
