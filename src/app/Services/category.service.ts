import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private afs: AngularFirestore,
    private toastr: ToastrService) { }

  saveData(data: any) {
    this.afs.collection('categories').add(data).then((docRef) => {
      this.toastr.success('Data Insert Successfully!');
      console.log(docRef)
      // if you want to store in subCatogeries 
      // this.afs.collection("categories").doc(docRef.id).collection("subcategories").add(subCategoryData).then((docRef1)=>{
      // }).catch((error)=>{
      //   console.log(error)
      // })
    }).catch((error) => {
      console.log(error)
    })
  }

  loadData(){
    return this.afs.collection("categories").snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,data}
        })
      })
    )
  }


  updateData(id:string,EditData:string){
    let updateData={category:EditData}
    this.afs.collection("categories").doc(id).update(updateData).then((docRef)=>{
      this.toastr.success('Data Update Successfully!');
    })
  }

  deleteData(id:any){
    this.afs.collection("categories").doc(id).delete().then(docRfe=>{
      this.toastr.success('Data Deleted Successfully!');
    })
  }

}



