import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPropertyComponent } from './features/add-property/add-property.component';
import { WishlistComponent } from './features/wishlist/wishlist.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PagesModule } from './pages/pages.module';
import { CoreModule } from './core/core.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from 'src/environments/environment';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@NgModule({
  declarations: [
    AppComponent,
    AddPropertyComponent,
    WishlistComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    CoreModule,
    AdminModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private afs: AngularFirestore) {

    setTimeout(() => {
      firebase.firestore().settings({
        experimentalForceLongPolling: true
      });
    }, 0);

  }
}