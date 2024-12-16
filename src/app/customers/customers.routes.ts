import { Routes } from "@angular/router";
import { CreateCustomersComponent } from "./create-customers/create-customers.component";
import { CustomersComponent } from "./customers/customers.component";
import { EditCustomersComponent } from "./edit-customers/edit-customers.component";
import { ImportCustomersComponent } from "./import-customers/import-customers.component";

export const routes: Routes = [
    { path: '', component: CustomersComponent },
    { path: 'create', component: CreateCustomersComponent },
    { path: 'importCustomers', component: ImportCustomersComponent },
    { path: ':customerId/edit', component: EditCustomersComponent }
]