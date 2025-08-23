import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'E-commerce';

  searchText:string=''

  
constructor(private apiService:ApiService){}

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
