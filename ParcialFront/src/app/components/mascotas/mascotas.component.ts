import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/Services/api.service';
import { FormMascotasComponent } from '../forms/form-mascotas/form-mascotas.component';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/modal/modal.service';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent implements OnInit{

    displayedColumns: string[] = ['nombre', 'raza', 'especie', 'fechaNacimiento', 'acciones'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: MatTableDataSource<any>;

    columnHeaders = {

      nombre: 'Nombre',
      especie: 'Especie',
      raza: 'Raza',
      fechaNacimiento: 'Fecha de Nacimiento',
      acciones: 'Acciones',
    };
  
    accion: string = "Crear Mascota";

    constructor(public apiService: ApiService, public dialog: MatDialog, public modalService: ModalService) {
      this.dataSource = new MatTableDataSource()
    }
  
    ngOnInit(): void {
      this.apiService.Get('Mascotas').then(res=>{
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
      this.dialog.open(FormMascotasComponent, {
        width: '60%',
      });
    }
  
    editarMascota(element: any) {
      this.modalService.acciones.next("Editar Mascotas");
      this.accion = "Editar Dueño";  
  
      this.dialog.open(FormMascotasComponent, {
        height: 'auto',
        width: 'auto',
        data: element // El objeto 'element' ahora contiene los datos del dueño a editar
      });
    }
  
    removeMascota(duenio) {
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
          this.apiService.delete('Mascotas', duenio.id).then((res) => {
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