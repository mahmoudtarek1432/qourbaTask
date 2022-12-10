import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faChevronLeft, faChevronRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { combineLatest, combineLatestAll, firstValueFrom, forkJoin, map, mergeMap, Observable, of, switchMap } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { AuthToken } from '../shared/model/Account';
import { pageSetings, ProductItem, productListDto } from '../shared/model/Products';
import { AuthState } from '../state/Account/account.state';
import { ProcessesLoading } from '../state/Processing/processing.action';
import { processState } from '../state/Processing/processing.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  faChevLeft = faChevronLeft;
  faChevRight = faChevronRight;
  faCheck = faCheck;

  categories$!: Promise<Map<string,productListDto>>;
  categoryItems$!: Observable<productListDto>[];
  productsList!: ProductItem[];
  productsProperties!: productListDto;
  pageSettings!:pageSetings;
  activeCategory!: string;
  activeSearch!:string;
  activePage: number = 1;
  pagination!:string[];
  loggedIn?: boolean;

  constructor(private productService: ProductsService,private store:Store<AuthState>, private processStore:Store<processState>, private router: Router, private activatedRoute:ActivatedRoute){

      this.redirctToLoginPage(router,store)
      this.onUrlChange()
  }

  ngOnInit(): void {

    this.addProcess()

    this.categories$ = this.getAllCategories()

    this.onUrlChange()
  }

  //uses switchmap to query through the query params and trigger retrive items according to the parameters

  async onUrlChange(){

     this.activatedRoute.queryParams.pipe(switchMap((params) =>{
      this.getQueryParams(params);

      var CategoryProducts$ = this.productService.getProductsByCategory(this.activeCategory,this.activePage-1)
      var SearchProducts$ = this.productService.getSearchProducts(this.activeSearch,this.activePage-1)

      this.getQueryParamsProducts(params['category'], CategoryProducts$)
      this.getQueryParamsProducts(params['q'], SearchProducts$)

      return of()
    })).subscribe( r => {
    });
  }

  async addProcess(){
    var processes = await firstValueFrom(this.processStore.select("process"))
    this.processStore.dispatch(ProcessesLoading({Count : processes.count + 1}))
  }

  async RemoveProcess(){
    var processes = await firstValueFrom(this.processStore.select("process"))
    this.processStore.dispatch(ProcessesLoading({Count : processes.count - 1}))
  }

  //returns a map of the categories and category item list details.
  async getAllCategories(): Promise<Map<string,productListDto>>{
    var categories = await firstValueFrom(this.productService.getCategoryProductsMap())
    this.RemoveProcess()
    return this.mapCategoryIntoHash(categories);

  }


  getQueryParamsProducts(QueryParam:string, productFunction: Observable<productListDto>){
    if(QueryParam){
      this.activeCategory = QueryParam
      productFunction.subscribe(res => {
                                            this.productsList = res.products
                                            this.pagination = this.formPagination(Math.ceil(res.total/res.limit),4,this.activePage)});
    }
  }

  getQueryParams(params:Params){
    if(params['page']){
      this.activePage = params['page']
    }
    else{
      this.activePage = 1
    }
  }

  navigateCategories(cat:string){
    this.router.navigate(['/products'],
    { queryParams: { category: cat }

    })
  }

  navigatePage(pageNum:any){
    console.log(pageNum)
    if(parseInt(pageNum)){
      this.router.navigate(['/products'],
      { queryParams: { page: pageNum },
        queryParamsHandling: 'merge'
      })
    }
  }

  mapCategoryIntoHash(arr:any[]): Map<string,productListDto>{
    var map = new Map<string,productListDto>();
    var catarr:string[] = arr.pop()
    var proarr:productListDto[] = arr
    proarr.forEach((pro,index) => map.set(catarr[index],pro))
    console.log(map)
    return map
  }


  //page limit is the number of blocks that appear on screen  ** * ** is 4 and the middle is the active in case page limit was > count
  formPagination(PaginationCount:number, pagelimit:number, activePage:number){
    pagelimit = (pagelimit > PaginationCount)? PaginationCount : pagelimit; //if the page limit is larger than the pages asign pagecount as the new limit
     var pointer = PaginationCount;
     var i = 0;
     var pages:string[] = [];
    do{ //insert from both array start and end to reduce complexity
        pages[pagelimit-i-1] = ""+pointer--;
        pages[i] = ++i+"";

    }while(i<pagelimit/2)
    if(PaginationCount > pagelimit){ // if the items were more than the page limit... for instance limit of 4 and pagecount of 10 will appear as
      pages.splice(Math.ceil(pagelimit/2),0,'...') // 1 2 .. 3 .. 9 10 if the active page is 3
      if(activePage > 2 && activePage < PaginationCount-2){
        pages.splice(Math.ceil(pagelimit/2),0,activePage+""); // insert active page into the center of the array
        pages.splice(Math.ceil(pagelimit/2),0,'...');
      }
    }
    return pages;
  }

  IterateThroughPage(i:number){ // used by the chevs on the edge of the pagination
    var page = parseInt(this.activePage+'') + i
    console.log(length-1)
    if(page < parseInt(this.pagination[this.pagination.length -1]) &&  page > 0){
      this.navigatePage(page)
     }
    }

  checkActivePage(i:string){
    return this.activePage == parseInt(i)
  }

  redirctToLoginPage(router:Router,store:Store<AuthState>){ // redirect to login page if the user wasnt authenticated.
    store.select("AuthToken").subscribe(r => this.loggedIn = r?.isActive)

    if(!this.loggedIn){
      router.navigateByUrl("login");
    }
  }
}
