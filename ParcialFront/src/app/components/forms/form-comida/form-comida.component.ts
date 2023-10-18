import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { comidasModels } from 'src/app/Models/comidasModels';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-comida',
  templateUrl: './form-comida.component.html',
  styleUrls: ['./form-comida.component.css']
})
export class FormComidasComponent {
  private fb = inject(FormBuilder);

  constructor(public dialog:MatDialog, public apiService: ApiService){}

  comidasForm = this.fb.group({
    Nombre: [null, [Validators.required, Validators.maxLength(60)]], 
    Tipo:  [null, [Validators.required, Validators.maxLength(30)]],
    Precio:  [null, [Validators.required, Validators.maxLength(30)]],
    Descripcion: [null, [Validators.required, Validators.maxLength(30)]],
  });

  infoComidas: comidasModels = {
    Nombre:"",
    Tipo:"",
    Precio:0,
    Descripcion: "",
  };

  onSubmit(): void {
    if (this.comidasForm.valid) {
      this.infoComidas.Nombre = this.comidasForm.controls['Nombre'].value;
      this.infoComidas.Tipo = this.comidasForm.controls['Tipo'].value;
      this.infoComidas.Precio = this.comidasForm.controls['Precio'].value;
      this.infoComidas.Descripcion = this.comidasForm.controls['Descripcion'].value;

      this.dialog.closeAll();
      this.apiService.post('Comidas', this.infoComidas).then(res=>{
        if (res == undefined) {
          Swal.fire({
            title: 'Creacion Realizada',
            text: 'La comida ha sido creada',
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

