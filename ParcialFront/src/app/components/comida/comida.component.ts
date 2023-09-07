import { Component, OnInit,} from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-comida',
  templateUrl: './comida.component.html',
  styleUrls: ['./comida.component.css']
})
export class ComidaComponent implements OnInit {

  
  tituloComida = "Comida";
  constructor(public apiService: ApiService) {
    
  }
  ngOnInit(): void {
    this.apiService.Get("Comida");
  }
  
}