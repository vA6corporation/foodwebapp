import { Routes } from "@angular/router";
import { TurnsComponent } from "./turns/turns.component";
import { CreateTurnsComponent } from "./create-turns/create-turns.component";
import { EditTurnsComponent } from "./edit-turns/edit-turns.component";

export const routes: Routes = [
    { path: '', component: TurnsComponent },
    { path: 'create', component: CreateTurnsComponent },
    { path: ':turnId/edit', component: EditTurnsComponent }
]