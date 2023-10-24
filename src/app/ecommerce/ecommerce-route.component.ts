import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EcommerceComponentsComponent } from './ecommerce-components/ecommerce-components.component';
import { EcommerceCartComponent } from './ecommerce-cart/ecommerce-cart.component';

const routes: Routes = [
  {
    path: '',
    component: EcommerceComponentsComponent,

  },
  {
    path: 'carrito',
    component: EcommerceCartComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcomemrceRoutes{}
