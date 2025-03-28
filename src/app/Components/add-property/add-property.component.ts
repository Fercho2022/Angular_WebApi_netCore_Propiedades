import { HousingService } from './../../Services/housing.service';
import { Component, OnInit, Signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IProperty } from '../../Interfaces/IProperty';
import { CardComponent } from '../Card/card.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { IPropertyBase } from '../../Interfaces/IPropertyBase';
import { Property } from '../../Interfaces/property';
import { ToastrService } from 'ngx-toastr';
import { IKeyValueTypes } from '../../Interfaces/IKeyValueTypes';
import { CLIENT_RENEG_LIMIT } from 'node:tls';

@Component({
  selector: 'app-add-property',
  standalone: true,
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TabsModule,
    BsDatepickerModule,
    CardComponent,
    ButtonsModule,
  ],
})
export class AddPropertyComponent implements OnInit {
  //@ViewChild('Form') addPropertyForm!: NgForm;
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;
  nextClicked!: boolean;
  property = new Property();

  addPropertyForm!: FormGroup;
  propertyTypes: IKeyValueTypes[] = [];
  furnishingTypes: IKeyValueTypes[] = [];
  cardinalTypes: Array<string> = ['Este', 'oeste', 'Norte', 'Sur'];
  cityList!: any[];

  propertyView: IPropertyBase = {
    id: null,
    sellRent: null,
    name: '',
    propertyType: '',  // Inicializado como string vacío
    price: null,
    image: 'house_default',
    furnishingType: '',  // Inicializado como string vacío
    bhk: null,
    builtArea: null,
    carpetArea: null,
    security: null,
    maintenance: null,
    city: '',  // Inicializado como string vacío
    readyToMove: null,
    estPossessionOn: '',
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _housingService: HousingService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.CreatedAddPropertyForm();

    // Suscribirse a los cambios del formulario
    this.Name.valueChanges.subscribe((value) => {
      this.propertyView.name = value;
    });

    // Añadir estas suscripciones para mantener la vista previa actualizada
    this.Price.valueChanges.subscribe((value) => {
      this.propertyView.price = value;
    });

    this.BuiltArea.valueChanges.subscribe((value) => {
      this.propertyView.builtArea = value;
    });

    this.CarpetArea.valueChanges.subscribe((value) => {
      // Añadir esta propiedad a IPropertyBase si no existe
      this.propertyView.carpetArea = value;
    });

    this.Security.valueChanges.subscribe((value) => {
      // Añadir esta propiedad a IPropertyBase si no existe
      this.propertyView.security = value;
    });

    this.Maintenance.valueChanges.subscribe((value) => {
      // Añadir esta propiedad a IPropertyBase si no existe
      this.propertyView.maintenance = value;
    });

    this.PType.valueChanges.subscribe(value => {
      const selectedPType = this.propertyTypes.find(pt => pt.id === value);
      if (selectedPType) {
        this.propertyView.propertyType = selectedPType.name;
      }
    });

    this.City.valueChanges.subscribe(value => {
      const selectedCity = this.cityList.find(city => city.name === value);
      if (selectedCity) {
        this.propertyView.city = selectedCity.name;
      }
    });

    this.FType.valueChanges.subscribe(value => {
      const selectedFType = this.furnishingTypes.find(ft => ft.id === value);
      if (selectedFType) {
        this.propertyView.furnishingType = selectedFType.name;
      }
    });

    this.addPropertyForm.valueChanges.subscribe((values) => {
      this.updatePropertyView(values);
    });

    // Obtener tipos de propiedades
  this._housingService.getAllPropertyTypes().subscribe(
    data => {
      this.propertyTypes = data;

    }

  );

  // Obtener tipos de amueblamiento
  this._housingService.getAllFurnishingTypes().subscribe(
    data => {
      this.furnishingTypes = data;

    }

  );

  // Obtener la lista de ciudades
  this._housingService.getAllCities().subscribe(
    data => {
      this.cityList = data;

    }

  );
  }

  updatePropertyView(values: any) {
    const basicInfo = values.BasicInfo;
    const priceInfo = values.PriceInfo;
    const otherInfo = values.OtherInfo;

    if (basicInfo) {
      // Venta o Alquiler
      if (basicInfo.VentaAlquiler !== undefined) {
        this.propertyView.sellRent = basicInfo.VentaAlquiler === '1' ? 'Venta' : 'Alquiler';
      }

      // Nombre de la propiedad
      if (basicInfo.Name !== undefined) {
        this.propertyView.name = basicInfo.Name;
      }

      // Tipo de propiedad
      if (basicInfo.PType !== undefined) {
        const selectedPType = this.propertyTypes.find(
          (pt) => pt.id === basicInfo.PType
        );
        if (selectedPType) {
          this.propertyView.propertyType = selectedPType.name;
        }
      }

      // Ciudad
      if (basicInfo.City !== undefined) {
        const selectedCity = this.cityList.find(
          (city) => city.id === basicInfo.City
        );
        if (selectedCity) {
          this.propertyView.city = `${selectedCity.name} (${selectedCity.country})`;
        }
      }

      // BHK (mantener como número)
      if (basicInfo.BHK !== undefined) {
        this.propertyView.bhk = basicInfo.BHK;
      }

      // Tipo de amueblamiento
      if (basicInfo.FType !== undefined) {
        const selectedFType = this.furnishingTypes.find(
          (ft) => ft.id === basicInfo.FType
        );
        if (selectedFType) {
          this.propertyView.furnishingType = selectedFType.name;
        }
      }
    }

    // Precio y área
    if (priceInfo) {
      if (priceInfo.Price !== undefined)
        this.propertyView.price = priceInfo.Price;
      if (priceInfo.BuiltArea !== undefined)
        this.propertyView.builtArea = priceInfo.BuiltArea;
      if (priceInfo.CarpetArea !== undefined)
        this.propertyView.carpetArea = priceInfo.CarpetArea;
      if (priceInfo.Security !== undefined)
        this.propertyView.security = priceInfo.Security;
      if (priceInfo.Maintenance !== undefined)
        this.propertyView.maintenance = priceInfo.Maintenance;
    }

    // Otros detalles
    if (otherInfo) {
      // Listo para mudarse
      if (otherInfo.RTM !== undefined) {
        this.propertyView.readyToMove = otherInfo.RTM;
      }
    }
  }

  CreatedAddPropertyForm() {
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        VentaAlquiler: ['1', Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required],
      }),
      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [null],
        Maintenance: [null],
      }),
      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),
      OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PossesionOn: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null],
      }),
    });
  }
  //region Getter Methods
  //region FormGroups

  get BasicInfo() {
    return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
  }

  get PriceInfo() {
    return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
  }

  get AddressInfo() {
    return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
  }
  get OtherInfo() {
    return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
  }

  //region <Form Controls>
  get VentaAlquiler() {
    return this.BasicInfo.controls['VentaAlquiler'] as FormControl;
  }

  get Name() {
    return this.BasicInfo.controls['Name'] as FormControl;
  }
  get City() {
    return this.BasicInfo.controls['City'] as FormControl;
  }

  get Price() {
    return this.PriceInfo.controls['Price'] as FormControl;
  }
  get Security() {
    return this.PriceInfo.controls['Security'] as FormControl;
  }

  get PType() {
    return this.BasicInfo.controls['PType'] as FormControl;
  }

  get FType() {
    return this.BasicInfo.controls['FType'] as FormControl;
  }
  get BHK() {
    return this.BasicInfo.controls['BHK'] as FormControl;
  }
  get BuiltArea() {
    return this.PriceInfo.controls['BuiltArea'] as FormControl;
  }
  get CarpetArea() {
    return this.PriceInfo.controls['CarpetArea'] as FormControl;
  }
  get Maintenance() {
    return this.PriceInfo.controls['Maintenance'] as FormControl;
  }
  get Address() {
    return this.AddressInfo.controls['Address'] as FormControl;
  }
  get FloorNo() {
    return this.AddressInfo.controls['FloorNo'] as FormControl;
  }
  get TotalFloor() {
    return this.AddressInfo.controls['TotalFloor'] as FormControl;
  }
  get LandMark() {
    return this.AddressInfo.controls['LandMark'] as FormControl;
  }
  get RTM() {
    return this.OtherInfo.controls['RTM'] as FormControl;
  }
  get Gated() {
    return this.OtherInfo.controls['Gated'] as FormControl;
  }
  get MainEntrance() {
    return this.OtherInfo.controls['MainEntrance'] as FormControl;
  }
  get PossesionOn() {
    return this.OtherInfo.controls['PossesionOn'] as FormControl;
  }

  get Description() {
    return this.OtherInfo.controls['Description'] as FormControl;
  }
  get AOP() {
    return this.OtherInfo.controls['AOP'] as FormControl;
  }
  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.nextClicked = true;
    if (this.allTabsValid()) {

      this.mapProperty();
      console.log('por aca estoy pasando')
      console.log(this.property);
      this._housingService.addProperty(this.property).subscribe((data) => {
        this.toastr.success(
          'Felicitaciones, tu propiedad fue registrada con éxito en nuestro sitio web'
        );
        console.log(data);
        console.log(this.addPropertyForm);
        if (this.VentaAlquiler.value == 2) {
          this.router.navigate(['/rent-property']);
        } else {
          this.router.navigate([]);
        }
      },
    (error)=>{
      console.log('no se esta agregando')
    });
    }else{
      this.toastr.error(
        'No se pudo registrar con exito'
      );
    }
  }

  mapProperty(): void {
    this.property.id = this._housingService.newPropId();
    this.property.sellRent = +this.VentaAlquiler.value;
    this.property.bhk = this.BHK.value;
    console.log(this.PType.value)
    this.property.propertyTypeId = this.PType.value; // Usa el ID, no el objeto completo
    this.property.name = this.Name.value;
    console.log(this.City.value);
    this.property.cityId = this.City.value;
    console.log(this.FType.value);
    this.property.furnishingTypeId = this.FType.value; // Usa el ID, no el objeto completo
    this.property.image = 'house_default';
    this.property.price = this.Price.value;
    this.property.security = this.Security.value;
    this.property.maintenance = this.Maintenance.value;
    this.property.builtArea = this.BuiltArea.value;
    this.property.carpetArea = this.CarpetArea.value;
    this.property.floorNo = this.FloorNo.value;
    this.property.totalFloors = this.TotalFloor.value;
    this.property.address = this.Address.value;
    this.property.address2 = this.LandMark.value;
    this.property.readyToMove = this.RTM.value;
    this.property.gated = this.Gated.value;
    this.property.mainEntrance = this.MainEntrance.value;
    this.property.description = this.Description.value;
    this.property.estPossessionOn = this.PossesionOn.value;
    this.property.postedOn = new Date().toString();

  }

  allTabsValid(): boolean {
    if (this.BasicInfo.invalid) {
      this.staticTabs!.tabs[0].active = true;
      return false;
    }
    if (this.PriceInfo.invalid) {
      this.staticTabs!.tabs[1].active = true;
      return false;
    }
    if (this.AddressInfo.invalid) {
      this.staticTabs!.tabs[2].active = true;
      return false;
    }
    if (this.OtherInfo.invalid) {
      this.staticTabs!.tabs[3].active = true;
      return false;
    }

    return true;
  }

  selectTab(tabId: number, IsCurrentTabValid: boolean) {
    this.nextClicked = tabId > 2; // Solo marca nextClicked como true al avanzar más allá del tab 2
    if (IsCurrentTabValid) {
      this.staticTabs!.tabs[tabId].active = true;
    }
  }
}
