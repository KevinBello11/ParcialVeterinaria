import { Component, OnInit, inject, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { comidasModels } from 'src/app/Models/comidasModels';
import { ApiService } from 'src/app/Services/api.service';
import { ModalService } from 'src/app/modal/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-comidas',
  templateUrl: './form-comidas.component.html',
  styleUrls: ['./form-comidas.component.css']
})
export class FormComidasComponent implements OnInit {
  private fb = inject(FormBuilder);
  comidasForm = this.fb.group({
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
      this.comidasForm.setValue({
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

  infocomidas: comidasModels = {
    Id: 0,
    Nombre: "",
    Tipo: "",
    Precio: 0,
    Descripcion: "",
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

    if (this.comidasForm.valid) {
      this.infocomidas.Nombre = this.comidasForm.controls['Nombre'].value;
      this.infocomidas.Tipo = this.comidasForm.controls['Tipo'].value;
      this.infocomidas.Precio = this.comidasForm.controls['Precio'].value;
      this.infocomidas.Descripcion = this.comidasForm.controls['Descripcion'].value;

      this.dialog.closeAll();
      if (this.acciones == "Editar") {
        var editarComida = {
          Nombre: this.infocomidas.Nombre,
          Tipo: this.infocomidas.Tipo,
          Precio: this.infocomidas.Precio,
          Descripcion: this.infocomidas.Descripcion,
          id: this.idData,
        }
        console.log(editarComida);

        this.apiService.update('Comidas', editarComida, this.idData).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Edicion Realizada',
              text: 'La comida ha sido actualizado ',
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
        this.apiService.post('Comidas', this.infocomidas).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Creacion Realizada',
              text: 'La comida ha sido creada',
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
