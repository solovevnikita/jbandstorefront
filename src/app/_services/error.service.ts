import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  form: FormGroup;
  constructor() { }

  getForm(form) {
    this.form = form;
  }
  haveError(validationErrors) {
    if (!validationErrors) { return; }
    Object.keys(validationErrors).forEach(prop => {
      const formControl = this.form.get(prop);
      if (formControl) {
        formControl.setErrors({
          serverError: validationErrors[prop]
        });
      }
    });
    return this.form;
  }
}
