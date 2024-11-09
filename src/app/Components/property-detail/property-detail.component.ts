import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
  standalone:true,
  imports:[RouterModule]
})
export class PropertyDetailComponent implements OnInit {

 propertyId=signal<number>(0);   // Inicializamos signal con un valor por defecto

  constructor(private route:ActivatedRoute, private router:Router  ) { }

  ngOnInit() {


    this.route.params.subscribe(params=>{
      this.propertyId.set(Number(params['id']));
    });

  }
    onSelectNext(){
      // Actualizamos el valor del signal usando update
      this.propertyId.update(currentId=>currentId+1);
      this.router.navigate(['property-detail', this.propertyId()]);
    }
  }


