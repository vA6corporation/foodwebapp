import { Routes } from "@angular/router";
import { ChangeTicketsComponent } from "./change-tickets/change-tickets.component";
import { PosComponent } from "./pos/pos.component";

export const routes: Routes = [
    { path: '', component: PosComponent },
    { path: 'changeTickets', component: ChangeTicketsComponent },
]