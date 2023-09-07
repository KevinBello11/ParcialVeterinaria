import { Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-dueno',
  templateUrl: './dueno.component.html',
  styleUrls: ['./dueno.component.css']
})
export class DuenoComponent implements OnInit{

  tituloDueno = "Dueño";
  constructor(public apiService: ApiService) {
    
  }
  ngOnInit(): void {
    this.apiService.Get("Dueño");
  }
  
}
