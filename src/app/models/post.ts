export interface Post {
    title:string,
    permalink:string,
    excerpt:string,
    category:{
        CategoryId:string,
        Category:string
    },
    postType:string,
    postImgPath:string,
    content:string,
    isFeatured:boolean,
    views:number,
    status:string,
    createdAt:Date,
    autherName?:string
}
