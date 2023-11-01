import { Component, OnInit, ViewChild, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/Services/api.service';
import { FormComidasComponent } from '../forms/form-comida/form-comida.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comidas',
  templateUrl: './comidas.component.html',
  styleUrls: ['./comidas.component.css']
})
export class ComidasComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'tipo', 'precio', 'descripcion', 'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  modalService: any;

  columnHeaders = {

    nombre:'Nombre',
    tipo: 'Tipo',
    precio: 'Precio',
    descripcion: 'Descripción',
    acciones: 'Acciones',
  };

  constructor(public apiService: ApiService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.apiService.Get("Comidas").then((res) => {
      this.dataSource.data = res;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  loadTable (data: any[]){
    this.displayedColumns=[];
    for (let column in data[0]) {
      this.displayedColumns.push(column);
    }
    this. displayedColumns.push('acciones');

  }

  openDialog() {
    this.modalService.accion.next("Crear Comida");
    this.dialog.open(FormComidasComponent, {
      height: 'auto',
      width: 'auto'
    });
  }

  editarComida(element: any) {
    this.modalService.acciones.next("Editar Comida");
    this.modalService.comida = element;
    this.dialog.open(FormComidasComponent, {
      height: 'auto',
      width: 'auto'
    });
  }

  removeComida(comida) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el producto. No podrás deshacerla.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.delete('Comidas', comida.id).then((res) => {
          this.ngOnInit();
          Swal.fire('Producto Eliminado', 'El producto ha sido eliminado.', 'success');
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
