import { Component , OnInit } from '@angular/core';

import { OrdersService } from 'app/services/orders.service';

import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { CdkTableModule } from '@angular/cdk/table';

import { CommonModule } from '@angular/common'
import { interval } from 'rxjs';
import { ViewTables } from 'app/models/view-tables';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [
    MatTableModule,
    CdkTableModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatGridListModule,
    MatIconModule
  ],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export class TablesComponent implements OnInit  {
  dataNewFlag = true;
  dataSource:any = [];
  element: any[] = [];
  displayedColumns: string[] = [];

  selectedValue: string = 'all'
  vt = new ViewTables('','')
  tables = this.vt.getDatas()

  constructor(private ordersService: OrdersService) {
    this.dataSource = new MatTableDataSource();
    console.log('loading')
  }

  ngOnInit() {
    interval(4000).subscribe(x => {
      if (this.dataNewFlag) {
        this.dataSource = new MatTableDataSource(this.element);
        this.dataNewFlag = false
      }
    })
  }

  getOrders(table:string) {
    this.ordersService.getTable(table)
    .then(response => {
      response.data.schema.fields.forEach((e:any) => {
        this.displayedColumns.push(e.name)
      })

      response.data.data.forEach((e: any)=> {
        this.element.push(e)
      });
    })
  }

  search() {
    this.dataNewFlag = true
    this.element = []
    this.displayedColumns = []

    console.log('Search: ' + this.selectedValue)
    this.getOrders(this.selectedValue)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
