import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// angular firBase
import {AngularFireModule,} from "@angular/fire/compat"
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { CategoryComponent } from './layout/category/category.component';
import { SignupComponent } from './layout/signup/signup.component';
import { enviroment } from '../enviroment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { FrontEndComponent } from './post/all-post/frontend.component';
import { NewPostComponent } from './post/new-post/new-post.component';

// Advance Editor

import { HttpClientModule} from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { BackendComponent } from './post/all-post/backend/backend.component';

import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CategoryComponent,
    SignupComponent,
    FrontEndComponent,
    NewPostComponent,
    BackendComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // firebase
    
    AngularFireModule.initializeApp(enviroment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    
    provideFirebaseApp(() => initializeApp({"projectId":"my-blogs-1688124392168","appId":"1:874380399101:web:42fa37fe992c3a12e34994","storageBucket":"my-blogs-1688124392168.appspot.com","apiKey":"AIzaSyB9s3N-ytJfSrwc3DNHXOxTaQ41Y-hSqTU","authDomain":"my-blogs-1688124392168.firebaseapp.com","messagingSenderId":"874380399101","measurementId":"G-8T9WRXX983"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    // toster Module
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added,
    HttpClientModule, 
    QuillModule.forRoot(),
    AngularEditorModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
