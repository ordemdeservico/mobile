import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewOsPage } from './new-os.page';

const routes: Routes = [
  {
    path: '',
    component: NewOsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewOsPageRoutingModule {}
