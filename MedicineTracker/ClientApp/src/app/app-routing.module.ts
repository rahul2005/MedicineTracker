import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicinesComponent } from './medicines/medicines.component';
import { MedicineComponent } from './medicine/medicine.component';
import { MedicineAddEditComponent } from './medicine-add-edit/medicine-add-edit.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' }, 
  { path: 'medicines', component: MedicinesComponent, },
  { path: 'medicine/:id', component: MedicineComponent },
  { path: 'add', component: MedicineAddEditComponent },
  { path: 'medicine/edit/:id', component: MedicineAddEditComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
