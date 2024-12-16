import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PrintService } from '../../print/print.service';
import { ToolbarService } from '../../toolbar/toolbar.service';
import { FoodsService } from '../foods.service';

@Component({
    selector: 'app-pos',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
    templateUrl: './pos.component.html',
    styleUrl: './pos.component.sass'
})
export class PosComponent {

    constructor(
        private readonly toolbarService: ToolbarService,
        private readonly printService: PrintService,
        private readonly foodsService: FoodsService,
        private readonly formBuilder: FormBuilder,
    ) { }

    formGroup = this.formBuilder.group({
        dni: ''
    })
    intervalId: any = ''

    @ViewChild('inputDni') 
    inputDni!: ElementRef<HTMLInputElement>;
    @ViewChild('speaker') 
    speaker!: ElementRef<HTMLAudioElement>;

    ngOnDestroy() {
        clearInterval(this.intervalId)
    }

    ngOnInit() {
        this.toolbarService.setTitle('Tickets')
        this.intervalId = setInterval(() => {
            this.inputDni.nativeElement.focus()
        }, 1000)
    }

    onSubmit() {
        if (this.formGroup.valid) {
            this.foodsService.create(this.formGroup.value).subscribe({
                next: res => {
                    this.printService.printTicket80mm(res)
                    this.formGroup.reset()
                }, error: (error: HttpErrorResponse) => {
                    this.formGroup.reset()
                    this.toolbarService.showMessage(error.error)
                    this.speaker.nativeElement.currentTime = 0
                    this.speaker.nativeElement.play()
                }
            })
        }
    }

}
