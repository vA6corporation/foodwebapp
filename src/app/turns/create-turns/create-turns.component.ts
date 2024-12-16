import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ToolbarService } from '../../toolbar/toolbar.service';
import { TurnsService } from '../turns.service';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-create-turns',
    standalone: true,
    imports: [
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    templateUrl: './create-turns.component.html',
    styleUrl: './create-turns.component.sass'
})
export class CreateTurnsComponent {

    constructor(
        private readonly toolbarService: ToolbarService,
        private readonly turnsService: TurnsService,
        private readonly formBuilder: FormBuilder,
        private readonly router: Router
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        created_at: [new Date(), Validators.required],
        food: ['', Validators.required]
    })
    isLoading: boolean = false

    ngOnInit() {
        this.toolbarService.setTitle('Nuevo turno')
    }

    onSubmit() {
        if (this.formGroup.valid) {
            this.toolbarService.loadingBarStart()
            this.isLoading = true
            this.turnsService.create(this.formGroup.value).subscribe({
                next: () => {
                    this.router.navigate(['/turns'])
                    this.toolbarService.showMessage('Registrado correctamente')
                    this.isLoading = false
                    this.toolbarService.loadingBarFinish()
                }, error: (error: HttpErrorResponse) => {
                    this.isLoading = false
                    this.toolbarService.loadingBarFinish()
                    this.toolbarService.showMessage(error.error)
                }
            })
        }
    }

}
