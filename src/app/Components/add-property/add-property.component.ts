import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-add-property',
  standalone: true,
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
  imports: [FormsModule, CommonModule, TabsModule, BsDatepickerModule],
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('Form') addPropertyForm!: NgForm;
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;

  propertyTypes: Array<string> = ['Casa', 'Departamento', 'Duplex'];
  furnishTypes: Array<string> = ['Completo', 'Semi Completo', 'Desamueblado'];
  cardinalTypes: Array<string> = ['Este', 'oeste', 'Norte', 'Sur'];
  propertyView={};

  constructor(private router: Router) {}

  ngOnInit() {}

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    console.log('Congrats,  form Submited');
    console.log(this.addPropertyForm);
  }

  selectTab(tabId: number) {
    this.staticTabs!.tabs[tabId].active = true;
  }
}
