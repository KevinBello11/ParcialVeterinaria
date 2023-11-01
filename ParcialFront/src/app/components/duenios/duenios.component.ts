import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/Services/api.service';
import { FormDueniosComponent } from '../forms/form-duenios/form-duenios.component';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/modal/modal.service';

@Component({
  selector: 'app-duenios',
  templateUrl: './duenios.component.html',
  styleUrls: ['./duenios.component.css']
})
export class DueniosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'telefono', 'direccion', 'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;


  columnHeaders = {

    nombre: 'Nombre',
    apellido: 'Apellido',
    telefono: 'Teléfono',
    direccion: 'Dirección',
    acciones: 'Acciones',
  };

  accion: string = "Crear Dueño";


  constructor(public apiService: ApiService, public dialog: MatDialog, public modalService: ModalService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.apiService.Get("Duenios").then((res) => {
      this.dataSource.data = res;
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
    this.modalService.acciones.next("Crear Dueño");
    this.accion = "Crear Dueño";
    this.dialog.open(FormDueniosComponent, {
      height: 'auto',
      width: 'auto'
    });
  }
  
  editarDuenio(element: any) {
    this.modalService.acciones.next("Editar Dueño");
    this.modalService.duenios = element;
    this.accion = "Editar Dueño";
    this.dialog.open(FormDueniosComponent, {
      height: 'auto',
      width: 'auto',
      data: element // Pasa los datos del dueño como entrada
    });
  }
  
  removeDuenios(duenio) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el dueño. No podrás deshacerla.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.delete('Duenios', duenio.id).then((res) => {
          this.ngOnInit();
          Swal.fire('Dueño Eliminado', 'El dueño ha sido eliminado.', 'success');
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