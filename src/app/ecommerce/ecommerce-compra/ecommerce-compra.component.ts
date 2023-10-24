import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EcommerceService } from '../service/ecommerce.service';
import swal from'sweetalert2';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-ecommerce-compra',
  templateUrl: './ecommerce-compra.component.html',
  styleUrls: ['./ecommerce-compra.component.css']
})
export class EcommerceCompraComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private ecommerceService: EcommerceService, private readonly router: Router,public dialogRef: MatDialogRef<any>,) {
    this.form = formBuilder.group({
      nombre: new FormControl('', [ Validators.required  ]),
      apellido_paterno: new FormControl('', [ Validators.required  ]),
      apellido_materno: new FormControl('', [ Validators.required  ]),
      email: new FormControl('', [ Validators.required, Validators.email  ]),
      telefono: new FormControl('', [ Validators.required]),
    });
  }

  confirmar() {
    this.dialogRef.close();
    this.ecommerceService.getMantenimientOrders().subscribe(order => {
      let ordenes: any[] = order;
      ordenes.forEach(orden => {
        this.ecommerceService.deleteMantenimientoOrder(orden['id']).subscribe(response => {
          swal.fire('Orden de compra confirmada, gracias por comprar', "", 'success').then(da => {

            this.router.navigateByUrl('/ecommerce');
          });

        });
      });
    })

  }

  ngOnInit() {
  }

  soloNumeros(event: any) {
    const charCode = event.which ? event.which : event.keyCode;

    // Permitir solo números y las teclas de control (como retroceso y flecha)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

}
