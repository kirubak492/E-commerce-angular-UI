import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [FormsModule,CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{


product:any={}

constructor(private route:ActivatedRoute, private apiService:ApiService){}
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
}
