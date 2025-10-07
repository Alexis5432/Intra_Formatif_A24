import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

interface RegisterData {
  name?: string | null;
  roadnumber?: number | null;
  postalcode?: string | null;
  rue?: string | null;
  comments?: string | null;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class AppComponent {
  title = 'reactive.form';
  formGroup?: FormGroup;


  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(1000), Validators.maxLength(9999)]],
      roadnumber: ['',[Validators.required]],
      postalcode: ['',[Validators.pattern(/^[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]$/)]],
      rue: ['',],
      commnents: ['',[Validators.minLength(10)]]

    })

  }

  
}


