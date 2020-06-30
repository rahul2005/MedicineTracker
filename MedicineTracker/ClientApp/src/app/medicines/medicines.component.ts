import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicineService } from '../services/medicine.service';
import { Medicine } from '../models/medicine';
import { FilterUtils } from 'primeng/utils';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.scss']
})
export class MedicinesComponent implements OnInit {
  medicines$: Observable<Medicine[]>;
  cols: any[];
  constructor(private blogPostService: MedicineService) {
  }

  ngOnInit() {
    this.loadMedicines();

    this.cols = [
      { field: 'id', header: 'Med ID #' },
      { field: 'name', header: 'Medicine Name' },
      { field: 'brand', header: 'Brand' },
      { field: 'price', header: 'Price($)' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'expiryDate', header: 'Expiry Date' },
      { field: 'notes', header: 'Notes' }
    ];
    
    FilterUtils['custom'] = (value, filter): boolean => {
      if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      return parseInt(filter) > value;
    }
  }

  GetDateDiff(date : Date) {
    var date1: any = new Date(date);
    var date2: any = new Date();
    var diffDays: any = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  getSelected(rowData: Medicine) {
    if (rowData.quantity < 10)
      return 'yellow';
    else if (this.GetDateDiff(rowData.expiryDate) < 30)
      return 'red';
    else
      return null;
  }

  loadMedicines() {
    this.medicines$ = this.blogPostService.getMedicines();
  }

  delete(postId) {
    const ans = confirm('Do you want to delete Medicine with id: ' + postId);
    if (ans) {
      this.blogPostService.deleteMedicine(postId).subscribe((data) => {
        this.loadMedicines();
      });
    }
  }
}
