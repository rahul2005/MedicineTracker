import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MedicineService } from '../services/medicine.service';
import { Medicine } from '../models/medicine';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss']
})
export class MedicineComponent implements OnInit {
  medicine$: Observable<Medicine>;
  id: number;

  constructor(private medicineService: MedicineService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadMedicine();
  }

  loadMedicine() {
    this.medicine$ = this.medicineService.getMedicine(this.id);
  }
}
