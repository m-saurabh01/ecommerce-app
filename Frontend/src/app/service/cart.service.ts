import { Injectable } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any=[]
  public wishList : any=[]
  public productList = new BehaviorSubject<any>([]);
  public productWishList = new BehaviorSubject<any>([]);

  constructor() { }

  getProduct(){
    return this.productList.asObservable();
  }

  getWishlist(){
    return this.productWishList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);

  }

   wishlistToCart(productList : any){
    productList.forEach((product:any)=>{
      this.cartItemList.push(product);
    })
    this.productList.next(this.cartItemList);
  }

  addtoCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList)
    this.getTotalPrice();
    console.log(this.cartItemList)
    
  }

  addToWishlist(product : any){
    this.wishList.push(product);
    this.productWishList.next(this.wishList)
    console.log("wishlsit",this.wishList)
  }

  getTotalPrice() : number{
    let grandTotal:number = 0;
    this.cartItemList.map((a:any) =>{
      grandTotal += Number(a.total*a.quantity);
    })
    return grandTotal;
  }

  removeCartItem(product: any){
    this.cartItemList.map((a:any, name:any)=>{
      if(product.name== a.name){
        this.cartItemList.splice(name,1);
      }
    })

    this.productList.next(this.cartItemList);
  }

  removeWishListItem(product: any){
    this.wishList.map((a:any, name:any)=>{
      if(product.name== a.name){
        this.wishList.splice(name,1);
      }
    })

    this.productWishList.next(this.wishList);
  }

  removeAllWishlist(){
    this.wishList = []
    this.productWishList.next(this.wishList);
  }


  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

}
