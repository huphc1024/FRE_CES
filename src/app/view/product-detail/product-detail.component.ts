import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('data') data: any;
  constructor() { }

  ngOnInit() {
  }

  nothing(event) {
    event.stopPropagation();
  }

  formatCurrency() {
    return new Intl.NumberFormat('en');
  }
}
