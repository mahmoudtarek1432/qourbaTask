import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, map, mergeMap, Observable, of } from 'rxjs';
import { ProductItem, productListDto } from '../shared/model/Products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getCategories():Observable<string[]>{

      return this.http.get<string[]>("https://dummyjson.com/products/categories",{
      headers: {
      'Content-Type': 'application/json'
    },withCredentials: false})
  }

  getCategoriesWithProducts(CategoryName:string[]):Observable<productListDto>[]{
    return CategoryName.flatMap( cat => this.getProductsByCategoryEmpty(cat));
  }

  getProductsByCategoryEmpty(category:any):Observable<productListDto>{
    return this.http.get<productListDto>(`https://dummyjson.com/products/category/${category}?limit=0`,{ //empty to know the total amount
      headers: {
      'Content-Type': 'application/json'
    },withCredentials: false})
  }

  getProductsByCategory(category:any,page:any):Observable<productListDto>{
    var limit = 10
    page = (page)? page: ''
    console.log(`https://dummyjson.com/products/category/${category}?limit=${10}&skip=${page*limit}`)
    return this.http.get<productListDto>(`https://dummyjson.com/products/category/${category}?limit=${10}&skip=${page*limit}`,{
      headers: {
      'Content-Type': 'application/json'
    },withCredentials: false})
  }

  getProductById(id:number):Observable<ProductItem>{
    return this.http.get<ProductItem>(`https://dummyjson.com/products/${id}`);
  }

  //getCategories retrieve category array then for each category's data is retrived in parallel using mergemap
  // combinelast/forkjoin collects all the issued observables and return them as an array... along with the categories which was concated into
  // an array as observable to get passed along with the product info... this was used to avoid nesting subscriptions which has poor readability
  getCategoryProductsMap():Observable<any[]>{
      return this.getCategories().pipe(mergeMap(
      (categories) => combineLatest([...this.getCategoriesWithProducts(categories),of(categories)]),),
      map((obsList) => obsList))
  }

  getSearchProducts(SearchQuery:any,page:any):Observable<productListDto>{
    var limit = 10
    page = (page)? page: ''
    return this.http.get<productListDto>(`https://dummyjson.com/products/search?q=${SearchQuery}&limit=${10}&skip=${page*limit}`);
  }
}
