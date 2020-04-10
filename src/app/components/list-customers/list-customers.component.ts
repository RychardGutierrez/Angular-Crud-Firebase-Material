import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { CustomerI } from '../../../models/customer.interface';
import { CustomerService } from '../../services/customer.service';
import { DataSource } from '@angular/cdk/collections';
import { MatSortModule, MatSort } from '@angular/material/sort';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';


@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss']
})
export class ListCustomersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'city', 'order', 'actions'];
  dataSource = new MatTableDataSource();
  
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private CustomerService: CustomerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.CustomerService.getAllCustomers().subscribe(res => this.dataSource.data = res);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }


  onEdit(element) {
    this.openModal();
    if (element) {
      return this.CustomerService.selected = element;
    }
  }
  onNew() {
    this.resetForm();
    this.openModal();
  }
  onDelete(id: string) {
    return this.CustomerService.deleteCustumer(id);
  }
  openModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Modal'
    };
    dialogConfig.autoFocus = true;
    this.dialog.open(FormComponent, dialogConfig);
  }

  resetForm(): void {
    this.CustomerService.selected.name = '';
    this.CustomerService.selected.city = '';
    this.CustomerService.selected.order = '';
    this.CustomerService.selected.id = null;
  }
  //Importar service
  //Inyectar service
  //utilizarlo

}
