import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OrdersService } from 'app/services/orders.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';

import { FormGroup, FormControl } from '@angular/forms';

import { CommonModule  } from '@angular/common'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { map  } from 'rxjs/operators';

const NAMES:string[] = [
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'seventh',
  'eighth',
  'ninth',
  'tenth'
]

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements AfterViewInit {

  dataNewFlag = true

  dataSource:any = []
  element: any[] = []
  displayedColumns: string[] = []
  queries: any[] = []
  descriptions: any[] = []

  form = new FormGroup({
    dataSearch: new FormControl('')
  })

  constructor(private ordersService: OrdersService) {
    this.dataSource = new MatTableDataSource()
    this.search()
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

  getOrders(table:string) {
    return this.ordersService.getQuery(table)
    .pipe(
      map((response: any) => {
        this.displayedColumns = []
        this.element = []
        response.schema.fields.forEach((e:any) => {
          this.displayedColumns.push(e.name)
        })

        response.data.forEach((e: any)=> {
          this.element.push(e)
        });
        this.dataSource = this.element
        return {col:this.displayedColumns, data:this.dataSource}
      })
    )
  }

  async getQueryDescriptions() {
    await this.ordersService.getQuery('descriptions')
    .subscribe(response => {
      response.queries.forEach((e:any) => {
        this.descriptions.push(e)
      })
    })
  }

  async search() {
    this.getQueryDescriptions()
    let cols: any[] = []
    let eles: any[] = []

    NAMES.forEach((n:string)=> {
      this.ordersService.getQuery(n)
      .subscribe((response: any) => {
          response.schema.fields.forEach((e:any) => {
            cols.push(e.name)
          })
          eles = response.data
          this.queries.push({
            code:n,
            index:this.descriptions.find(({code})=> code === n).index,
            description:this.descriptions.find(({code})=> code === n).description,
            title:this.descriptions.find(({code})=> code === n).title,
            datas:eles,
            columns:cols
          })
          this.queries.sort((a:any,b:any) => {return a.index - b.index})
          cols = []
          eles = []
          console.log(this.queries)
        })
    })
    this.dataSource.paginator = this.paginator;
  }

  onFilter(title:string) {
    if (this.form.value.dataSearch) {
      this.postOrders(title, this.form.value.dataSearch)
      .subscribe(e => {
        console.log(title)
        console.log(e)
          this.queries.map(function(data) {
              if (data.code == title) {
                data.datas = e.data
                data.columns = e.col
              }
          })
        }
      )
    } else {
      this.getOrders(title)
      .subscribe(e => {
        console.log(title)
        console.log(e)
          this.queries.map(function(data) {
              if (data.code == title) {
                data.datas = e.data
                data.columns = e.col
              }
          })
        }
      )
    }

  }

  postOrders(table:string, data:any) {
    return this.ordersService.postQuery(table, data)
    .pipe(
      map((response: any) => {
        this.element = []
        this.displayedColumns = []
        response.schema.fields.forEach((e:any) => {
          this.displayedColumns.push(e.name)
        })

        response.data.forEach((e: any)=> {
          this.element.push(e)
        });
        this.dataSource = this.element
        return {col:this.displayedColumns, data:this.dataSource}
      })
    )
  }

}
