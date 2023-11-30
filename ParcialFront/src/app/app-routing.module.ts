import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { ComidasComponent } from './components/comidas/comidas.component';
import { DueniosComponent } from './components/duenios/duenios.component';

const routes: Routes = [
  { path:"Comidas", component:ComidasComponent},
  { path:"Mascotas", component:MascotasComponent},
  { path:"Duenios", component:DueniosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
