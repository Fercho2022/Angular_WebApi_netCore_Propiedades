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
  nextClicked!:boolean;

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
    RTM: ''

  }





  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.CreatedAddPropertyForm();
  }

  CreatedAddPropertyForm(){

this.addPropertyForm=this.fb.group({
  BasicInfo:this.fb.group({
      VentaAlquiler:['1', Validators.required],
      BHK: [null, Validators.required],
      PType:[null, Validators.required],
      FType: [null, Validators.required],
      Name:[null, Validators.required],
      City: [null, Validators.required]
  }),
  PriceInfo:this.fb.group({
      Price:[null, Validators.required],
      BuiltArea:[null, Validators.required]
}),
AddressInfo:this.fb.group({
  FloorNo:[null],
  TotalFloor:[null],
  Address:[null, Validators.required],
  LandMark:[null],
}),
OtherInfo: this.fb.group({
  RTM:[null, Validators.required],
  PossesionOn:[null],
  AOP:[null],
  Gated:[null],
  MainEntrance:[null],
  Description:[null]
})

});
  }
  //region Getter Methods
  //region FormGroups

  get BasicInfo(){
    return this.addPropertyForm.controls['BasicInfo'] as FormGroup
  }

  get PriceInfo(){
    return this.addPropertyForm.controls['PriceInfo'] as FormGroup
  }

get AddressInfo(){
    return this.addPropertyForm.controls['AddressInfo'] as FormGroup
  }
  get OtherInfo(){
    return this.addPropertyForm.controls['OtherInfo'] as FormGroup
  }

   //region Form Controls
  get VentaAlquiler(){
    return this.BasicInfo.controls['VentaAlquiler'] as FormControl;
  }

  get Name(){
    return this.BasicInfo.controls['Name'] as FormControl;
  }
  get City(){
    return this.BasicInfo.controls['City'] as FormControl;
  }
  get Price(){
    return this.PriceInfo.controls['Price'] as FormControl;
  }

  get PType(){
    return this.BasicInfo.controls['PType'] as FormControl;
  }

  get FType(){
    return this.BasicInfo.controls['FType'] as FormControl;
  }
  get BHK(){
    return this.BasicInfo.controls['BHK'] as FormControl;
  }
  get BuiltArea(){
    return this.PriceInfo.controls['BuiltArea'] as FormControl;
  }
  get Address(){
    return this.AddressInfo.controls['Address'] as FormControl;
  }
  get RTM(){
    return this.OtherInfo.controls['RTM'] as FormControl;
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.nextClicked=true;
    if(this.allTabsValid()){
      console.log('Felicitaciones, tu propiedad fue registrada con éxito en nuestro sitio web');

    }else{
      console.log('Por favor revisa el formulario y proveer de todas las entradas válidas');
    }
    console.log(this.addPropertyForm);
  }

  allTabsValid():boolean{
    if(this.BasicInfo.invalid){
      this.staticTabs!.tabs[0].active=true;
      return false;
     }
     if(this.PriceInfo.invalid){
      this.staticTabs!.tabs[1].active=true;
      return false;
     }
     if(this.AddressInfo.invalid){
      this.staticTabs!.tabs[2].active=true;
      return false;
     }
     if(this.OtherInfo.invalid){
      this.staticTabs!.tabs[3].active=true;
      return false;
     }

     return true;
  }

  selectTab(tabId: number, IsCurrentTabValid:boolean) {

    this.nextClicked=true;
    if(IsCurrentTabValid){
      this.staticTabs!.tabs[tabId].active = true;
    }

  }
}
