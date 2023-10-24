import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {
  private baseUrl: string = environment.SERVER_URL_ECOMMERCE;
  constructor( private http: HttpClient) {

  }

  getMantenimientoCatalogos(): Observable<any> {
    let url = this.baseUrl + '/products';
    return this.http.get(url);
  }

  getMantenimientOrders(): Observable<any> {
    let url = this.baseUrl + '/orders';
    return this.http.get(url);
  }

  addMantenimientoOrder(data: any): Observable<any> {
    let url = this.baseUrl + '/createOrders';
    return this.http.put(url, data);
  }

  deleteMantenimientoOrder(data: any): Observable<any> {
    let url = this.baseUrl + '/deleteOrders/' + data;
    return this.http.delete(url, data);
  }
}
