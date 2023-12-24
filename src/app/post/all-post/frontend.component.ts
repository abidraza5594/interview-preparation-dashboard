import { Component, OnInit } from '@angular/core';
import { PostService } from '../../Services/post.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './frontend.component.html',
  styleUrl: './frontend.component.css'
})
export class FrontEndComponent implements OnInit {

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
    this.postServices.loadFrontEndPost().subscribe(data=>{
      console.log(data)
      this.frontEndPostArray=data
    })
  }

}
