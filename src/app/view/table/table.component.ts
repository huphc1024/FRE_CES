import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableService } from './table.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Output() evShowDataDetail = new EventEmitter();
  checkAll = false;
  isLoading = false;
  rowSelected = {};
  loadMore = 1;
  pagination = {
    page: 1,
    pageSize: 100,
    totalRecords: 0
  };
  dataCopy: any[];
  dataProduct = [];
  cateId;
  displayedColumnsTiKi: any[] = [
    'select',
    'index',
    'image',
    'name',
    'price',
    'ctime',
    'stock',
    'discount',
    'view_count',
    'liked_count',
    'cmt_count',
    'rating_star',
    'historical_sold',
    'sales'];
  dataSource = new MatTableDataSource([]);
  constructor(
    private tableSer: TableService,
    private acRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cateId = this.acRoute.snapshot.params.id;
    this.onLoadData();
    console.log(this.cateId);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.pagination.totalRecords = this.dataSource.data.length;
    this.pagination.page = 1;
  }
  async onLoadData() {
    this.isLoading = true;
    await this.tableSer.getListShopee(this.cateId, this.loadMore.toString()).toPromise().then((res: any) => {
      if (res && res.length > 0) {
        this.loadMore += 1;
        this.dataProduct = this.dataProduct.concat(res);
      }
    }, err => {
      this.isLoading = false;
    });
    this.dataSource.data = this.dataProduct;
    this.paginator._changePageSize(this.paginator.pageSize);
    this.dataSource._updateChangeSubscription();
    this.pagination.totalRecords = this.dataProduct.length;
    this.isLoading = false;
  }
  onAllSelected(event) {
    this.checkAll = !this.checkAll;
    this.dataCopy = [];
    for (const iterator of this.dataSource.data) {
      iterator['isChecked'] = this.checkAll;
    }
  }
  fillerCheckAllData() {
    for (const iterator of this.dataSource.data) {
      if (!iterator['isChecked']) {
        this.checkAll = false;
        return;
      }
    }
    this.checkAll = true;
  }
  onSelectedRow(event, row) {
    row['isChecked'] = !row['isChecked'];
    this.fillerCheckAllData();
  }
  onNothing(event) {
    event.stopPropagation();
  }
  onPaginatorBT(event) {
    this.pagination.page = event;
    this.paginator.pageIndex = this.pagination.page - 1;
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  onPaginator(event) {
    this.pagination.pageSize = event.pageSize;
    this.pagination.page = event.pageIndex + 1;
  }
  onShowDetail(ele) {
    this.rowSelected = ele;
    this.evShowDataDetail.emit(ele);
  }
  onFilterData(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onCopyToClipboard() {
    const arr = this.dataSource.data.filter((item) => {
      return item['isChecked'] === true;
    });
    // tslint:disable-next-line:prefer-const
    let text = arr.map((item) => item.url_path);
    for (let index = 0; index < text.length; index++) {
      text[index] = 'https://tiki.vn/' + text[index];
    }
    const node = document.createElement('textarea');
    const selection = document.getSelection();
    node.textContent = text.join(' ');
    document.body.appendChild(node);
    selection.removeAllRanges();
    node.select();
    document.execCommand('copy');
    selection.removeAllRanges();
    document.body.removeChild(node);
  }
  formatCurrency() {
    return new Intl.NumberFormat('en');
  }
  formatNumber(value) {
    return value && Number(value.toFixed(2));
  }

  abbreviateNumber(n) {
    if (n < 1e3) { return n; }
    if (n >= 1e3 && n < 1e6) { return +(n / 1e3).toFixed(1) + 'k'; }
    if (n >= 1e6 && n < 1e9) { return +(n / 1e6).toFixed(2) + 'tr'; }
    if (n >= 1e9 && n < 1e12) { return +(n / 1e9).toFixed(3) + 'tỷ'; }
    if (n >= 1e12) { return +(n / 1e12).toFixed(1) + 'n tỷ'; }
  }
}
