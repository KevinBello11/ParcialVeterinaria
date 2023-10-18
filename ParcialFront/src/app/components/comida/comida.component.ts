import { Component, OnInit, ViewChild,} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/Services/api.service';
import { FormComidasComponent } from '../forms/form-comida/form-comida.component';


@Component({
  selector: 'app-comida',
  templateUrl: './comida.component.html',
  styleUrls: ['./comida.component.css']
})
export class ComidaComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Tipo', 'Precio', 'Descripcion', 'acciones'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: MatTableDataSource<any>;

    columnHeaders = {
      Nombre: 'Nombre',
      Tipo: 'Tipo',
      Precio: 'Precio',
      Descripcion: 'Descripcion',
    };

    constructor(public apiService: ApiService, public dialog:MatDialog) {
      this.dataSource = new MatTableDataSource();
    }
  
    ngOnInit(): void {
      this.apiService.Get("Comida").then((res)=>{
        for (let index = 0; index < res.length; index++) {
          this.loadTable([res[index]])
        }
        this.dataSource.data=res;
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort= this.sort;
        console.log(this.dataSource);
      })
    }
  
    loadTable (data: any[]){
      this.displayedColumns=[];
      for (let column in data[0]) {
        this.displayedColumns.push(column)
        
      }
  
    }
  
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    openDialog() {
      this.dialog.open(FormComidasComponent, { 
        width: '60%',
      });
    }

    removeMascota(dueño) {
      this.apiService.delete('Dueños', dueño.idDueño).then(res=>{this.ngOnInit()});
    }

}

