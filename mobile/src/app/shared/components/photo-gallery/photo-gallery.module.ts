import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoGalleryComponent } from './photo-gallery.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    PhotoGalleryComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PhotoGalleryComponent
  ]
})
export class PhotoGalleryModule { }
