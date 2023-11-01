import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/Services/api.service';
import { mascotasModels } from 'src/app/Models/mascotasModels';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-mascotas',
  templateUrl: './form-mascotas.component.html',
  styleUrls: ['./form-mascotas.component.css']
})
export class FormMascotasComponent {

  private fb = inject(FormBuilder);

  constructor(public dialog:MatDialog, public apiService: ApiService){}

  mascotasForm = this.fb.group({
    Nombre: [null, [Validators.required, Validators.maxLength(60)]], 
    Especie:  [null, [Validators.required, Validators.maxLength(30)]],
    Raza:  [null, [Validators.required, Validators.maxLength(30)]],
    Fecha: [new Date(), [Validators.required]],
  });

  infoMascotas: mascotasModels = {
    Nombre:"",
    Especie:"",
    Raza:"",
    FechaNacimiento: new Date (),
  };

  onSubmit(): void {
    if (this.mascotasForm.valid) {
      this.infoMascotas.Nombre = this.mascotasForm.controls['Nombre'].value;
      this.infoMascotas.Especie = this.mascotasForm.controls['Especie'].value;
      this.infoMascotas.Raza = this.mascotasForm.controls['Raza'].value;
      this.infoMascotas.FechaNacimiento = this.mascotasForm.controls['Fecha'].value;

      this.dialog.closeAll();
      this.apiService.post('Mascotas', this.infoMascotas).then(res=>{
        if (res == undefined) {
          Swal.fire({
            title: 'Creacion Realizada',
            text: 'La mascotas ha sido creada',
            icon: 'success',
            color: '#716add',
          })
        }
      }).catch(error=>{
        Swal.fire(
          `Status error ${error.status}`,
          `Message: ${error.message}`,
          `error`
        )
      })
    }else{
      Swal.fire(
        'Ingresar los datos',
        'Por favor ingrese todos los campos requeridos',
        'error'
      )
    }
  }
}
