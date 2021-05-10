import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './liste/detail/detail.component';
import { ListeComponent } from './liste/liste.component';
import { ModifyComponent } from './modify/modify.component';

const routes: Routes = [
  {
    path: "liste/detail/:id",
    component: DetailComponent
  },
  {
    path: "create",
    component: CreateComponent
  },
  {
    path: "modify/:id",
    component:ModifyComponent
  },
  {
    path: "",
    component: ListeComponent
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
