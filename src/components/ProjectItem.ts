import { Component } from "./base-component.js";
import { Project } from "../models/project.js";
import { Draggable } from "../helpers/drag-drop.js";

//use this class in projectList
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{
    // private title: string;
    // private people: number;
    // private description: string;
    private project: Project;

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, project.id);
        // this.title = project.title;
        // this.people = project.people;
        // this.description = project.description;
        this.project=project;
        this.configure();
        this.renderContent();
    }

    configure() {
        // this.element.addEventListener('dragstart', this.dragStartHandler);
        // this.element.addEventListener('dragend', this.dragEndHandler);

        this.element.draggable = true; // Set the draggable attribute to true
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.members;
        this.element.querySelector('p')!.textContent = this.project.description;
    }

    get members(): string {
        return this.project.people === 1 ? '1 member assigned' : `${this.project.people} members assigned`;
    }

    dragStartHandler(event: DragEvent): void {
        console.log('Drag Start');
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(event: DragEvent): void {
        console.log('Drag End');
        console.log(event)
    }
}