import { Component, EventEmitter, Output } from '@angular/core';
import { PhotoService } from '../../services/photo.service';


@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss'],
})
export class PhotoGalleryComponent {

  @Output() imagePick = new EventEmitter<string | File>();

  constructor(
    public photoService: PhotoService
  ) { }

  async addPhotoToGallery() {
    await this.photoService.addNewToGallery();
    this.imagePick.emit(this.photoService.photos as any);
  }

}
