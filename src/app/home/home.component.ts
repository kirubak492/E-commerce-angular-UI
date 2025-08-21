import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  products:any=[];
  searchText:string='';
  productsTmp:any=[];

  ngOnInit(): void {
    this.apiService.getProducts().subscribe((data)=>{
      this.products=data.products;
      this.productsTmp=data.products;
    })
  }

  constructor(private apiService:ApiService){

  }
  products1=[
    {
  "_id": {
    "$oid": "689a1483d6decfb210614d15"
  },
  "name": "Wireless Mouse",
  "price": "799",
  "description": "Ergonomic wireless mouse with USB receiver.",
  "ratings": "4.5",
  "images": [
    {
      "image": "assets/images/products/1.jpg"
    },
    {
      "image": "mouse2.jpg"
    }
  ],
  "category": "Electronics",
  "seller": "TechZone",
  "stock": "146",
  "numOfReviews": "230",
  "createAt": "2025-08-01T10:00:00Z"
},
{
  "_id": {
    "$oid": "689a1483d6decfb210614d16"
  },
  "name": "Bluetooth Headphones",
  "price": "1599",
  "description": "Over-ear Bluetooth headphones with noise cancellation.",
  "ratings": "4.7",
  "images": [
    {
      "image": "assets/images/products/2.jpg"
    }
  ],
  "category": "Electronics",
  "seller": "SoundWave",
  "stock": "90",
  "numOfReviews": "310",
  "createAt": "2025-08-02T15:00:00Z"
}
  ];


  calculate(rating:String):number{
    // console.log((Number(rating)/5)*100);
    
    return (Number(rating)/5)*100;
  }

  search(){
    console.log(this.searchText);
    this.apiService.searchProducts(this.searchText).subscribe((data)=>{
      this.products=data.products
    })
  }

  clearSearch(){
    if(this.searchText==''){
     this.products=this.productsTmp
    }
  }

  searchByEnterKey() {
  this.search()
  }
  
}
