import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PhotoService } from '../../services/photo.service';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss'],
})
export class PhotoGalleryComponent  implements OnInit {

  @Output() imagePick = new EventEmitter<string | File>();

  constructor(
    public photoService: PhotoService
  ) { }

  async ngOnInit() {

  }

  async addPhotoToGallery() {
    await this.photoService.addNewToGallery();
    this.imagePick.emit(this.photoService.photos as any);
  }

}
