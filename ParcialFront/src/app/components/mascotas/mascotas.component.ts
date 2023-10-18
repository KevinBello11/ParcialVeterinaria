import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/Services/api.service';
import { FormMascotasComponent } from '../forms/form-mascotas/form-mascotas.component';



@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent implements OnInit{

    displayedColumns: string[] = ['Nombre', 'Raza', 'Especie', 'FechaDeNacimiento', 'Dueño', 'Acciones'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: MatTableDataSource<any>;


    columnHeaders = {

      Nombre: 'Nombre',
      Especie: 'Especie',
      Raza: 'Raza',
      FechaDeNacimiento: 'Fecha de Nacimiento',
      Dueño: 'Dueño',
      Acciones: 'Acciones',
    };
  

    constructor(public apiService: ApiService, public dialog:MatDialog) {
      this.dataSource = new MatTableDataSource();
    }
  
    ngOnInit(): void {
      this.apiService.Get("Mascotas").then((res)=>{
        this.dataSource.data=res;
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
      this. displayedColumns.push('Acciones');
  
    }

    openDialog() {
      this.dialog.open(FormMascotasComponent, { 
        width: '60%',
      });
    }
    
    removeMascota(mascota) {
      this.apiService.delete('Mascotas', mascota.id).then(res=>{this.ngOnInit()});
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
}

