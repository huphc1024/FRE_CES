import {Component, OnInit, Input} from '@angular/core';
import {ProductDetailService} from './product-detail.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('data') data: any;

  constructor(
    private proSer: ProductDetailService,
    private route: ActivatedRoute
  ) {
  }

  isLoading = false;
  product: any = {
    name: '',
    image: '',
    price: '',
    url: '',
    date: '',
    description: '',
    thongke: {
      vitri: '',
      daban: '',
      daban30: '',
      gia: '',
      giamax: '',
      giamin: '',
      likes: '',
      kho: '',
      danhgia: '',
      luotxem: '',
      diemso: '',
      isshop: '',
    },
    chuyenmuc: [],
    mausanpham: [
      {
        ten: '',
        ma: '',
        gia: '',
        kho: '',
        daban: ''
      }
    ],
    thuoctinh: [
      {
        ten: '',
        ma: '',
        giatri: ''
      }
    ]
  };

  ngOnInit() {
    let id;
    this.route.params.subscribe(params => id = params.id);
    this.isLoading = true;
    this.product.name = this.data.name;
    this.product.price = this.data.price;
    switch (0) {
      case id.indexOf('tiki'):
        this.product.image = this.data.thumbnail_url;
        this.product.url = 'https:/tiki.vn/' + this.data.url_path;
        this.product.description = this.data.promotion;
        this.proSer.getTikiProductDetail(this.data.url_path).subscribe(res => {
          if (res) {

          }
          this.isLoading = false;
        });
        break;
      case id.indexOf('shopee'):
        this.product.price = this.data.price / 100000;
        this.product.description = this.data.description;
        this.product.image = 'https://cf.shopee.vn/file/' + this.data.image;
        this.proSer.getShopeeProductDetail(this.data.itemid, this.data.shopid).subscribe(res => {
          if (res) {
          }
          this.isLoading = false;
        });
        break;
      case id.indexOf('sendo'):
        this.product.image = this.data.image;
        this.product.url = 'https:/sendo.vn/' + this.data.cat_path;
        this.product.description = this.data.description;
        this.proSer.getSendoProductDetail(this.data.cat_path.substring(0, this.data.cat_path.length - 6)).subscribe((res: any) => {
          if (res) {
          }
          this.isLoading = false;
        });
        break;
    }

  }

  nothing(event) {
    event.stopPropagation();
  }

  formatCurrency() {
    return new Intl.NumberFormat('en');
  }

}
