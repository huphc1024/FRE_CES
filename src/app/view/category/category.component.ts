import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  listCategory: any = [];
  listTiki = [];
  listSendo = [];
  listShopee = [];
  listLazada = [];
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.categoryService.getListCategory().subscribe( res => {
      this.listCategory = res;
      this.listCategory.forEach( ele => {
        switch (0) {
          case ele.categoryId.indexOf('tiki'):
            this.listTiki.push(ele);
            break;
          case ele.categoryId.indexOf('shopee'):
            this.listShopee.push(ele);
            break;
          case ele.categoryId.indexOf('sendo'):
            this.listSendo.push(ele);
            break;
          case ele.categoryId.indexOf('lazada'):
            this.listLazada.push(ele);
            break;
        }
      });
    });

    // this.listCategory = this.categoryService.listCategories;
  }

  openCategory(id_category, name) {
    this.categoryService.categoryParrent = name;
    this.router.navigate(['/category/' + id_category]);
  }
}
