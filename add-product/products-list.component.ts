import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  // Function to remove all products
  removeAllProducts(): void {
    this.productService.deleteAllProducts().subscribe(
      () => {
        // Refresh the product list after deletion
        this.productService.getProducts();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

