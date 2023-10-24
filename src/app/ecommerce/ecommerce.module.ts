import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcomemrceRoutes } from './ecommerce-route.component';
import { EcommerceComponentsComponent } from './ecommerce-components/ecommerce-components.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from '@coreui/angular';
import { NgbCarousel, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { EcommerceCartComponent } from './ecommerce-cart/ecommerce-cart.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { EcommerceCompraComponent } from './ecommerce-compra/ecommerce-compra.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    EcommerceComponentsComponent,
    EcommerceCartComponent,
    EcommerceCompraComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    EcomemrceRoutes,
    MatSnackBarModule,
    NgbCarouselModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
  ]
})
export class EcommerceModule { }
