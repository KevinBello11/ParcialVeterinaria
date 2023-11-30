import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/Services/api.service';
import { FormDueniosComponent } from '../forms/form-duenios/form-duenios.component';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/modal/modal.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-duenios',
  templateUrl: './duenios.component.html',
  styleUrls: ['./duenios.component.css']
})
export class DueniosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'telefono', 'direccion', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnHeaders = {
    nombre: 'Nombre',
    apellido: 'Apellido',
    telefono: 'Teléfono',
    direccion: 'Dirección',
    acciones: 'Acciones',
  };

  acciones: string = 'Crear';

  constructor(public apiService: ApiService, public dialog: MatDialog, public modalService: ModalService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    
    this.apiService.Get('Duenios').then(res=> {
      return  this.dataSource.data = res;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog() {
    this.modalService.acciones.next(this.acciones);
    this.dialog.open(FormDueniosComponent, {
      width: '60%',
    });
  }

  editarDuenio(element: any) {
    this.modalService.acciones.next("Editar");
    this.acciones = "Editar";  

    this.dialog.open(FormDueniosComponent, {
      height: 'auto',
      width: 'auto',
      data: element // El objeto 'element' ahora contiene los datos del dueño a editar
    });
  }

  removeDuenio(duenio) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el duenño. No podrás deshacerla.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.delete('Duenios', duenio.id).then((res) => {
          this.ngOnInit();
          Swal.fire('Dueño', 'el dueño ha sido eliminado.', 'success');
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