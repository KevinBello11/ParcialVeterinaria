import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from 'src/app/modal/modal.service';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/Services/api.service';
import { FormComidasComponent } from '../forms/form-comidas/form-comidas.component';


@Component({
  selector: 'app-comidas',
  templateUrl: './comidas.component.html',
  styleUrls: ['./comidas.component.css'],
})
export class ComidasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'tipo', 'precio', 'descripcion', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnHeaders = {
    nombre: 'Nombre',
    tipo: 'Tipo',
    precio: 'Precio',
    descripcion: 'Descripción',
    acciones: 'Acciones',
  };

  acciones: string = 'Crear';

  constructor(public apiService: ApiService, public dialog: MatDialog, public modalService: ModalService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    
    this.apiService.Get('Comidas').then(res=> {
      return  this.dataSource.data = res;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog() {
    this.modalService.acciones.next(this.acciones);
    this.dialog.open(FormComidasComponent, {
      width: '60%',
    });
  }

  editarComida(element: any) {
    this.modalService.acciones.next("Editar");
    this.acciones = "Editar";  

    this.dialog.open(FormComidasComponent, {
      height: 'auto',
      width: 'auto',
      data: element // El objeto 'element' ahora contiene los datos del dueño a editar
    });
  }

  removeComida(comida) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la comida. No podrás deshacerla.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.delete('Comidas', comida.id).then((res) => {
          this.ngOnInit();
          Swal.fire('Comida Eliminada', 'la comida ha sido eliminada.', 'success');
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
