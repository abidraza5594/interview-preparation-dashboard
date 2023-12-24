import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../Services/category.service';
import { Category } from '../../models/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'] // Corrected property name
})
export class CategoryComponent implements OnInit {

  categoryArray: Array<any> = []
  formCategory: any  // for edit
  formStatus: string = 'Add'
  categoryId:string=''

  constructor(private categoryService: CategoryService,
    private toastr: ToastrService) { }


  onSubmit(category: any) {
    let categoryData: Category = { category: category.value.category };
    if (this.formStatus == 'Add') {
      this.categoryService.saveData(categoryData)
      category.reset()
    }else if(this.formStatus=='Edit'){
      this.categoryService.updateData(this.categoryId,this.formCategory)
      this.formStatus = 'Add'
      category.reset()
    }

  }

  onEdit(category: any) {
    this.formCategory = category.data.category
    this.categoryId=category.id
    this.formStatus = 'Edit'
  }

  onDelete(category:any){
    this.categoryService.deleteData(category.id)
  }


  ngOnInit() {
    this.categoryService.loadData().subscribe(val => {
      console.log(val)
      this.categoryArray = val
    })
  }



}
