import { Component } from '@angular/core';
import { ToolbarService } from '../../toolbar/toolbar.service';
import { TurnsService } from '../turns.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-edit-turns',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatNativeDateModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule
    ],
    templateUrl: './edit-turns.component.html',
    styleUrl: './edit-turns.component.sass'
})
export class EditTurnsComponent {

    constructor(
        private readonly toolbarService: ToolbarService,
        private readonly turnsService: TurnsService,
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        created_at: ['', Validators.required],
        food: ['', Validators.required],
        isClosed: false
    })
    isLoading: boolean = false
    turnId: string = ''

    ngOnInit() {
        this.toolbarService.setTitle('Editar turno')
        this.turnId = this.activatedRoute.snapshot.params['turnId']
        this.turnsService.getTurnById(this.turnId).subscribe(turn => {
            this.formGroup.patchValue(turn)
            if (turn.closed_at) {
                this.formGroup.patchValue({ isClosed: true })
            } else {
                this.formGroup.patchValue({ isClosed: false })
            }
        })
    }

    onSubmit() {
        if (this.formGroup.valid) {
            this.toolbarService.loadingBarStart()
            this.isLoading = true
            const { isClosed } = this.formGroup.value
            const turn = this.formGroup.value
            if (isClosed) {
                turn.closed_at = new Date().toISOString().split('T')[0]
            } else {
                turn.closed_at = null
            }
            this.turnsService.update(this.formGroup.value, this.turnId).subscribe({
                next: () => {
                    this.isLoading = false
                    this.toolbarService.loadingBarFinish()
                    this.toolbarService.showMessage('Se han guardado los cambios')
                    this.router.navigate(['/turns'])
                }, error: (error: HttpErrorResponse) => {
                    this.isLoading = false
                    this.toolbarService.loadingBarFinish()
                    this.toolbarService.showMessage(error.error)
                }
            })
        }
    }

}
