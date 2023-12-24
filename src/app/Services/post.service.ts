import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private storage: AngularFireStorage,
    private afs:AngularFirestore,
    private toaster:ToastrService,
    private router:Router) { }

  uploadImage(selectedImage: any, postData: any,formsStatus:any,id:any) {
    console.log(postData,'post data from post service')
    const filePath = `postIMG/${Date.now()}`;
    this.storage.upload(filePath, selectedImage).then(() => {
      console.log("Post Image Uploaded successfully")
      // get uploaded image URL
      this.storage.ref(filePath).getDownloadURL().subscribe(URL => {
        // add this URL in to PostData Object
        postData.postImgPath=URL
        if(formsStatus=='Edit'){
          this.updateData(id,postData)
        }else{
          this.savePostData(postData)
        }
      })
    })
  }

  savePostData(postData:any){
    this.afs.collection("posts").add(postData).then(docRef=>{
      this.toaster.success("Data Insert Successfully")
      this.router.navigate(["/posts"])
    })
  }


  loadFrontEndPost(){
    return this.afs.collection("posts",ref=>ref.where('postType','==',"frontend")).snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,data}
        })
      })
    )
  }

  loadBackEndPost(){
    return this.afs.collection("posts",ref=>ref.where('postType','==',"backend")).snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,data}
        })
      })
    )
  }



  loadOneData(id:any){
    // return this.afs.collection("posts").doc(id).valueChanges();
    return this.afs.doc(`posts/${id}`).valueChanges();
  }


  updateData(id:any,editedData:any){
    this.afs.doc(`posts/${id}`).update(editedData).then(()=>{
      this.toaster.success("Data Updated Successfully")
      this.router.navigate(['/posts'])
    })
  }


  deleteImage(postImgPath:any , id:any){
    this.storage.storage.refFromURL(postImgPath).delete().then(()=>{
      this.deleteData(id)
    });
  }

  deleteData(id:any){
    this.afs.doc(`posts/${id}`).delete().then(()=>{
      this.toaster.success("Data Deleted Successfully")
    })
  }


  markFeatured(id:any,featuredData:any){
    this.afs.doc(`posts/${id}`).update(featuredData).then(()=>{
      this.toaster.info("Featured Status Updated")
    })
  }



}
