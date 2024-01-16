import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private storage: StorageService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    await this.Identify();
  }


  private async Identify() {
    this.authService.identify().subscribe({
      next: (data) => {
        console.log('data: ', data);
        this.storage.set('role', data.cargo);
        this.storage.set('name', data.nome);
        this.storage.set('userId', data.id_usuario);
        this.storage.set('email', data.email);
      },
      error: (err) => {
        console.error('Erro: ', err);
      }
    })
  }
}
