import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../interfaces/Product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    name: '',
    description: '',
    price: 0,
  };
  edit: Boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params) {
      this.productService.getProduct(params['id']).subscribe({
        next: (res) => {
          console.log(res);
          this.product = res;
          this.edit = true;
        },
      });
    }
  }

  submitProduct() {
    this.productService.createProducts(this.product).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/']);
      },
      error: (e) => console.error(e),
    });
  }

  updateProduct() {
    delete this.product.createdAt;
    this.productService
      .updateProduct(this.product._id!, this.product)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/product']);
        },
        error: (e) => console.error(e),
      });
  }
}
