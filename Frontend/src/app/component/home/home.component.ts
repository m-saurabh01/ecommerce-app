import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public productList: any;
  public static category: string;

  constructor(private api : ApiService, private cartService : CartService, private router: Router) { }

  ngOnInit(): void {
    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;
      this.productList.forEach((a:any) =>{
        Object.assign(a,{quantity:1,total:a.price});
      })
    })
  }

  addtoCart(item: any){
    if(this.isLoggedIn()){
      this.cartService.addtoCart(item);
    }else{
      alert("You must be logged in to add items in your cart!!!")
      this.router.navigate(['/login']);
    }
  }

  addToWishlist(item: any){
    if(this.isLoggedIn()){
      this.cartService.addToWishlist(item);
    }else{
      alert("You must be logged in to add items in your cart!!!")
      this.router.navigate(['/login']);
    }
  }

  showCategory(category: string){
    HomeComponent.category = category;
    this.router.navigate(['/product/category']);
  }

  isLoggedIn(){
    return window.localStorage.getItem("login") === "true";
  }

  confirmRole(){
    return window.localStorage.getItem('role')==='USER';
  }

}
