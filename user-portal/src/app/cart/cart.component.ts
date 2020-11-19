import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: any;
  total: number;
  quant: number;

  constructor() { }

  ngOnInit(): void {
    this.loadCart();
  //this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  deleteProduct(index): void{

    this.total -= this.cart[index].price;
    this.cart.splice(index,1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.ngOnInit();

   }
  
   loadCart():void{
     this.total = 0;
     let price:number= 0;
     this.cart = JSON.parse(localStorage.getItem('cart'));
     for(var x of this.cart){
       price = x.price*x.quantity;
       this.total += x.price;
     }
     //console.log(this.cart);
   }
   updateQuantity(event, id): void{
    console.log(event.target.value);
     this.cart[id].quantity = event.target.value;
     localStorage.setItem('cart', JSON.stringify(this.cart));
     console.log("quantity has been changed")
     this.ngOnInit();
   }
}
