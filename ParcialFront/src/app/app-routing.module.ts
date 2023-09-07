import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComidaComponent } from './components/comida/comida.component';
import { DuenoComponent } from './components/dueno/dueno.component';
import { MascotaComponent } from './components/mascota/mascota.component';

const routes: Routes = [
  { path:"Comida", component:ComidaComponent},
  { path:"Dueno", component:DuenoComponent},
  { path:"Mascota", component:MascotaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
