import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { processState } from '../state/Processing/processing.state';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  loadingState!: number

  constructor(processLoading: Store<processState>){
    processLoading.select("process").subscribe( r => this.loadingState = r.count)
  }

}
