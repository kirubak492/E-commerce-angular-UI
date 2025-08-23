import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  products:any=[];
  searchText:string='';

  ngOnInit(): void {
    this.apiService.getProducts();
    this.apiService.currentProducts.subscribe((data:any)=>{
      this.products=data.products;
      
    })
  }

  constructor(private apiService:ApiService){

  }

  calculate(rating:String):number{
    // console.log((Number(rating)/5)*100);
    
    return (Number(rating)/5)*100;
  }

  
}
