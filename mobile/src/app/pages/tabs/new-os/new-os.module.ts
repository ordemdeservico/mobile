import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewOsPageRoutingModule } from './new-os-routing.module';

import { NewOsPage } from './new-os.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewOsPageRoutingModule
  ],
  declarations: [NewOsPage]
})
export class NewOsPageModule {}
