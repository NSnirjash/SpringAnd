import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SavefoodComponent } from './food/savefood/savefood.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { SidebarComponent } from './nav/sidebar/sidebar.component';
import { FooterComponent } from './nav/footer/footer.component';
import { ViewfoodComponent } from './food/viewfood/viewfood.component';
import { UpdatefoodComponent } from './food/updatefood/updatefood.component';
import { SavetableComponent } from './table/savetable/savetable.component';
import { ViewtableComponent } from './table/viewtable/viewtable.component';
import { UpdatetableComponent } from './table/updatetable/updatetable.component';
import { RegisterComponent } from './login/register/register.component';
import { LoginComponent } from './login/login/login.component';
import { TokenInterceptor } from './guards/TokenInterceptor';
import { TablebookingComponent } from './tablebooking/tablebooking.component';
import { TableapproveComponent } from './tableapprove/tableapprove.component';
import { OrderfoodComponent } from './orderfood/orderfood.component';
import { ApproveorderComponent } from './approveorder/approveorder.component';
import { ViewallfoodComponent } from './food/viewallfood/viewallfood.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { BillComponent } from './bill/bill.component';

@NgModule({
  declarations: [
    AppComponent,
    SavefoodComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ViewfoodComponent,
    UpdatefoodComponent,
    SavetableComponent,
    ViewtableComponent,
    UpdatetableComponent,
    RegisterComponent,
    LoginComponent,
    TablebookingComponent,
    TableapproveComponent,
    OrderfoodComponent,
    ApproveorderComponent,
    ViewallfoodComponent,
    OrderlistComponent,
    BillComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()
    ),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
