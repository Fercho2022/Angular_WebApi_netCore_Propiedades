import { HousingService } from './../../Services/housing.service';
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
import { Property } from '../../Interfaces/property';
import { ToastrService } from 'ngx-toastr';

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
  property=new Property();


  addPropertyForm!:FormGroup;
  propertyTypes: Array<string> = ['Casa', 'Departamento', 'Duplex'];
  furnishTypes: Array<string> = ['Completo', 'Semi Completo', 'Desamoblado'];
  cardinalTypes: Array<string> = ['Este', 'oeste', 'Norte', 'Sur'];
cityList!:string[];

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
    RTM: null,
    PossesionOn:''

  }





  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _housingService:HousingService,
    private toastr:ToastrService
) {}

  ngOnInit() {
    this.CreatedAddPropertyForm();
    this._housingService.getAllCities().subscribe(data=>{
      this.cityList=data}
    );
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
      BuiltArea:[null, Validators.required],
      CarpetArea: [null],
      Security: [0],
      Maintenance: [0],
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

   //region <Form Controls>
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
  get Security(){
    return this.PriceInfo.controls['Security'] as FormControl;
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
  get CarpetArea(){
    return this.PriceInfo.controls['CarpetArea'] as FormControl;
  }
  get Maintenance(){
    return this.PriceInfo.controls['Maintenance'] as FormControl;
  }
  get Address(){
    return this.AddressInfo.controls['Address'] as FormControl;
  }
  get FloorNo(){
    return this.AddressInfo.controls['FloorNo'] as FormControl;
  }
  get TotalFloor(){
    return this.AddressInfo.controls['TotalFloor'] as FormControl;
  }
  get LandMark(){
    return this.AddressInfo.controls['LandMark'] as FormControl;
  }
  get RTM(){
    return this.OtherInfo.controls['RTM'] as FormControl;
  }
  get Gated(){
    return this.OtherInfo.controls['Gated'] as FormControl;
  }
  get MainEntrance(){
    return this.OtherInfo.controls['MainEntrance'] as FormControl;
  }
  get PossesionOn(){
    return this.OtherInfo.controls['PossesionOn'] as FormControl;
  }

  get Description(){
    return this.OtherInfo.controls['Description'] as FormControl;
  }
  get AOP(){
    return this.OtherInfo.controls['AOP'] as FormControl;
  }
  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.nextClicked=true;
    if(this.allTabsValid()){
      this.mapProperty();
      this._housingService.addProperty(this.property);
      this.toastr.success('Felicitaciones, tu propiedad fue registrada con éxito en nuestro sitio web');

    }else{
      this.toastr.error('Por favor revisa el formulario y proveer de todas las entradas válidas');
    }
    console.log(this.addPropertyForm);
    if(this.VentaAlquiler.value==2){
      this.router.navigate(['/rent-property']);
    }else{
      this.router.navigate([]);
    }
  }

  mapProperty():void{
    this.property.Id=this._housingService.newPropId();
    this.property.VentaAlquiler=+this.VentaAlquiler.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Image= "house_default";
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloors = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Description = this.Description.value;
    this.property.PossesionOn = this.PossesionOn.value;
    this.property.PostedOn = new Date().toString();

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
