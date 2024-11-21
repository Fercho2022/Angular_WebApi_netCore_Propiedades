import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-add-property',
  standalone:true,
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
  imports:[FormsModule, CommonModule, TabsModule]
})
export class AddPropertyComponent implements OnInit {

  @ViewChild('Form') addPropertyForm!:NgForm;

  constructor(private router:Router) { }

  ngOnInit() {
  }


  onBack(){
    this.router.navigate(['/']);
  }

  onSubmit(){
    console.log('Congrats,  form Submited');
    console.log(this.addPropertyForm);
  }
}
