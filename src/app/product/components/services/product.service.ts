import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = "http://localhost:8080/burger-meals/service/product/"
  constructor(private hhtp: HttpClient) { }

  getAll(): Observable<any> {
    let direccion = this.url;
    return this.hhtp.get(direccion);
  }

  save(id, object): any {
    if (!id) {
      id = 0;
    }
    let direccion = 'http://localhost:8080/burger-meals/product/save';
    return this.hhtp.post(direccion + '/' + id, object);
  }

  delete(id): any {
    if (!id) {
      id = 0;
    }
    let direccion = 'http://localhost:8080/burger-meals/product/delete';
    return this.hhtp.post(direccion + '/' + id, null);
  }
}
