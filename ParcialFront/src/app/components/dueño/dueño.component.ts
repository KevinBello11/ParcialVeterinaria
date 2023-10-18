import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/Services/api.service';
import { FormDueñosComponent } from '../forms/form-duenios/form-duenios.component';

@Component({
  selector: 'app-dueño',
  templateUrl: './dueño.component.html',
  styleUrls: ['./dueño.component.css']
})
export class DueñoComponent implements OnInit{

  displayedColumns: string[] = ['Nombre', 'Apellido', 'Telefono', 'Direccion'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;

  columnHeaders = {
    Nombre: 'Nombre',
    Apellido: 'Apellido',
    Telefono: 'Telefono',
    Direccion: 'Direccion',
  };

  constructor(public apiService: ApiService, public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.apiService.Get("Dueño").then((res)=>{
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
    this.dialog.open(FormDueñosComponent, { 
      width: '60%',
    });
  }

  removeMascota(dueño) {
    this.apiService.delete('Dueños', dueño.idDueño).then(res=>{this.ngOnInit()});
  }

}

