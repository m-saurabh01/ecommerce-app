import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public product : any = [];
  public grandTotal : number=0;
  userId=window.localStorage.getItem("userID");
  

  constructor(private cartService: CartService, private http:HttpClient) { }

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
    window.alert("Payment Successful");
    console.log(this.userId);
    console.log(this.grandTotal);
     const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
      this.http.post<any>('http://localhost:8083/ReportController/add-report', {customerID: this.userId,orderValue: this.grandTotal}, {headers}).subscribe();
    this.emptycart();
  }

}


