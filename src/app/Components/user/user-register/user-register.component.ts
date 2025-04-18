
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UserFormRegister } from '../../../Interfaces/IUser';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css',
})
export class UserRegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  userSubmitted: boolean = false;
  user!: UserFormRegister;

  private formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);

  constructor(private toastr:ToastrService){

  }


  ngOnInit(): void {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registrationForm = this.formBuilder.group(
      {
        userName: ['', [Validators.required, Validators.minLength(5), // Agregamos un validador personalizado para espacios
        this.noWhitespaceValidator]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        mobile: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
      },
      { validators: this.passwordMatchingValidator }
    );
  }

  // Agregamos el validador personalizado
noWhitespaceValidator(control: FormControl): ValidationErrors | null {
  const hasWhitespace = (control.value || '').includes(' ');
  return hasWhitespace ? { 'whitespace': true } : null;
}

  passwordMatchingValidator(fg: FormGroup): ValidationErrors | null {
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { notmatched: true };
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    this.userSubmitted = true;
    if (this.registrationForm.valid) {
      this._authService.registerUser(this.userData()).subscribe(()=>{
        this.registrationForm.reset();
        this.userSubmitted = false;
        this.toastr.success('Felicitaciones, te has registrado');
      }, error=>{
        this.toastr.error('requiere tus credenciales');
      }
    );



    }
  }

  userData(): UserFormRegister {
    return (this.user = {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value,
    });
  }
  onReset() {
    this.userSubmitted = false;
    this.registrationForm.reset();
  }

  // Getter methods for all form controls
  get userName() {
    return this.registrationForm.get('userName') as FormControl;
  }

  get email() {
    return this.registrationForm.get('email') as FormControl;
  }

  get password() {
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  get mobile() {
    return this.registrationForm.get('mobile') as FormControl;
  }
}
