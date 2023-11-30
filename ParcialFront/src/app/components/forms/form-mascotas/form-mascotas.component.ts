import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/Services/api.service';
import { mascotasModels } from 'src/app/Models/mascotasModels';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/modal/modal.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-form-mascotas',
  templateUrl: './form-mascotas.component.html',
  styleUrls: ['./form-mascotas.component.css']
})
export class FormMascotasComponent {
  private fb = new FormBuilder(); 
  dataSource: any;

  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    public modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any // Utiliza MAT_DIALOG_DATA para obtener los datos
  ) {
    this.dataSource = new MatTableDataSource();

    if (data) {
      this.mascotasForm.setValue({
        Nombre: data.nombre, 
        Especie: data.especie, 
        Raza: data.raza, 
        Fecha: data.fechaNacimiento, // Establece la fecha
      });
      
      this.titulo = this.modalService.titulo;
      this.acciones = this.modalService.acciones.value;
    }
  }

  mascotasForm = this.fb.group({
    Nombre: [null, [Validators.required, Validators.maxLength(60)]], // Agrega validadores
    Especie:[null, [Validators.required, Validators.maxLength(30)]],
    Raza:  [null, [Validators.required, Validators.maxLength(30)]],
    Fecha: new FormControl(null, Validators.required),
  });

  infoMascotas: mascotasModels = {
    Nombre:"",
    Especie:"",
    Raza:"",
    FechaNacimiento: null,
  };

  titulo=""
  acciones=""

  onSubmit(): void {
    if (this.mascotasForm.valid) {
      this.infoMascotas.Nombre = this.mascotasForm.controls['Nombre'].value;
      this.infoMascotas.Especie = this.mascotasForm.controls['Especie'].value;
      this.infoMascotas.Raza = this.mascotasForm.controls['Raza'].value;
      this.infoMascotas.FechaNacimiento = this.mascotasForm.controls['Fecha'].value;

      this.dialog.closeAll();
      
      if (this.data) {
        // Si hay datos (edición), realiza una solicitud PUT
        this.apiService.update('Mascotas', this.infoMascotas, this.data.id).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Actualización Realizada',
              text: 'La mascota ha sido actualizada',
              icon: 'success',
              color: '#716add',
            });
          }
        }).catch(error => {
          Swal.fire(
            `Status error ${error.status}`,
            `Message: ${error.message}`,
            `error`
          );
        });
      } else {
        // Si no hay datos (creación), realiza una solicitud POST
        this.apiService.post('Mascotas', this.infoMascotas).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Creación Realizada',
              text: 'La mascota ha sido creada',
              icon: 'success',
              color: '#716add',
            });
          }
        }).catch(error => {
          Swal.fire(
            `Status error ${error.status}`,
            `Message: ${error.message}`,
            `error`
          );
        });
      }
    } else {
      Swal.fire(
        'Ingresar los datos',
        'Por favor ingrese todos los campos requeridos',
        'error'
      );
    }
  }
}
