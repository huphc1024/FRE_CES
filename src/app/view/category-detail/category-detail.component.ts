import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category/category.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

  listCategory: any = [];
  showListProduct = false;
  isLoading = false;
  showProduct = false;
  showDetailProduct = false;
  parentName;
  productDetail: any;
  listShopShopee = [];
  listShopTiki = [];
  listShopSendo = [];
  listShopLazada = [];
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // @ts-ignore
    const id;
    // @ts-ignore
    this.route.params.subscribe( params => id = params.id);
    this.categoryService.getListSubCategory(id).subscribe( res => {
      this.listCategory = res;
    });
    this.categoryService.getListShop(id).subscribe( (res: any) => {
      switch (0) {
        case id.indexOf('tiki'):
          if (res) {
            this.listShopTiki = res.filters[res.filters.length - 1].values;
          }
          break;
        case id.indexOf('shopee'):
          if (res) {
            this.listShopShopee = res.data.items;
          }
          break;
        case id.indexOf('sendo'):
          if (res) {
            this.listShopSendo = res.result.data;
          }
          break;
      }
    })
    this.parentName = this.categoryService.categoryParrent;
  }

  openCategory(id_category) {
    this.categoryService.getListSubCategory(id_category).subscribe( res => {
      this.listCategory = res;
    });
  }

  loadProduct() {
    this.showProduct = true;
    this.showListProduct = true;
  }

  openProduct(event) {
    console.log(event);
    this.productDetail = event;
    this.showDetailProduct = true;
  }
  closeDetailProduct(event) {
    this.showDetailProduct = false;
  }
}
