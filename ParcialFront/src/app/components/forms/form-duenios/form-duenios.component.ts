import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { dueniosModels } from 'src/app/Models/dueniosModels';
import { ApiService } from 'src/app/Services/api.service';
import { ModalService } from 'src/app/modal/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-duenios',
  templateUrl: './form-duenios.component.html',
  styleUrls: ['./form-duenios.component.css']
})
export class FormDueniosComponent {
  private fb = new FormBuilder(); // Usar "new FormBuilder()" en lugar de "inject(FormBuilder)"
  dataSource: any;

  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    public modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any // Utiliza MAT_DIALOG_DATA para obtener los datos
  ) {
    this.dataSource = new MatTableDataSource();

    if (data) {
      this.dueniosForms.setValue({
        Nombre: data.nombre,
        Apellido: data.apellido,
        Telefono: data.telefono,
        Direccion: data.direccion,
      });

      this.titulo = this.modalService.titulo;
      this.acciones = this.modalService.acciones.value;
    }
  }

  dueniosForms = this.fb.group({
    Nombre: [null, [Validators.required, Validators.maxLength(30)]],
    Apellido: [null, [Validators.required, Validators.maxLength(30)]],
    Telefono: [null, [Validators.required, Validators.maxLength(10)]],
    Direccion: [null, [Validators.required, Validators.maxLength(80)]],
  });

  infoDuenios: dueniosModels = {
    Nombre: "",
    Apellido: "",
    Telefono: 0,
    Direccion: "",
  };

  titulo = "";
  acciones = "";

  onSubmit(): void {
    this.titulo = this.modalService.titulo;
    this.acciones = this.modalService.acciones.value;

    if (this.dueniosForms.valid) {
      this.infoDuenios.Nombre = this.dueniosForms.get('Nombre').value;
      this.infoDuenios.Apellido = this.dueniosForms.get('Apellido').value;
      this.infoDuenios.Telefono = this.dueniosForms.get('Telefono').value;
      this.infoDuenios.Direccion = this.dueniosForms.get('Direccion').value;

      if (this.acciones === "Crear Dueño") {
        // Modo de creación
        this.apiService.create('Duenios', this.infoDuenios).subscribe((res: any) => {
          Swal.fire({
            title: 'Creación Realizada',
            text: 'El dueño ha sido creado',
            icon: 'success',
            color: '#716add',
          });
          this.dialog.closeAll();
        }, (error) => {
          Swal.fire(
            'Error',
            'Hubo un error al crear el dueño',
            'error'
          );
        });
      } else if (this.acciones === "Editar Dueño") {
        // Modo de edición
        // Aquí debes llamar a la función que actualiza los datos existentes en lugar de crear uno nuevo
        this.apiService.update('Duenios', this.data.id, this.infoDuenios).subscribe((res: any) => {
          Swal.fire({
            title: 'Actualización Realizada',
            text: 'El dueño ha sido actualizado',
            icon: 'success',
            color: '#716add',
          });
          this.dialog.closeAll();
        }, (error) => {
          Swal.fire(
            'Error',
            'Hubo un error al actualizar el dueño',
            'error'
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
