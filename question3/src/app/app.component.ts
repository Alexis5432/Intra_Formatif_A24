import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators, ReactiveFormsModule, FormGroup, ValidatorFn } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
 
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class AppComponent {
  title = 'reactive.form';
  formGroup: FormGroup;
 
 
  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      name: ['',[Validators.required]],
      roadnumber: ['',[Validators.required, Validators.min(1000), Validators.max(9999)]],
      postalcode: ['',[Validators.pattern(/^[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]$/)]],
      rue: ['',],
      comments: ['',[ this.minWordsValidator(10)]]
    },{ validators: [this.animalsCountValidator(), this.nomDansCourriel()] });
   
  }
 
    minWordsValidator(minWords: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const words = value.trim().split(" ");
 
    if (words.length < minWords) {
      return { minWords: { required: minWords, actual: words.length } };
    }
 
    return null;
  };
 
}
    nomDansCourriel(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const nameCtrl = group.get('name');
      const commentsCtrl = group.get('comments');
      if (!nameCtrl || !commentsCtrl) return null;
 
      const name = (nameCtrl.value || '').toString().trim().toLowerCase();
      const comments = (commentsCtrl.value || '').toString();
 
      // si l'un est vide, on retire l'erreur nomDansCourriel si elle existe
      if (!name || !comments || !comments.toLowerCase().includes(name)) {
        const errs = commentsCtrl.errors;
        if (errs && errs['nomDansCourriel']) {
          const { nomDansCourriel, ...rest } = errs;
          commentsCtrl.setErrors(Object.keys(rest).length ? rest : null);
        }
        return null;
      }
 
      // si le nom est présent dans les commentaires -> on ajoute l'erreur sur comments
      const existing = commentsCtrl.errors || {};
      if (!existing['nomDansCourriel']) {
        commentsCtrl.setErrors({ ...existing, nomDansCourriel: true });
      }
      return null; // on retourne null au niveau du groupe car l'erreur est posée sur le contrôle enfant
    };
 
}
 
 
animalsCountValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const nb = group.get('rue')?.value;
    const list = group.get('comment')?.value;
 
    if (!nb || !list) return null; // On ne valide pas si vide
 
    // On sépare les animaux simplement par des espaces
    const animaux = list.split(' ');
   
    // Vérifie si le nombre correspond
    if (animaux.length != nb) {
      return { animalsCountMismatch: true };
    }
 
    return null; // tout est bon
  };
}
 
}