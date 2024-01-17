import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalOsComponent } from 'src/app/shared/components/modal-os/modal-os.component';
import { OrderService } from 'src/app/shared/models/os.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OsService } from 'src/app/shared/services/os.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  orderServices: OrderService[] = [];
  isLoading: boolean = false;

  constructor(
    private storage: StorageService,
    private authService: AuthService,
    private os: OsService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    this.isLoading = true;
  }

  async ionViewWillEnter(){
    await this.Identify();
    await this.fetchOrderServices();
  }

  async fetchOrderServices() {
    const userId = await this.storage.get('userId');

    this.os.getOrderServices(userId).subscribe({
      next: (data) => {
        this.orderServices = data.result;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro: ', err);
      },
    });
  }

  onShowOs(id: number) {
    this.modalCtrl
      .create({
        component: ModalOsComponent,
        componentProps: {
          osData: this.orderServices.filter((os) => os.id === id)
        },
      })
      .then((modalEl) => {
        modalEl.onDidDismiss().then((modalData) => {
          console.log('Modal Data: ', modalData);
        });
        modalEl.present();
      });
  }

  private async Identify() {
    this.authService.identify().subscribe({
      next: (data) => {
        this.storage.set('role', data.cargo);
        this.storage.set('name', data.nome);
        this.storage.set('userId', data.id_usuario);
        this.storage.set('email', data.email);
      },
      error: (err) => {
        console.error('Erro: ', err);
      },
    });
  }
}
