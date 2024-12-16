import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarService } from './toolbar.service';
import { Subscription } from 'rxjs';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-toolbar',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatIconModule, 
        MatProgressBar, 
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatMenuModule,
    ],
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.sass'
})
export class ToolbarComponent {

    constructor(
        private readonly toolbarService: ToolbarService,
        private readonly formBuilder: FormBuilder,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        key: null,
    })
    @Output()
    sidenavToggle = new EventEmitter<void>()
    @ViewChild('inputKey')
    inputKey!: ElementRef<HTMLInputElement> | null
    title: string = 'Food'
    isLoadingBar: boolean = false
    menus: any[] = []
    buttons: any[] = []
    showSearch: boolean = false
    showInputSearch: boolean = false

    private handleChangeTitle$: Subscription = new Subscription()
    private handleIsLoadingBar$: Subscription = new Subscription()
    private handleSetMenu$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleChangeTitle$.unsubscribe()
        this.handleIsLoadingBar$.unsubscribe()
        this.handleSetMenu$.unsubscribe()
    }

    ngOnInit() {
        this.handleChangeTitle$ = this.toolbarService.handleChangeTitle().subscribe(title => {
            this.title = title
        })

        this.handleIsLoadingBar$ = this.toolbarService.handleIsLoadingBar().subscribe(isLoadingBar => {
            this.isLoadingBar = isLoadingBar
        })

        this.handleSetMenu$ = this.toolbarService.handleSetMenu().subscribe(menus => {
            const filterMenus = []
            const filterButtons = []
            this.showSearch = false
            for (const menu of menus) {
                if (menu.id === 'search') {
                    this.showSearch = true
                    continue
                }
                if (menu.show) {
                    filterButtons.push(menu)
                } else {
                    filterMenus.push(menu)
                }
            }
            this.menus = filterMenus
            this.buttons = filterButtons
        })
    }

    onClickMenu(id: string) {
        if (id === 'search') {
            this.showSearch = !this.showSearch
        }
        this.toolbarService.clickMenu(id)
    }

    onSubmit() {
        const { key } = this.formGroup.value
        this.formGroup.reset()
        if (key) {
            this.toolbarService.search(key)
        }
    }

    onCloseInputSearch() {
        if (this.formGroup.value.key) {
            this.formGroup.reset()
        } else {
            this.showInputSearch = false
        }
    }

    onToggleSearch() {
        if (this.showSearch) {
            setTimeout(() => {
                if (this.inputKey) {
                    this.inputKey.nativeElement.focus()
                }
            })
        }
    }

    onToggleSidenav(): void {
        this.sidenavToggle.emit()
    }

}
