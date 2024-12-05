import { Component, OnInit, Signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IProperty } from '../../Interfaces/IProperty';
import { CardComponent } from "../Card/card.component";
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { IPropertyBase } from '../../Interfaces/IPropertyBase';

@Component({
  selector: 'app-add-property',
  standalone: true,
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
  imports: [ReactiveFormsModule, CommonModule, TabsModule, BsDatepickerModule, CardComponent, ButtonsModule,],
})
export class AddPropertyComponent implements OnInit {
  //@ViewChild('Form') addPropertyForm!: NgForm;
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;
  NextClicked!:boolean;

  addPropertyForm!:FormGroup;
  propertyTypes: Array<string> = ['Casa', 'Departamento', 'Duplex'];
  furnishTypes: Array<string> = ['Completo', 'Semi Completo', 'Desamueblado'];
  cardinalTypes: Array<string> = ['Este', 'oeste', 'Norte', 'Sur'];

  propertyView: IPropertyBase={
    Id: null,
    VentaAlquiler: null,
    Name: '',
    PType: '',
    Price: null,
    Image: 'house_default',
    FType: '',
    BHK: null,
    BuiltArea: null,
    City: '',

  }





  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.CreatedAddPropertyForm();
  }

  CreatedAddPropertyForm(){

this.addPropertyForm=this.fb.group({
  BasicInfo:this.fb.group({
      VentaAlquiler:[null, Validators.required],
      BHK: [null, Validators.required],
      PType:[null, Validators.required],
      FType: [null, Validators.required],
      Name:[null, Validators.required],
      City: [null, Validators.required]
  }),
  PriceInfo:this.fb.group({
      Price:[null, Validators.required],
      BuiltArea:[null, Validators.required]
})

});
  }

  get BasicInfo(){
    return this.addPropertyForm.controls['BasicInfo'] as FormGroup
  }

  get PriceInfo(){
    return this.addPropertyForm.controls['PriceInfo'] as FormGroup
  }

  get VentaAlquiler(){
    return this.BasicInfo.controls['VentaAlquiler'] as FormControl;
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    console.log('Congrats,  form Submited');
    console.log(this.addPropertyForm);
  }

  selectTab(tabId: number, IsCurrentTabValid:boolean) {

    this.staticTabs!.tabs[tabId].active = true;
  }
}
