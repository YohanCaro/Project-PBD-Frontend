import { ETables } from "./e-tables"

export class ViewTables {

  value!:string
  viewValue!:string

  constructor (value:string, viewValue:string) {
    this.value = value
    this.viewValue = viewValue
  }

  getVT() {
   return [
    new ViewTables('orders/categories',ETables.categories),
    new ViewTables('orders/charges',ETables.charges),
    new ViewTables('gesemp/concepts',ETables.concepts),
    new ViewTables('orders/contacts',ETables.contacts),
    new ViewTables('gesemp/contracts',ETables.contracts),
    new ViewTables('rh/departments',ETables.departments),
    new ViewTables('orders/details',ETables.details),
    new ViewTables('rh/employees',ETables.employees),
    new ViewTables('rh/jobshistories',ETables.jobhistory),
    new ViewTables('rh/jobs',ETables.jobs),
    new ViewTables('gesemp/locations',ETables.locations),
    new ViewTables('orders/orders',ETables.orders),
    new ViewTables('gesemp/payrolls',ETables.payrolls),
    new ViewTables('gesemp/periods',ETables.periods),
    new ViewTables('orders/products',ETables.products),
    new ViewTables('gesemp/releases',ETables.releases),
    new ViewTables('orders/shipping',ETables.shipping),
    new ViewTables('orders/suppliers',ETables.suppliers),
    new ViewTables('gesemp/types',ETables.type)
  ]
}

  getDatas() {
    const a: { value: string; viewValue: string }[] = []
    this.getVT().forEach(e => {
      a.push({
        "value": e.value,
        "viewValue": e.viewValue
      })
    })
    return a;
  }

}
