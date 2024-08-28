import { TodoSignalsService } from './../../services/todo-signals.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './todo-form.component.html',
  styleUrls: []
})
export class TodoFormComponent {
  private TodoSignalsService = inject(TodoSignalsService);
  private dialogRefService = inject(MatDialogRef<HeaderComponent>);
  public allTodos = this.TodoSignalsService.todosState();

  public todosForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl ('', [Validators.required, Validators.minLength(5),]),
  });

  public handleCreatedNewTodo(): void {
    if(this.todosForm.value && this.todosForm.valid){
      const title = String(this.todosForm.controls['title'].value);
      const description = String(this.todosForm.controls['description'].value);
      const id = this.allTodos.length > 0 ? this.allTodos.length + 1 : 1;
      const done = false;

      this.TodoSignalsService.updateTodos({id,title,description,done})
      this.dialogRefService.close();
    }
  }
  public handleCloseModal(): void {
    this.dialogRefService.close();
  }

}
