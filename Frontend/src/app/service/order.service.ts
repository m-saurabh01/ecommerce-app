import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  amount:number=0;


  constructor(private http: HttpClient) { }


  createOrder(order:any): Observable<any> {
        
        return this.http.post('http://localhost:8082/order', {
        customerName: order.name,
        email: order.email,
        phoneNumber: order.phone,
        amount: this.amount
        }, httpOptions);
    }
   
    updateOrder(order:any): Observable<any> {
        return this.http.put('http://localhost:8082/order', {
        razorpayOrderId: order.razorpay_order_id,
        razorpayPaymentId: order.razorpay_payment_id,
        razorpaySignature: order.razorpay_signature
        }, httpOptions);
    }
}
