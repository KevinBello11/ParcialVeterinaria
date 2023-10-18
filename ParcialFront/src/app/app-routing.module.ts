import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComidaComponent } from './components/comida/comida.component';
import { DueñoComponent } from './components/dueño/dueño.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { FormExComponent } from './components/forms/form-ex/form-ex.component';

const routes: Routes = [
  { path:"Comida", component:ComidaComponent},
  { path:"Dueño", component:DueñoComponent},
  { path:"Mascotas", component:MascotasComponent},
  { path:"form", component:FormExComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
