import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../interfaces/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService) {}

  products: Product[] = [];
  deletedAlert: boolean = false;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        console.log(res);
      },
      error: (e) => console.error(e),
    });
  }

  deleteProduct(product: Product) {
    const idProduct = product._id;

    this.productService.deleteProduct(idProduct!).subscribe({
      next: (res) => {
        this.getProducts();
      },
      error: (e) => console.error(e),
    });
  }
}
