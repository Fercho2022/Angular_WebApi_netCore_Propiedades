import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit{

registrationForm!: FormGroup;

private formBuilder=inject(FormBuilder);

ngOnInit(): void {
    this.registrationForm= this.formBuilder.group({
      userName:['', [Validators.required, Validators.minLength(5)]],
      password:['', [Validators.required, Validators.minLength(8)]],
      confirmPassword:['', [Validators.required]],
      mobile:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]]


    }, {validators: this.passwordMatchingValidator});

    }

passwordMatchingValidator(fg:FormGroup):ValidationErrors | null{

    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { notmatched: true };
  }

onSubmit(){
  console.log( this.registrationForm)
    }

// Getter methods for all form controls
get userName(){
  return this.registrationForm.get('userName') as FormControl;
}

get email(){
  return this.registrationForm.get('email') as FormControl;
}

get password(){
  return this.registrationForm.get('password') as FormControl;
}

get confirmPassword(){
  return this.registrationForm.get('confirmPassword') as FormControl;
}

get mobile(){
  return this.registrationForm.get('mobile') as FormControl;
}
  }



