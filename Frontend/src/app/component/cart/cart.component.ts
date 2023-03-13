import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public product : any = [];
  public grandTotal : number=0;
  userId=window.localStorage.getItem("userID");


   
  

  constructor(private cartService: CartService, private http:HttpClient,private router:Router,private ordServ:OrderService) { }

  ngOnInit(): void {
    this.cartService.getProduct()
    .subscribe(res=>{
      this.product=res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }

  emptycart(){
    this.cartService.removeAllCart();
  }

  increaseQuantity(item: any){
    item.quantity++;
    this.cartService.getProduct()
    .subscribe(res=>{
      this.grandTotal = this.cartService.getTotalPrice();
    })
   
  }

  decreaseQuantity(item: any){
    if(item.quantity != 0)
      item.quantity--;
      this.cartService.getProduct()
    .subscribe(res=>{
      this.grandTotal = this.cartService.getTotalPrice();
    })
    
  }

  async payment(){
   
    console.log(this.userId);
    console.log(this.grandTotal);
    this.ordServ.amount=this.grandTotal;
     const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
      this.http.post<any>('http://localhost:8083/ReportController/add-report', {customerID: this.userId,orderValue: this.grandTotal}, {headers}).subscribe();
    this.emptycart();
    
    this.router.navigate(['/order']);
  }

}


