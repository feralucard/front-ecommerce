import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EcommerceService } from '../service/ecommerce.service';
import { Product } from '../interface/ecommerce';
import swal from'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EcommerceCompraComponent } from '../ecommerce-compra/ecommerce-compra.component';
@Component({
  selector: 'app-ecommerce-cart',
  templateUrl: './ecommerce-cart.component.html',
  styleUrls: ['./ecommerce-cart.component.css']
})
export class EcommerceCartComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  column: string[] = [ 'idOrder','name','price','image', 'delete'];
  dataProduct: any[] = [];
  montototalCompra: any = 0;
  constructor(private ecommerceService: EcommerceService, public dialog: MatDialog) {

    ecommerceService.getMantenimientOrders().subscribe(data => {
      console.log(data);
      ecommerceService.getMantenimientoCatalogos().subscribe( productos => {
        let prodArray: Product[] = productos;
        let array: any[] = data;
        array.forEach(carrito => {

          let produ: any = prodArray.find(data => data.id === carrito['productId']);
          if (produ !== undefined) {
            const produCopy = { ...produ };
            produCopy['idOrder'] =  carrito['id'];
            console.log( carrito['id']);
            produCopy['image'] = 'data:image/png;base64,' + produCopy['image'];
            this.dataProduct.push(produCopy)
            console.log( this.dataProduct);
          }

        });
        this.dataSource.data = this.dataProduct;
      });

    })
  }

  deleteOrden(idOrder: number) {
    //this.dataSource.data = [];

    this.ecommerceService.deleteMantenimientoOrder(idOrder).subscribe(response =>{
      this.ecommerceService.getMantenimientOrders().subscribe(data => {
        console.log(data);
        this.ecommerceService.getMantenimientoCatalogos().subscribe( productos => {
          let prodArray: Product[] = productos;
          let array: any[] = data;
          this.dataProduct = [];
          array.forEach(carrito => {

            let produ: any = prodArray.find(data => data.id === carrito['productId']);
            if (produ !== undefined) {
              const produCopy = { ...produ };
              produCopy['idOrder'] =  carrito['id'];
              console.log( carrito['id']);
              produCopy['image'] = 'data:image/png;base64,' + produCopy['image'];
              this.dataProduct.push(produCopy)
              console.log( this.dataProduct);
            }

          });
          swal.fire('Producto eliminado correctamtne', "", 'success');
          this.dataSource.data = [];
          this.dataSource.data = this.dataProduct;
        });

      })
    });
  }

  ngOnInit() {

  }



  montototal() {
    let montototalCompra = 0;
    this.dataProduct.forEach(data => {
      montototalCompra = montototalCompra + parseInt(data['price']);
    })
    return montototalCompra;
  }

  comprarOrden() {
    const dialogRef = this.dialog.open(EcommerceCompraComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
