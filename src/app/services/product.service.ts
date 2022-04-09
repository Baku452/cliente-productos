import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/Product';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = environment.API_URL;
  BASE_URL: string = this.API_URL;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}/products`);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.BASE_URL}/products/${id}`);
  }

  createProducts(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.BASE_URL}/products/create`, product);
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.BASE_URL}/products/delete/${id}`);
  }
  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.BASE_URL}/products/update/${id}`,
      product
    );
  }
}
