import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicineService } from '../services/medicine.service';
import { Medicine } from '../models/medicine';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'medicine-add-edit',
  templateUrl: './medicine-add-edit.component.html',
  styleUrls: ['./medicine-add-edit.component.scss']
})
export class MedicineAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formName: string;
  formBrand: string;
  id: number;
  formPrice: number;
  formQuantity: number
  formExpiryDate: Date;
  formNotes: string;
  errorMessage: any;
  existingMedicine: Medicine;
  display = false;
  modalTitle = '';
  modalContent = '';

  constructor(private medicineService: MedicineService, private datepipe: DatePipe, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    
    const idParam = 'id';
    this.actionType = 'Add';
    this.formName = 'name';
    this.formBrand = 'brand';
    this.formPrice = 0;
    this.errorMessage = '';
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {        
        name: ['', Validators.required, ],
        brand: ['', Validators.required ],
        price: [10, ],
        quantity: [12, ],
        expiryDate: [new Date()],
        notes:["TEst"]
      }
    )
  }



  ngOnInit() {
    this.errorMessage = '';
    if (this.id > 0) {
      this.actionType = 'Edit';
      this.medicineService.getMedicine(this.id)
        .subscribe(data => (
          this.existingMedicine = data,          
          this.form.controls['name'].setValue(data.name),
          this.form.controls['brand'].setValue(data.brand),
          this.form.controls['price'].setValue(data.price),
          this.form.controls['quantity'].setValue(data.quantity),
          this.form.controls['expiryDate'].setValue(new Date(data.expiryDate)),
          this.form.controls['notes'].setValue(data.notes)
        ));
    }
  }

  getErrors(formGroup: FormGroup, errors: any = {}) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      errors[field] = control.errors;
    } else if (control instanceof FormGroup) {
      errors[field] = this.getErrors(control);
    }
  });
  return errors;
  }
  getFormValidationErrors(form: FormGroup) {

    const result = [];
    Object.keys(form.controls).forEach(key => {

      const controlErrors: ValidationErrors = form.get(key).errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(keyError => {
          result.push({
            'control': key,
            'error': keyError,
            'value': controlErrors[keyError]
          });
        });
      }
    });

    return result;
  }

  GetDateDiff(date: Date) {
    var date1: any = new Date(date);
    var date2: any = new Date();
    var diffDays: any = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  save() {
    this.errorMessage = '';
    if (!this.form.valid) {
      
      let formErrors = this.getErrors(this.form);
      let dd = this.getFormValidationErrors(this.form)
      if (this.form.get('name').value == '')
        this.errorMessage = 'Medicine Name Required.';
      else if (this.form.get('brand').value == '')
        this.errorMessage = 'Brand Name Required.';      
      else
        this.errorMessage = '';
      return;
    }
    debugger;
     let dateDifference = this.GetDateDiff(new Date(this.form.get('expiryDate').value))
    if (dateDifference < 15) {
      this.errorMessage = 'Expiry Date is less than 15 days';
      return;
    }
    if (dateDifference > 15 && dateDifference < 30) {
      //this.display = true;
      //this.modalTitle = 'dfsdfsdf';
      //this.modalContent = 'Content of ' ;
      const ans = alert('Warning : Medicine: ' + this.form.get('name').value + 'is being added with expiry date less than 30 days. Expire Date :' + this.datepipe.transform(new Date(this.form.get('expiryDate').value), 'dd/MM/yyyy') );
          }
    
    if (this.actionType === 'Add') {
      let blogPost: Medicine = {
        expiryDate: new Date(this.form.get('expiryDate').value),
        name: this.form.get('name').value,
        brand: this.form.get('brand').value,
        price: Number(this.form.get('price').value),
        quantity: Number(this.form.get('quantity').value),
        notes: this.form.get('notes').value,

      };

      this.medicineService.saveMedicine(blogPost)
        .subscribe((data) => {
          this.router.navigate(['/medicines']);
          //this.router.navigate(['/medicine', data.id]);
        });
    }

    if (this.actionType === 'Edit') {
      let medicine: Medicine = {
        id: this.existingMedicine.id,
        expiryDate: new Date(this.form.get('expiryDate').value),
        name: this.existingMedicine.name,
        brand: this.form.get('brand').value,
        price: Number(this.form.get('price').value),
        quantity: Number(this.form.get('quantity').value),
        notes: this.form.get('notes').value,
        
      };
      this.medicineService.updateMedicine(medicine.id, medicine)
        .subscribe((data) => {
          this.router.navigate(['/medicines']);
          //this.router.navigate([this.router.url]);
        });
    }
  }

  cancel() {
    this.router.navigate(['/medicines']);
  }

  
}

export class Hero {

  constructor(
    public id: number,
    public name: string,
    public power: string,
    public alterEgo?: string
  ) { }

}
