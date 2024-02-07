import { Component, Input, OnInit } from '@angular/core';
import { ConcludeOS, OrderService } from '../../models/os.model';
import { LoadingController, ModalController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { OsService } from '../../services/os.service';

@Component({
  selector: 'app-modal-os',
  templateUrl: './modal-os.component.html',
  styleUrls: ['./modal-os.component.scss'],
  providers: [DatePipe]
})
export class ModalOsComponent  implements OnInit {

  @Input() osData!: OrderService[];
  relatorio: string = '';
  materiais: string = '';
  uploadedImages: any[] = [];
  osId!: number;

  constructor(
    private modalCtrl: ModalController,
    private datePipe: DatePipe,
    private os: OsService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    console.log('OS Data: ', this.osData[0]);
    this.osId = this.osData[0].id;
  }

  onClose() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onImagePick(images: any) {
    for (let image of images) {
      console.log('event: ', image.filepath);
      this.uploadedImages.push(image);
    }
  }

  onConcludeOs() {
    if (!this.relatorio) {
      return;
    }

    const formData = new FormData();
    const processedFiles = new Set<string>();

    if (this.uploadedImages.length > 0) {
      for (let image of this.uploadedImages) {
        if (image.data) {
          if (!processedFiles.has(image.filepath)) {

            processedFiles.add(image.filepath);
            const blob = this.dataURItoBlob(image.data);
            formData.append('file', blob!, image.filepath);
          }
        } else {
          console.error('A propriedade "data" na imagem é undefined ou null:', image);
        }
      }
    }

    const data_final = new Date();

    formData.append('ordem_servico_id', this.osId as any);
    formData.append('relatorio', this.relatorio);
    formData.append('material', this.materiais);
    formData.append('data_final', this.datePipe.transform(data_final, 'yyyy/MM/dd') ?? '');

    console.log('formData: ', formData);

    this.loadingCtrl.create({
      message: 'Concluindo OS...'
    }).then(loadingEl => {
      loadingEl.present();
      this.os.concludeOs(formData as unknown as ConcludeOS).subscribe({
        next: (res) => {
          console.log('conclude_os_res: ', res);
          this.loadingCtrl.dismiss();
          this.modalCtrl.dismiss();
        },
        error: (err) => {
          console.error('Erro: ', err);
        }
      });

    })
  }


  dataURItoBlob(dataURI: string): Blob | null {
    if (!dataURI) {
      console.error('dataURI is undefined or null');
      return null;
    }

    const base64Index = dataURI.indexOf('base64,');
    if (base64Index === -1) {
      console.error('Invalid dataURI format');
      return null;
    }

    const byteString = atob(dataURI.slice(base64Index + 'base64,'.length));
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: 'image/jpeg' });
  }

}
