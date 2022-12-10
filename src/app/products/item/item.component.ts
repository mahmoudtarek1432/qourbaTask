import { Component, Input } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ProductItem } from 'src/app/shared/model/Products';
import { UserCart } from 'src/app/state/Cart/cart.action';
import { cartState } from 'src/app/state/Cart/cart.state';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
@Input("product")
  product!: ProductItem
  fastar = faStar;
  test = 10


  constructor(private store: Store<cartState>){
  }

  async AddToCart(){
    var cart = await firstValueFrom(this.store.select("cart"))
    var x = cart.count
    console.log(x)
    this.store.dispatch(UserCart({Count: x  + 1}))
  }
}
