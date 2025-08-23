import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  productsSource=new BehaviorSubject([]);
  currentProducts=this.productsSource.asObservable();
  productsTmp:any=[]

  getProducts(){
    this.http.get(environment.apiUrl+'/api/v1/products')
    .subscribe((data:any)=>{
      this.productsSource.next(data)
      this.productsTmp=data;
    })
  }

  searchProducts(searchText:string){
   this.http.get(environment.apiUrl+'/api/v1/products',{
      params:{keyword:searchText}
  }).subscribe((data:any)=>{
    this.productsSource.next(data)
  })
  }

   clearSearch(searchText:String){
    if(searchText==''){
      this.productsSource.next(this.productsTmp)
    }
  }

  getSingleProduct(id:String){
    return this.http.get(environment.apiUrl+'/api/v1/product/'+id)
  }
  
}
