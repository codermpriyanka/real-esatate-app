import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PagesModule } from '../pages/pages.module';
import { CoreRoutingModule } from './core-routing.module';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    AboutComponent,
    ServicesComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    PagesModule,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    FooterComponent,
    NavbarComponent,
  ]
})
export class CoreModule { }
