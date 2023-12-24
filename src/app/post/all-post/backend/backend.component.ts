import { Component } from '@angular/core';
import { PostService } from '../../../Services/post.service';

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrl: './backend.component.css'
})
export class BackendComponent {

  
  backEndPostArray:Array<any>=[]

  constructor(private postServices:PostService){}

onDelete(postImgPath: any,id:any) {
  this.postServices.deleteImage(postImgPath,id)
}

onMarkFeatured(id:any,value:boolean){
  const featuredData={
    isFeatured:value
  }
  this.postServices.markFeatured(id,featuredData)
}


  ngOnInit() {
    this.postServices.loadBackEndPost().subscribe(data=>{
      this.backEndPostArray=data
    })
  }

}
