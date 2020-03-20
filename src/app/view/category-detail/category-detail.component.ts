import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

  listCategory: any = [];
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.listCategory = this.categoryService.dataCategory;
  }

  openCategory(id_category) {
    this.router.navigate(['/category-detail']);
  }

}
