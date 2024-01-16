import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalOsComponent } from './modal-os.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ModalOsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    ModalOsComponent
  ]
})
export class ModalOsModule { }
