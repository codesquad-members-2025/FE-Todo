import { addActivity, loadActivityData } from '../../activity/store.js';
import { getISOStringNow } from '../../shared/utils/common.js';
import { updateTask } from '../store.js';
import { renderActivityRecords } from '../../activity/renderer.js';
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

  async saveEdit() {
    const editedTitle = this.editForm.querySelector('input').value;
    const editedContent = this.editForm.querySelector('textarea').value;

    // 수정 전의 타이틀을 저장
    const originalTitle =
      this.originalTaskCard.querySelector('.task-title').textContent;

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

    addActivity({
      action: 'update',
      task: originalTitle,
      timeStamp: getISOStringNow(),
    });

    const activityData = await loadActivityData();
    renderActivityRecords(activityData);
  }

  showEditForm() {
    this.taskCard.replaceWith(this.editForm);
  }
}

export default TaskEditor;
