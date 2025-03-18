import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  forgotPasswordForm!: FormGroup;
  submitted = false;

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.createForgotPasswordForm();
  }

  createForgotPasswordForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email')!;
  }

  onSubmit() {
    this.submitted = true;

    if (this.forgotPasswordForm.valid) {
      this.authService.forgotPassword(this.email.value).subscribe({
        next: () => {
          this.toastr.success('Se ha enviado un link de recuperación a su email');
          this.forgotPasswordForm.reset();
          this.submitted = false;
          this.router.navigate(['/user/login']);
        },
        error: (error) => {
          this.toastr.error('Error al procesar la solicitud');
        }
      });
    }
  }
}
