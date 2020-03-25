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
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.categoryService.getListCategory().subscribe( res => {
    //   this.listCategory = res;
    // });
    this.listCategory = this.categoryService.listCategories;
  }

  openCategory(id_category, name) {
    this.categoryService.categoryParrent = name;
    this.router.navigate(['/category/' + id_category]);
  }
}
