import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems:any=[]
  ngOnInit(): void {
     
    this.cartService.currentItems.subscribe((data:any)=>{    
    this.cartItems=data;
    })
     this.calaculateCartItems()
    console.log("cartItems", this.cartItems);
    
  }

  constructor(private cartService:CartService){}
cartCount=0;
subTotal=0;
estTotal=0;

  
  deleteItem(prodId:string){
      
   const prevItem:any= this.cartItems.find((item:any)=> item.product._id ==prodId)
    console.log(prevItem);
    
    if(prevItem){
     const filterItems= this.cartItems.filter((item:any)=>{
        return  item.product._id!=prodId
      })
         this.cartItems=filterItems
         this.cartService.updateItems(filterItems);
    }
    this.calaculateCartItems()
  }

  calaculateCartItems(){

    this.cartCount= this.cartItems.length;
        this.subTotal= this.cartItems.reduce((acc:any,curr:any)=>{
              return acc+curr.qty
        },0)
        this.estTotal= this.cartItems.reduce((acc:any,curr:any)=>{
              return acc+(curr.product.price *curr.qty)
        },0)
      }

    decreaseQty(prodId:string){
      const previousCartItem=this.cartItems.find((item:any)=> item.product._id ==prodId)
      let qty=previousCartItem.qty

      qty=qty-1
      if(qty==0){
        this.deleteItem(previousCartItem.product._id)
        return 
      }
      

      if(previousCartItem){
         this.cartItems= this.cartItems.map((item:any)=>{
          if(item.product._id ==previousCartItem.product._id){
            item.qty=qty
          }
          return item;
        })
      }
      this.cartService.updateItems(this.cartItems);
      this.calaculateCartItems()
    } 

    increaseQty(prodId:string){
      const previousCartItem=this.cartItems.find((item:any)=> item.product._id ==prodId)
      let qty=previousCartItem.qty

      if(qty==previousCartItem.stock){
        return 
      }
      qty=qty+1

      if(previousCartItem){
         this.cartItems= this.cartItems.map((item:any)=>{
          if(item.product._id ==previousCartItem.product._id){
            item.qty=qty
          }
          return item;
        })
      }
      this.cartService.updateItems(this.cartItems);
      this.calaculateCartItems()
    } 
}
