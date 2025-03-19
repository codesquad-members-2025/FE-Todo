import { updateTask } from '../store.js';
import { createEditForm } from './template.js';

class TaskEditor {
  constructor(taskCard) {
    this.taskCard = taskCard;
    this.originalTaskCard = taskCard.cloneNode(true);
    this.editForm = this.createEditForm();
  }

  createEditForm() {
    const title = this.taskCard.querySelector('.task-title').textContent;
    const content = this.taskCard.querySelector('.task-content').textContent;
    const editFormElement = createEditForm(title, content);

    this.attachFormEvents(editFormElement);

    return editFormElement;
  }

  attachFormEvents(editFormElement) {
    editFormElement
      .querySelector('.task-cancel-btn')
      .addEventListener('click', () => {
        this.restoreOriginalTask();
      });

    editFormElement
      .querySelector('.task-save-btn')
      .addEventListener('click', () => {
        this.saveEdit();
      });
  }

  restoreOriginalTask() {
    this.editForm.replaceWith(this.originalTaskCard);
  }

  saveEdit() {
    const editedTitle = this.editForm.querySelector('input').value;
    const editedContent = this.editForm.querySelector('textarea').value;

    this.originalTaskCard.querySelector('.task-title').textContent =
      editedTitle;
    this.originalTaskCard.querySelector('.task-content').textContent =
      editedContent;

    updateTask({
      id: this.originalTaskCard.id,
      title: editedTitle,
      content: editedContent,
    });

    this.restoreOriginalTask();
  }

  showEditForm() {
    this.taskCard.replaceWith(this.editForm);
  }
}

export default TaskEditor;
