import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { ComidaComponent } from './components/comida/comida.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { DueñoComponent } from './components/dueño/dueño.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormExComponent } from './components/forms/form-ex/form-ex.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatars';
import {MatDialogModule} from '@angular/material/dialog';
import { FormMascotasComponent } from './components/forms/form-mascotas/form-mascotas.component';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormComidasComponent } from './components/forms/form-comida/form-comida.component';
import { FormDueñosComponent } from './components/forms/form-duenios/form-duenios.component';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ComidaComponent,
    MascotasComponent,
    DueñoComponent,
    FormExComponent,
    FormMascotasComponent,
    FormComidasComponent,
    FormDueñosComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    AvatarModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
