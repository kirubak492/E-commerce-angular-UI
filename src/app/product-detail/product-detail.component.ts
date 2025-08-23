import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [FormsModule,CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{


product:any={}

qty:number=1

constructor(private route:ActivatedRoute, private apiService:ApiService, private cartService:CartService){}
ngOnInit(): void {
    this.route.params.subscribe((data)=>{
      console.log(data);
      
     const id :String= data['id'];
     console.log(id);
     
     this.apiService.getSingleProduct(id).subscribe((data:any)=>{
      this.product=data.product;
     }) 
    })
}


   calculate(rating:String):number{
    // console.log((Number(rating)/5)*100);
    
    return (Number(rating)/5)*100;
  }

  decreaseQty(){
    if(this.qty==1){
      return
    }
    this.qty=this.qty-1
  }

  increaseQty(){
    if(this.qty==this.product.stock){
      return
    }
    this.qty=this.qty+1
  }

  addToCart(){
    const newCartItem={
      product:this.product,
      qty:this.qty
    }

    this.cartService.addItem(newCartItem);
  }
}
