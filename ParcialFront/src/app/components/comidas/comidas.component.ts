import { Component, OnInit, ViewChild, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/Services/api.service';
import { FormComidasComponent } from '../forms/form-comida/form-comida.component';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/modal/modal.service';

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

  columnHeaders = {

    nombre:'Nombre',
    tipo: 'Tipo',
    precio: 'Precio',
    descripcion: 'Descripción',
    acciones: 'Acciones',
  };

  accion: string = "Crear Comida";

  constructor(public apiService: ApiService, public dialog: MatDialog, public modalService: ModalService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.apiService.Get('Comidas').then(res=>{
      return this.dataSource.data = res;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadTable(data: any[]) {
    this.displayedColumns = [];
    for (let column in data[0]) {
      this.displayedColumns.push(column);
    }
    this.displayedColumns.push('acciones');

  }

  openDialog() {
    this.dialog.open(FormComidasComponent, {
      width: '60%',
    });
  }

  editarComida(element: any) {
    this.modalService.acciones.next("Editar Comida");
    this.modalService.comidas = element;
    this.dialog.open(FormComidasComponent, {
      height: 'auto',
      width: 'auto',
      data: element // El objeto 'element' ahora contiene los datos del dueño a editar
    });
  }

  removeComida(comida) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la mascota. No podrás deshacerla.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.delete('Comidas', comida.id).then((res) => {
          this.ngOnInit();
          Swal.fire('Comida Eliminada', 'La Comida ha sido eliminada.', 'success');
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
