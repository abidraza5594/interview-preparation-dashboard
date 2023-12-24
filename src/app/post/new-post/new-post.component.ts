import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../Services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/post';
import { PostService } from '../../Services/post.service';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit {
  permalink:string=''
  imgSrc:string='https://www.pngkey.com/png/full/233-2332677_image-500580-placeholder-transparent.png'
  selectedImage:any
  categories:Array<any>=[]
  postForm: FormGroup;
  post: any;
  formStatus:string='Add New'
  docId:string=''


  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};

  
  
  constructor(
    private catogoryService: CategoryService,
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute
  ) {
    this.postForm = fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postType:['',Validators.required],
      postImg: ['', Validators.required],
      content: ['', Validators.required],
    });
  
    this.route.queryParams.subscribe((val: any) => {
      this.docId=val.id
      if(this.docId){
        this.postService.loadOneData(val.id).subscribe((post) => {
          this.post = post;
          this.postForm.patchValue({
            title: this.post.title,
            permalink: this.post.permalink,
            excerpt: this.post.excerpt,
            category: `${this.post.category.CategoryId}-${this.post.category.Category}`,
            postType:this.post.postType,
            postImg: this.post.postImg,
            content: this.post.content,
          });
          this.imgSrc = this.post.postImgPath;
          this.formStatus='Edit '
        });
      }else{
        this.postForm = fb.group({
          title: ['', [Validators.required, Validators.minLength(10)]],
          permalink: ['', Validators.required],
          excerpt: ['', [Validators.required, Validators.minLength(50)]],
          category: ['', Validators.required],
          postType:['',Validators.required],
          postImg: ['', Validators.required],
          content: ['', Validators.required],
        });
      }
      
    });
  }
  
  onSubmit(){
    const cate=this.postForm.value.category.split('-')
    const postData:Post={
      title:this.postForm.value.title,
      permalink:this.postForm.value.permalink,
      category:{
        CategoryId:cate[0],
        Category:cate[1],
      },
      postType:this.postForm.value.postType,
      postImgPath:'',
      excerpt:this.postForm.value.excerpt,
      content:this.postForm.value.content,
      isFeatured:false,
      views:0,
      status:'new',
      createdAt:new Date(),
      autherName:''
    }
    this.postService.uploadImage(this.selectedImage,postData,this.formStatus,this.docId)
    this.postForm.reset()
    this.imgSrc='https://www.pngkey.com/png/full/233-2332677_image-500580-placeholder-transparent.png'
    console.log(this.postForm)
  }

  ngOnInit(){
    this.catogoryService.loadData().subscribe(val=>{
      this.categories=val
    })
  }

  get fc(){
    return this.postForm.controls
  }

  onTitleChange($event: any) {
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');
  }

  showPreview($event: any) {
    const reader = new FileReader();
  
    reader.onload = (e: any) => {
      this.imgSrc = e.target.result;
    };
  
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImage=$event.target.files[0]
  }
  

  
}
