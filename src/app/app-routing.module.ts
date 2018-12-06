import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'images',
    loadChildren: './try-image/try-image.module#TryImageModule'

  },
  // {
  //   path: 'videos',
  //   loadChildren: './customers/customers.module#CustomersModule'
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
