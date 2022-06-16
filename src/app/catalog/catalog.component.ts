import { Component, OnInit } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../product/components/services/product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  plusCircle = faPlusCircle;
  productList: Array<any>;
  constructor(
    private productService: ProductService
  ) {
    this.productService.getAll().subscribe(result => {
      console.log(result);

      this.productList = result;
    })
  }

  ngOnInit(): void {
  }
  addBuy(product){

  }
}
