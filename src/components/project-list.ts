import { projectState } from "./ProjectState.js";
import {ProjectStatus,Project} from "../models/project.js";
import { Component } from "./base-component.js"; 
import { ProjectItem } from "./ProjectItem.js";
import { DragTarget } from "../helpers/drag-drop.js";
// import { autobind } from "../helpers/autobind.js";

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
    assignedProjects: Project[] = [];


    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app',`${type}-projects`);
        this.configure();
        this.renderContent();
    }

    configure() {
        projectState.addListener((projects: Project[]) => {
            this.assignedProjects = projects.filter((project) =>
                this.type === 'active'
                    ? project.status === ProjectStatus.Active
                    : project.status === ProjectStatus.Finished
            );
            this.renderProjects();
        });

        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('drop', this.dropHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
    }


    renderContent() {
        const listId = `${this.type}-projects-list`;
        const list = this.element.querySelector('ul')!;
        list.id = listId;
        const heading = this.element.querySelector('h2')!;
        heading.textContent = `${this.type.toUpperCase()} PROJECTS`;
    }


    private renderProjects() {
        const listElement = document.getElementById(`${this.type}-projects-list`) as HTMLUListElement;
        listElement.innerHTML = ''; // Clear the list first

        for (const project of this.assignedProjects) {
            const projectItem = new ProjectItem(this.element.id, project); // Create ProjectItem instance
            projectItem.renderContent(); // Render project details
            listElement.appendChild(projectItem.element); // Append the element to the list
        }
    }

    //Different point2: arrow func make it easier to bind.
    // @autobind
    dragOverHandler = (event: DragEvent): void =>{
        if (event.dataTransfer?.types[0] === "text/plain") {
            event.preventDefault();
        }
    }

    // @autobind
    dropHandler = (event: DragEvent): void =>{
        event.preventDefault();
        console.log(this.element)
        this.element.classList.remove('droppable');
        const projectId = event.dataTransfer!.getData('text/plain');
        // Do something with the projectId, e.g., update the project's status.
        const newStatus =
        this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished;
        projectState.moveProject(projectId, newStatus);
    }

    // @autobind
    dragLeaveHandler = (event: DragEvent): void =>{
        this.element.classList.remove('droppable');
        console.log(event)
    }
}
