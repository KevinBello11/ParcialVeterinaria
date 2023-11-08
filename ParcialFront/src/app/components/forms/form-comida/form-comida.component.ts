import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { comidasModels } from 'src/app/Models/comidasModels';
import { ApiService } from 'src/app/Services/api.service';
import { ModalService } from 'src/app/modal/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-comida',
  templateUrl: './form-comida.component.html',
  styleUrls: ['./form-comida.component.css']
})
export class FormComidasComponent implements OnInit {
  comidasForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public apiService: ApiService,
    public modalService: ModalService
  ) {
    this.comidasForm = this.formBuilder.group({
      Nombre: ['', [Validators.required, Validators.maxLength(60)]],
      Tipo: ['', [Validators.required, Validators.maxLength(30)]],
      Precio: [0, [Validators.required]],
      Descripcion: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  infoComidas: comidasModels = {
    Nombre: '',
    Tipo: '',
    Precio: 0,
    Descripcion: '',
  };

  titulo=""
  acciones=""

  controller = 'Comidas';


  ngOnInit(): void {
    if (this.modalService.acciones.value == 'Editar Comida') {

      this.comidasForm.controls['Nombre'].setValue(
        this.modalService.comidas.Nombre + ''
      );
      this.comidasForm.controls['Tipo'].setValue(
        this.modalService.comidas.Tipo + ''
      );
      this.comidasForm.controls['Precio'].setValue(
        this.modalService.comidas.Precio + ''
      );
      this.comidasForm.controls['Descripcion'].setValue(
        this.modalService.comidas.Descripcion + ''
      );
    }
  }

  onSubmit(data: any) {
    if (this.modalService.acciones.value == 'Crear Comida') {
      this.infoComidas.Nombre = data.Nombre;
      this.infoComidas.Tipo = data.Tipo;
      this.infoComidas.Precio = Number(data.Precio);
      this.infoComidas.Descripcion = data.Descripcion;
      console.log(data);
  
      this.apiService.update(this.controller, data.Nombre, this.infoComidas).subscribe((resp) => {
        console.log(resp);
      });
      
    } else {
      this.infoComidas.Nombre = data.Nombre;
      this.infoComidas.Tipo = data.Tipo;
      this.infoComidas.Precio = Number(data.Precio);
      this.infoComidas.Descripcion = data.Descripcion;
  
      this.apiService.update(this.controller, data.Nombre, this.infoComidas).subscribe((resp) => {
        console.log(resp);
      });
    }
  }
}