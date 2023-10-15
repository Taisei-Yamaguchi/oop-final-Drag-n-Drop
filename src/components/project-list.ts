import { projectState } from "./ProjectState.js";
import {ProjectStatus,Project} from "../models/project.js";
import { Component } from "./base-component.js"; 
import { ProjectItem } from "./ProjectItem.js";

export class ProjectList extends Component<HTMLDivElement, HTMLElement>{
    assignedProjects: Project[] = [];


    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app',`${type}-projects`);
        // this.attach();
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
}
