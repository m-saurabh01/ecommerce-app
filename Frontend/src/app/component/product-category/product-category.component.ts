import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  public productList: any;
  private sortedAsc: boolean = true;

  constructor(private api : ApiService, private cartService : CartService, private router: Router) { }

  ngOnInit(): void {
    this.getProductsByCategory(HomeComponent.category)
  }

  addtoCart(item: any){
    this.cartService.addtoCart(item);
  }

  getProductsByCategory(category: string){
    this.api.getProductByCategory(HomeComponent.category)
    .subscribe(res=>{
      this.productList = res;
      this.productList.forEach((a:any) =>{
        Object.assign(a,{quantity:1,total:a.price});
      })
    })
  }

  sortProducts(){
    this.productList = this.sortedAsc ? this.productList.sort((a: any, b: any) => (a.price > b.price) ? -1 : 1) : this.productList.sort((a: any, b: any) => (a.price < b.price) ? -1 : 1)
    this.sortedAsc = !this.sortedAsc
  }

}
