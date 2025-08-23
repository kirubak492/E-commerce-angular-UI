import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'E-commerce';

  searchText:string=''
  cartCount=0;

  
constructor(private apiService:ApiService,private cartService:CartService){}
  ngOnInit(): void {
    this.cartService.currentItems.subscribe((data:any)=>{
    this.cartCount=data.length;
    }
  )
  }

  search(){
    console.log(this.searchText);
    this.apiService.searchProducts(this.searchText);
  }

 clearSearch(){
  this.apiService.clearSearch(this.searchText);
 }

  searchByEnterKey() {
  this.search()
  }
}
