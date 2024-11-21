import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavefoodComponent } from './food/savefood/savefood.component';
import { ViewfoodComponent } from './food/viewfood/viewfood.component';
import { UpdatefoodComponent } from './food/updatefood/updatefood.component';
import { SavetableComponent } from './table/savetable/savetable.component';
import { ViewtableComponent } from './table/viewtable/viewtable.component';
import { UpdatetableComponent } from './table/updatetable/updatetable.component';
import { TablebookingComponent } from './tablebooking/tablebooking.component';
import { RegisterComponent } from './login/register/register.component';
import { LoginComponent } from './login/login/login.component';
import { TableapproveComponent } from './tableapprove/tableapprove.component';
import { OrderfoodComponent } from './orderfood/orderfood.component';
import { ApproveorderComponent } from './approveorder/approveorder.component';
import { ViewallfoodComponent } from './food/viewallfood/viewallfood.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { BillComponent } from './bill/bill.component';

const routes: Routes = [
  {path: "register" , component: RegisterComponent},
  {path: "login" , component: LoginComponent},
  {path: "savefood" , component: SavefoodComponent},
  {path: "viewfood" , component: ViewfoodComponent},
  {path: "viewallfood" , component: ViewallfoodComponent},
  {path: "updatefood/:id" , component: UpdatefoodComponent},
  {path: "savetable" , component: SavetableComponent},
  {path: "viewtable" , component: ViewtableComponent},
  {path: "updatetable/:id" , component: UpdatetableComponent},
  {path: "tablebooking" , component: TablebookingComponent},
  {path: "tableapprove" , component: TableapproveComponent},
  {path: "orderfood" , component: OrderfoodComponent},
  {path: "orderlist" , component: OrderlistComponent},
  {path: "orderapprove" , component: ApproveorderComponent},
  {path: "bill/:billId" , component: BillComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
