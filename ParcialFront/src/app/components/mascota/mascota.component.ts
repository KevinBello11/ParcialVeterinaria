import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.css']
})
export class MascotaComponent implements OnInit {

  tituloMascota = "Mascota";
  constructor(public apiService: ApiService) {
    
  }
  ngOnInit(): void {
    this.apiService.Get("Mascota");
  }
  
}
