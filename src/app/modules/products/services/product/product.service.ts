import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../core/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private endPoint: string = 'bp/products';
  constructor(private httpService: HttpService) { }

  /**
   * Buscar un producto
   * @param id
   * @returns
   */
  findOne(id: number | string): Observable<any> {
    return this.httpService.Get<any>(this.endPoint, id);
  }

  /**
   * Buscar todos los productos
   * @returns
   */
  findAll(): Observable<any[]> {
    return this.httpService.Get<any>(this.endPoint);
  }

  /**
   * Crear un producto
   * @param data
   * @returns
   */
  create(data: any): Observable<any> {
    return this.httpService.Post<any>(this.endPoint, data);
  }

  /**
   * Actualizar un producto
   * @param id
   * @param data
   * @returns
   */
  update(data: any): Observable<any> {
    return this.httpService.Put<any>(this.endPoint, data);
  }

  /**
   * Eliminar un producto
   * @param id
   * @returns
   */
  remove(id: string | number): Observable<any> {
    return this.httpService.Delete<any>(this.endPoint, id);
  }
}
