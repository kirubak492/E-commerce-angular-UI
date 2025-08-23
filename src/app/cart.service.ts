import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  itemSource=new BehaviorSubject([]);
  currentItems=this.itemSource.asObservable();
  cartItems:any=[];

  addItem(newcartItems:any){

    const previousCartItem=this.cartItems.find((ele:any)=> ele.product._id == newcartItems.product._id)
    console.log(previousCartItem);
    console.log(this.cartItems);
    
    if(previousCartItem){
        //update
       this.cartItems= this.cartItems.map((item:any)=>{
          if(item.product._id ==previousCartItem.product._id){
            item.qty=item.qty+1
          }
          return item;
        })
    }
    else{
    this.cartItems.push(newcartItems)
    }
   this.itemSource.next(this.cartItems)   
  }

  updateItems(items:[]){
    this.cartItems=items;
    this.itemSource.next(this.cartItems);
  }

}
