import { Component, OnInit, Inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { from } from 'rxjs';

@Component({
  selector: 'formModal',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(
    public customer: CustomerService,
    private dialogRef:MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA)
    data) { }

  ngOnInit(): void {
  }

  onSaveFrom() {
    if (this.customer.selected.id == null) {
      let newCustomer = {
        name: this.customer.selected.name,
        city: this.customer.selected.city,
        order: this.customer.selected.order,
      }

      this.customer.addCustomer(newCustomer);

    } else {
      this.customer.editCustomer(this.customer.selected);
    }
    this.close();

  }
  close():void{
    this.dialogRef.close();
  }

}
