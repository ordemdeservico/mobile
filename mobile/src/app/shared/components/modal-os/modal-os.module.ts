import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalOsComponent } from './modal-os.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PhotoGalleryModule } from '../photo-gallery/photo-gallery.module';



@NgModule({
  declarations: [
    ModalOsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PhotoGalleryModule
  ],
  exports: [
    ModalOsComponent
  ]
})
export class ModalOsModule { }
