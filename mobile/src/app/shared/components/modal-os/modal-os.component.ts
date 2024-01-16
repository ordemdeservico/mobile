import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../models/os.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-os',
  templateUrl: './modal-os.component.html',
  styleUrls: ['./modal-os.component.scss'],
})
export class ModalOsComponent  implements OnInit {

  @Input() osData!: OrderService[];
  relatorio: string = '';
  materiais: string = '';

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.log('OS Data: ', this.osData[0].images?.type1);
  }

  onClose() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
