import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { dueñosModels } from 'src/app/Models/dueñosModels';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-duenios',
  templateUrl: './form-duenios.component.html',
  styleUrls: ['./form-duenios.component.css']
})
export class FormDueñosComponent {
  private fb = inject(FormBuilder);

  constructor(public dialog:MatDialog, public apiService: ApiService){}

  dueniosForm = this.fb.group({
    Nombre: [null, [Validators.required, Validators.maxLength(60)]], 
    Apellido:  [null, [Validators.required, Validators.maxLength(30)]],
    Telefono:  [null, [Validators.required, Validators.maxLength(30)]],
    Direccion: [null, [Validators.required, Validators.maxLength(60)]], 
  });

  infoDueños: dueñosModels = {
    Nombre:"",
    Apellido:"",
    Telefono: 0,
    Direccion: "",
  };

  onSubmit(): void {
    if (this.dueniosForm.valid) {
      this.infoDueños.Nombre = this.dueniosForm.controls['Nombre'].value;
      this.infoDueños.Apellido = this.dueniosForm.controls['Apellido'].value;
      this.infoDueños.Telefono = this.dueniosForm.controls['Telefono'].value;
      this.infoDueños.Direccion = this.dueniosForm.controls['Direccion'].value;

      this.dialog.closeAll();
      this.apiService.post('Dueños', this.infoDueños).then(res=>{
        if (res == undefined) {
          Swal.fire({
            title: 'Creacion Realizada',
            text: 'El duesño ha sido creada',
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
