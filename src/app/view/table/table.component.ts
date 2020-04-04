import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { TableService } from './table.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuTrigger } from '@angular/material';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormatData } from 'src/app/common/FormatData';

// tslint:disable-next-line:prefer-const
let global: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Output() evShowDataDetail = new EventEmitter();
  checkAll = false;
  isLoading = false;
  selected: any[] = [];
  loadMore = 1;
  pagination = {
    page: 1,
    pageSize: 100,
    totalRecords: 0
  };
  dataCopy: any[];
  cateId;
  typeTradingFloor = null;
  coordinate = {
    x: '0',
    y: '0'
  };
  link;
  mess = {
    1: 'Không có dữ liệu, có thể đề xuất',
    2: 'Đã hết dữ liệu có thể đề xuất',
    3: 'Lỗi API! Không thể get được dữ liệu',
    4: 'Đã sao chép link sản phẩm'
  };
  colName = [];
  row = [];
  rowClone = [];
  selectSearch = 'all';
  @ViewChild('contextMenu', { static: false }) menu: ElementRef;
  @ViewChild(MatMenuTrigger, { static: false }) contextMenu: MatMenuTrigger;
  @ViewChild('myTable', { static: false }) table: DatatableComponent;
  constructor(
    private tableSer: TableService,
    private acRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public _formatData: FormatData
  ) { }
  async ngOnInit() {
    this.cateId = this.acRoute.snapshot.params.id;
    switch (0) {
      case this.cateId.indexOf('shopee'):
        this.typeTradingFloor = 0;
        this.colName = [
          { name: '#', prop: 'index', width: '55', frozenLeft: true, resizeable: false, sortable: true },
          { name: 'Ảnh', prop: 'image_dis', sortable: false, frozenLeft: true, resizeable: false, width: '60' },
          { name: 'Tên sản phẩm', prop: 'name', width: '250' },
          { name: 'Giá', prop: 'price', width: '100', format: 'currency' },
          { name: 'SL đã bán', prop: 'historical_sold', width: '100', format: 'number' },
          { name: 'Thời gian', prop: 'ctime', format: 'date' },
          { name: 'SL trong kho', prop: 'stock', width: '100', format: 'number' },
          { name: 'Giảm giá', prop: 'discount', width: '100' },
          { name: 'Xem', prop: 'view_count', width: '100', format: 'number' },
          { name: 'Thích', prop: 'liked_count', width: '100', format: 'number' },
          { name: 'Bình luận', prop: 'cmt_count', width: '100', format: 'number' },
          { name: 'Đánh giá', prop: 'rating_star', width: '100' },
          { name: 'Tên cửa hàng', prop: 'shop_location', width: '250' },
          { name: 'Doanh Thu', prop: 'sales', frozenRight: true, width: '100', resizeable: false, format: 'currency' }
        ];
        break;
      case this.cateId.indexOf('tiki'):
        this.typeTradingFloor = 1;
        this.colName = [
          { name: '#', prop: 'index', width: '55', frozenLeft: true, resizeable: false, sortable: true },
          { name: 'Ảnh', prop: 'thumbnail_url', sortable: false, frozenLeft: true, resizeable: false, width: '60' },
          { name: 'Tên sản phẩm', prop: 'name', width: '250' },
          { name: 'Giá', prop: 'price', width: '100', format: 'currency' },
          { name: 'SL đã bán', prop: 'order_count', width: '100', format: 'number' },
          { name: 'Giảm giá', prop: 'discount', width: '100', format: 'currency' },
          { name: 'Chiết khấu', prop: 'discount_rate', width: '100', format: 'percent' },
          { name: 'Xem', prop: 'review_count', width: '100', format: 'number' },
          { name: 'Thích', prop: 'favourite_count', width: '100', format: 'number' },
          { name: 'Đánh giá', prop: 'rating_average', width: '100' },
          { name: 'Doanh Thu', prop: 'sales', frozenRight: true, width: '100', resizeable: false, format: 'currency' }
        ];
        break;
      case this.cateId.indexOf('sendo'):
        this.typeTradingFloor = 2;
        this.colName = [
          { name: '#', prop: 'index', width: '55', frozenLeft: true, resizeable: false, sortable: true },
          { name: 'Ảnh', prop: 'image', sortable: false, frozenLeft: true, resizeable: false, width: '60' },
          { name: 'Tên sản phẩm', prop: 'name', width: '250' },
          { name: 'Giá', prop: 'final_price', width: '100', format: 'currency' },
          { name: 'SL đã bán', prop: 'order_count', width: '100', format: 'number' },
          { name: 'Giá gốc', prop: 'original_price', width: '100', format: 'currency' },
          { name: 'Khuyễn mãi', prop: 'final_promotion_percent', width: '100', format: 'percent' },
          { name: 'Tên cửa hàng', prop: 'shop_name', width: '250', format: 'number' },
          { name: 'Xem', prop: 'counter_view', width: '100', format: 'number' },
          { name: 'Thích', prop: 'counter_like', width: '100', format: 'number' },
          { name: 'Bình luận', prop: 'total_comment', width: '100', format: 'number' },
          { name: 'Đánh giá', prop: 'percent_star', width: '100', format: 'tofixed2' },
          { name: 'Doanh Thu', prop: 'sales', frozenRight: true, width: '100', resizeable: false, format: 'currency' }
        ];
        break;
      default:
        this.typeTradingFloor = 999;
        return;
    }
    setTimeout(async () => {
      await this.onLoadData();
    });
  }
  async onLoadData() {
    await this.isLoadData(async () => {
      switch (this.typeTradingFloor) {
        case 0:
          await this.tableSer.getShopeeProduct(this.cateId, this.loadMore.toString()).toPromise().then((res: any) => {
            if (res && res.length > 0) {
              this.loadMore += 1;
              this.row = this.handlingData(res);
            } else {
              if (res.length === 0) {
                this.typeTradingFloor = 7;
                return;
              }
              this._snackBar.open(this.mess[2], 'Undo', {
                duration: 3000
              });
            }
          }, err => {
            this.typeTradingFloor = 8;
            this.isLoading = false;
          });
          break;
        case 1:
          await this.tableSer.getTikiProduct(this.cateId, this.loadMore.toString()).toPromise().then((res: any) => {
            if (res && res.length > 0) {
              this.loadMore += 1;
              this.row = this.handlingData(res);
            } else {
              if (res.length === 0) {
                this.typeTradingFloor = 7;
                return;
              }
              this._snackBar.open(this.mess[2], 'Undo', {
                duration: 3000
              });
            }
          }, err => {
            this.typeTradingFloor = 8;
            this.isLoading = false;
          });
          break;
        case 2:
          await this.tableSer.getSendoProduct(this.cateId, this.loadMore.toString()).toPromise().then((res: any) => {
            if (res && res.length > 0) {
              this.loadMore += 1;
              this.row = this.handlingData(res);
            } else {
              if (res.length === 0) {
                this.typeTradingFloor = 7;
                return;
              }
              this._snackBar.open(this.mess[2], 'Undo', {
                duration: 3000
              });
            }
          }, err => {
            this.typeTradingFloor = 8;
            this.isLoading = false;
          });
          break;
      }
      this.pagination.totalRecords = this.row.length;
      this.pagination.page = 0;
      this.rowClone = [...this.row];
    });
  }
  handlingData(arr) {
    let i = 1;
    switch (this.typeTradingFloor) {
      case 0:
        for (const iterator of arr) {
          iterator.index = i;
          iterator.sales = iterator.historical_sold * (iterator.price / 100000);
          iterator.price = iterator.price / 100000;
          iterator.ctime = iterator.ctime * 1000;
          iterator.rating_star = iterator.item_rating.rating_star;
          iterator.link_redirect = 'https://shopee.vn/product/' + iterator.shopid + '/' + iterator.itemid;
          iterator.image_dis = 'https://cf.shopee.vn/file/' + iterator.image;
          i++;
        }
        break;
      case 1:
        for (const iterator of arr) {
          iterator.index = i;
          iterator.sales = iterator.order_count * iterator.price;
          iterator.price = iterator.price;
          iterator.link_redirect = 'https://tiki.vn/' + iterator.url_path;
          i++;
        }
        break;
      case 2:
        for (const iterator of arr) {
          iterator.index = i;
          iterator.sales = iterator.order_count * iterator.final_price;
          iterator.link_redirect = 'https://www.sendo.vn/' + iterator.cat_path;
          i++;
        }
        break;
    }
    return arr;
  }
  onNothing(event) {
    event.stopPropagation();
  }
  onFilterData(event: Event) {
    console.log(event);
    this.isLoadData(() => {
      if (this.selectSearch !== 'all') {
      }
      if (!event.target['value']) {
        this.row = [...this.rowClone];
        return;
      }
      if (this.selectSearch === 'all') {
        this.row = this.rowClone.filter(item => {
          return item['name'].toLowerCase().includes(event.target['value'].toLowerCase()) ||
            (item['price'] || 0).toString().toLowerCase().includes(event.target['value'].toLowerCase()) ||
            (item['sales'] || 0).toString().toLowerCase().includes(event.target['value'].toLowerCase());
        });
        return;
      }
      this.row = this.rowClone.filter(item => {
        return (item[this.selectSearch] || 0).toString().toLowerCase().includes(event.target['value'].toLowerCase());
      });
    });
  }
  openMenu(event, row) {
    const coor = event.target.getBoundingClientRect();
    console.log(this.contextMenu);
    this.coordinate.x = event.clientX + 'px';
    this.coordinate.y = (coor.y + 14) + 'px';
    this.link = row.link_redirect;
    this.contextMenu.openMenu();
    return false;
  }
  isLoadData(func) {
    this.isLoading = true;
    setTimeout(async () => {
      await func();
      this.isLoading = false;
    });
  }
  onShowDetail(event, ele) {
    console.log(event);
    console.log(this.table);
    this.table.element.querySelectorAll('.row-selected').forEach( eleDom => {
      eleDom.classList.remove('row-selected');
    });
    global = ele;
    this.evShowDataDetail.emit(ele);
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  getCellClass(value) {
    if (global && global.id === value.row.id) {
      return ' row-selected';
    }
  }
  onCopyToClipboard() {
    let text = [];
    text = this.selected.map((item) => (item.link_redirect));
    const node = document.createElement('textarea');
    const selection = document.getSelection();
    node.textContent = text.join(' ');
    document.body.appendChild(node);
    selection.removeAllRanges();
    node.select();
    document.execCommand('copy');
    selection.removeAllRanges();
    document.body.removeChild(node);
    this._snackBar.open(this.mess[4], 'Undo', {
      duration: 3000
    });
  }
}
