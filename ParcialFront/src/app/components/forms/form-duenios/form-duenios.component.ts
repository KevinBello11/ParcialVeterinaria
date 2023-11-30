import { Component, Inject, OnInit, inject } from '@angular/core';
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
export class FormDueniosComponent implements OnInit {
  private fb = inject(FormBuilder);
  dueniosForm = this.fb.group({
    Nombre: [null, [Validators.required, Validators.maxLength(30)]],
    Tipo: [null, [Validators.required, Validators.max(60)]],
    Precio: [null, [Validators.required, Validators.maxLength(20)]],
    Descripcion: [null, [Validators.required, Validators.maxLength(20)]],
  });
  dataSource: any;

  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    public modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any // Utiliza MAT_DIALOG_DATA para obtener los datos
  ) {
    this.dataSource = new MatTableDataSource();

    if (data) {
      this.dueniosForm.setValue({
        Nombre: data.nombre,
        Tipo: data.tipo,
        Precio: data.precio,
        Descripcion: data.descripcion,
      });
      this.idData = data.id
      this.titulo = this.modalService.titulo;
      this.acciones = this.modalService.acciones.value;
    }
  }

  infoduenios: dueniosModels = {
    Nombre: "",
    Apellido: "",
    Telefono: 0,
    Direccion: "",
  };

  titulo = ""
  acciones = ""
  idData = ""

  ngOnInit(): void {
    this.titulo = this.modalService.titulo
    this.acciones = this.modalService.acciones.value
  }

  onSubmit(): void {
    this.titulo = this.modalService.titulo
    this.acciones = this.modalService.acciones.value

    if (this.dueniosForm.valid) {
      this.infoduenios.Nombre = this.dueniosForm.controls['Nombre'].value;
      this.infoduenios.Apellido = this.dueniosForm.controls['Apellido'].value;
      this.infoduenios.Telefono = this.dueniosForm.controls['Telefono'].value;
      this.infoduenios.Direccion = this.dueniosForm.controls['Direccion'].value;

      this.dialog.closeAll();
      if (this.acciones == "Editar") {
        var editarComida = {
          Nombre: this.infoduenios.Nombre,
          Apellido: this.infoduenios.Apellido,
          Telefono: this.infoduenios.Telefono,
          Direccion: this.infoduenios.Direccion,
          id: this.idData,
        }
        console.log(editarComida);

        this.apiService.update('Duenio', editarComida, this.idData).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Edicion Realizada',
              text: 'El duenio ha sido actualizado ',
              icon: 'success',
              color: '#716add',
            }).then(result=>{
              if (result.isConfirmed){
                window.location.reload()
              }
            })
          }
        }).catch(error => {
          Swal.fire(
            `Status error ${error.status}`,
            `Message: ${error.message}`,
            `error`
          )
        })
      } else if (this.acciones == "Crear") {
        this.apiService.post('Duenios', this.infoduenios).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Creacion Realizada',
              text: 'El dueño ha sido creada',
              icon: 'success',
              color: '#716add',
            })
          }
        }).catch(error => {
          Swal.fire(
            `Status error ${error.status}`,
            `Message: ${error.message}`,
            `error`
          )
        })
      }
    } else {
      Swal.fire(
        'Ingresar los datos',
        'Por favor ingrese todos los campos requeridos',
        'error'
      )
    }
  }
}
