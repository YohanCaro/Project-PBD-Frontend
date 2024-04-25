import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule  } from '@angular/common'

import { OrdersService } from 'app/services/orders.service';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

//import { ChartHostComponent } from '../chart-host/chart-host.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Chart } from "chart.js";
import * as Chartjs from "chart.js";

Chart.register(Chartjs.PieController, Chartjs.ArcElement, Chartjs.Legend, Chartjs.Title,
  Chartjs.CategoryScale, Chartjs.LinearScale, Chartjs.BarElement, Chartjs.BarController, Chartjs.Colors,
  Chartjs.Tooltip, Chartjs.PointElement, Chartjs.LineController, Chartjs.LineElement
);

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
  selector: 'app-chars-view',
  standalone: true,
  imports: [
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    BaseChartDirective,
    CommonModule
  ],
  templateUrl: './chars-view.component.html',
  styleUrl: './chars-view.component.css'
})
export class CharsViewComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  barChartType = 'bar' as const;
  pieChartType: ChartType = 'pie';
  lineChartType: ChartType = 'line';
  doughnutChartType: ChartType = 'doughnut';
  bubbleChartType: ChartType = 'bubble';
  bubbleChartLegend = true;

  descriptions:any[] = []
  dataSource:any = []
  element: any[] = []
  columns: string[] = []
  queries: any[] = []

  constructor(private ordersService: OrdersService) {
    this.dataSource = new MatTableDataSource()
    this.getQueryDescriptions().then(() => {
      this.getOrders()
    })
  }

  async ngAfterViewInit() {
      this.showCharts()
  }

  async getOrders() {
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
        })
    })
    return await 1
  }

  async getQueryDescriptions() {
    await this.ordersService.getQuery('descriptions')
    .subscribe(response => {
      this.descriptions = []
      response.queries.forEach((e:any) => {
        this.descriptions.push(e)
      })
    })
  }

  firstChart() {
    this.queries[0].columns.shift()
    delete this.queries[0].datas[0].year
    delete this.queries[0].datas[1].year

    this.queries[0].cd = {
      labels: this.queries[0].columns,
      datasets: [
        { data: this.queries[0].datas[0], label: '2020' },
        { data: this.queries[0].datas[1], label: '2021' },
      ]
    }
  }

  secondChart() {
    let labels: any[] = []
    this.queries[1].datas.forEach((e:any) => {
      labels.push(e.Metodo_Pago)
    })
    this.queries[1].cd = {
      labels: labels,
      datasets: [
        {
          data: [this.queries[1].datas[0].Cantidad_Pedidos, this.queries[1].datas[1].Cantidad_Pedidos]
        },
      ],
    }
  }

  thirdChart() {
    let labels: any[] = []
    let sets: any[] = []
    this.queries[2].datas.forEach((e:any) => {
      labels.push(e.Producto)
      sets.push(e.Cantidad_Productos)
    })
    this.queries[2].cd = {
      labels: labels,
      datasets: [
        { data: sets, label:'Cantidad'},
      ],
    }
  }

  fourthChart() {
    let labels: any[] = []
    let sets: any[] = []
    this.queries[3].datas.forEach((e:any) => {
      labels.push(e.Pedido)
      sets.push(e.Total)
    })
    this.queries[3].cd = {
      labels: labels,
      datasets: [
        { data: sets, label:'Valor'},
      ],
    }
  }

  fifthChart() {
    let labels: any[] = []
    let sets: any[] = []
    this.queries[4].datas.forEach((e:any) => {
      labels.push(e.Pedido)
      sets.push(e.Total)
    })
    this.queries[4].cd = {
      labels: labels,
      datasets: [
        { data: sets, label:'Valor'},
      ],
    }
  }

  sixthChart() {
    let labels: any[] = []
    let sets: any[] = []
    this.queries[5].datas.forEach((e:any) => {
      labels.push(e.Proveedor)
      sets.push(e.Cantidad_Productos)
    })
    this.queries[5].cd = {
      labels: labels,
      datasets: [
        { data: sets, label:'Productos'},
      ],
    }
  }

  seventhChart() {
    let labels: any[] = []
    let sets: any[] = []
    this.queries[6].datas.forEach((e:any) => {
      labels.push(e.Proveedor)
      sets.push(e.Cantidad_Productos)
    })
    this.queries[6].cd = {
      labels: labels,
      datasets: [
        { data: sets, label:'Productos(Stock)'},
      ],
    }
  }

  eighththChart() {
    this.queries[7].columns.shift()
    delete this.queries[7].datas[0].index

    this.queries[7].cd = {
      labels: this.queries[7].columns,
      datasets: [
        { data: this.queries[0].datas[0], label: 'Cantidad a vencer' },
      ]
    }
  }

  ninthChart() {
    let labels: any[] = []
    this.queries[8].datas.forEach((e:any) => {
      labels.push(e.Compania_Envios)
    })
    this.queries[8].cd = {
      labels: labels,
      datasets: [
        {
          data: [this.queries[8].datas[0].Precio_Total, this.queries[8].datas[1].Precio_Total,
                this.queries[8].datas[2].Precio_Total]
        },
      ],
    }
  }

  chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  changeTenth() {

    const labels: any[] = []
    let sources: any[] = this.queries[9].datas

    this.queries[9].datas.forEach((e:any) => {
      labels.push(e.Compania_Envios)
    })

    delete sources[3].Anio
    delete sources[3].Compania_Envios
    delete sources[4].Anio
    delete sources[4].Compania_Envios
    delete sources[5].Anio
    delete sources[5].Compania_Envios

    this.queries[9].cd = {
      datasets: [
        { data: sources[3], label: labels[3]},
        { data: sources[4], label: labels[4]},
        { data: sources[5], label: labels[5]}
      ]
    }
  }

  tenthChart() {
    this.queries[9].columns.shift()

    let labels: any[] = []
    let sources: any[] = this.queries[9].datas
    let temp = sources

    this.queries[9].datas.forEach((e:any) => {
      labels.push(e.Compania_Envios)
    })

    this.queries[9].columns.shift()
    delete sources[0].Anio
    delete sources[0].Compania_Envios
    delete sources[1].Anio
    delete sources[1].Compania_Envios
    delete sources[2].Anio
    delete sources[2].Compania_Envios

    this.queries[9].cd = {
      datasets: [
        { data: sources[0], label: labels[0]},
        { data: sources[1], label: labels[1]},
        { data: sources[2], label: labels[2]}
      ]
    }
  }

  showCharts() {
    this.firstChart()
    this.secondChart()
    this.thirdChart()
    this.fourthChart()
    this.fifthChart()
    this.sixthChart()
    this.seventhChart()
    this.eighththChart()
    this.ninthChart()
    this.tenthChart()
  }

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    scales: {x: {}, y: { min: 10},
    },
    plugins: {
      legend: {display: true},
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };

  public barChartOptions2: ChartConfiguration<'bar'>['options'] = {
    scales: {x: {}, y: { min: 700, max:1600, ticks:{maxTicksLimit: 10,}},
    },
  };
  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
          return '';
        },
      },
    },
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {

    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
    },

    plugins: {
      legend: { display: true }
    },
  };

}
