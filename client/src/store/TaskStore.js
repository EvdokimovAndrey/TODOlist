import { makeAutoObservable } from "mobx";

export default class TaskStore {
    constructor() {
        this._tasks = [];
        this._task = {};
        makeAutoObservable(this)
    }

    setTasks(tasks) {
        this._tasks = tasks
    }

    get tasks() {
        return [...this._tasks]
    }

    setTask(task) {
        this.task = task
    }

    get task() {
        return this.task
    }
}