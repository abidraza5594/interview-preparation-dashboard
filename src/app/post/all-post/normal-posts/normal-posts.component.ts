import { Component } from '@angular/core';
import { PostService } from '../../../Services/post.service';

@Component({
  selector: 'app-normal-posts',
  templateUrl: './normal-posts.component.html',
  styleUrl: './normal-posts.component.css'
})
export class NormalPostsComponent {

  
  frontEndPostArray:Array<any>=[]

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
    this.postServices.loadNormalHeaderPost().subscribe(data=>{
      console.log(data)
      this.frontEndPostArray=data
    })
  }

}
