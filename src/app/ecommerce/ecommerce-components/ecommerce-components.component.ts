import { Component, OnInit } from '@angular/core';
import { EcommerceService } from '../service/ecommerce.service';
import { Product } from '../interface/ecommerce';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import swal from'sweetalert2';
@Component({
  selector: 'app-ecommerce-components',
  templateUrl: './ecommerce-components.component.html',
  styleUrls: ['./ecommerce-components.component.scss']
})
export class EcommerceComponentsComponent {
  products: Product[] = [];
  user: number = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  images = ["../../../assets/images/Portada_Principiantes_01.jpg", "../../../assets/images/Leonardo_Diffusion_XL_Dame_imagen_para_promocionar_mi_tienda_d_2.jpg.png", "../../../assets/images/436.png"];
  constructor(private ecommerceService: EcommerceService, private authService: AuthService, private _snackBar: MatSnackBar) {
    ecommerceService.getMantenimientoCatalogos().subscribe(data => {
      this.products = data;
      this.products.forEach(data => {
        data.image = 'data:image/png;base64,' + data.image
      });
    });

    this.authService.getToken().subscribe( data => {
      this.user = this.decodeJwt(data)["userId"]
    })

  }



  addCart(product:Product) {
    this.ecommerceService.addMantenimientoOrder({"productId": product.id, "userId": this.user}).subscribe(data => {

      swal.fire('Producto agregado al carrito correctamtne', "", 'success');
    });
  }

  decodeJwt(token: any) {
    const base64Url = token.split('.')[1]; // Obtén la parte codificada en base64 del token
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Reemplaza caracteres especiales
    const jsonPayload = decodeURIComponent(atob(base64)); // Decodifica en base64 y luego en JSON

    return JSON.parse(jsonPayload); // Analiza el JSON para obtener los datos
  }

}
