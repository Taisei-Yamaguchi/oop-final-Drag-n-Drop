import { Component } from "./base-component.js";
import { Project } from "../models/project.js";
import { Draggable } from "../helpers/drag-drop.js";
// import { autobind } from "../helpers/autobind.js";

//use this class in projectList
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{
    private project: Project;

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, project.id);
        this.project=project;
        this.configure();
        this.renderContent();

        //bind drag Method (without this part, if you use arrow method, you can easily bind drag drop methods.)
        // this.dragStartHandler = this.dragStartHandler.bind(this); 
        // this.dragEndHandler = this.dragEndHandler.bind(this);
    }

    configure() {
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

    //Different point2
    // @autobind
    dragStartHandler = (event: DragEvent): void =>{
        console.log('Drag Start');
        console.log(this.project);
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    // @autobind
    dragEndHandler = (event: DragEvent): void =>{
        console.log('Drag End');
        console.log(event)
    }
}