import { Component, Inject, Input, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { comidasModels } from 'src/app/Models/comidasModels';
import { ApiService } from 'src/app/Services/api.service';
import { ModalService } from 'src/app/modal/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-comida',
  templateUrl: './form-comida.component.html',
  styleUrls: ['./form-comida.component.css']
})
export class FormComidasComponent {
  private fb = inject(FormBuilder);
  dataSource: any;

  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    public modalService: ModalService // Utiliza MAT_DIALOG_DATA para obtener los datos
  ) { }

  comidasForm = this.fb.group({
    Nombre: [null, [Validators.required, Validators.maxLength(60)]],
    Tipo: [null, [Validators.required, Validators.maxLength(30)]],
    Precio: [null, [Validators.required, Validators.maxLength(30)]],
    Descripcion: [null, [Validators.required, Validators.maxLength(30)]],
  });

  infoComidas: comidasModels = {
    Nombre: "",
    Tipo: "",
    Precio: 0,
    Descripcion: "",

  };

  controller = 'Comidas';

  titulo = ""
  acciones = ""

  onSubmit(): void {
    this.titulo=this.modalService.titulo
    this.acciones=this.modalService.acciones.value

    if (this.comidasForm.valid) {
      this.infoComidas.Nombre = this.comidasForm.controls['Nombre'].value;
      this.infoComidas.Tipo = this.comidasForm.controls['Apellido'].value;
      this.infoComidas.Precio = this.comidasForm.controls['Telefono'].value;
      this.infoComidas.Descripcion = this.comidasForm.controls['Direccion'].value;

      this.dialog.closeAll();
      this.apiService.post('Comidas', this.infoComidas).then(res => {
        if (res === undefined) {
          Swal.fire({
            title: 'Creación Realizada',
            text: 'La comida ha sido creada',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          });
        }
      }).catch(error => {
        Swal.fire({
          title: `Error de estado ${error.status}`,
          text: `Mensaje: ${error.message}`,
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-danger',
          },
        });
      });
    } else {
      Swal.fire({
        title: 'Ingresar los datos',
        text: 'Por favor ingrese todos los campos requeridos',
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      });
    }
  }
}
