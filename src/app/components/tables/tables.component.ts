import { Component , OnInit } from '@angular/core';

import { OrdersService } from 'app/services/orders.service';

import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { CommonModule  } from '@angular/common'

import { interval } from 'rxjs';
import { ViewTables } from 'app/models/view-tables';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [
    MatTableModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    CommonModule,
    HttpClientModule
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
  }

  ngOnInit() {
    interval(2000).subscribe(x => {
      if (this.dataNewFlag) {
        this.dataSource = new MatTableDataSource(this.element);
        this.dataNewFlag = false
      }
    })
  }

  getOrders(table:string) {
    this.ordersService.getTable(table).subscribe(response => {
      response.schema.fields.forEach((e:any) => {
        this.displayedColumns.push(e.name)
      })

      response.data.forEach((e: any)=> {
        this.element.push(e)
      });
    })
  }

  search() {
    this.dataNewFlag = true
    this.element = []
    this.displayedColumns = []

    this.getOrders(this.selectedValue)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
