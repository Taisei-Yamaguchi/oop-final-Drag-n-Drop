import { projectState } from "./ProjectState.js";

export class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    private type: 'active' | 'finished'; // Union type
    assignedProjects: any[] = [];


    constructor(type: 'active' | 'finished') {
        this.type = type;
        this.templateElement = document.getElementById("project-list") as HTMLTemplateElement;
        this.hostElement = document.getElementById("app") as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;

        this.attach();
        this.renderContent();

        projectState.addListener((projects: any[]) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });
    }

    private attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }

    private renderContent() {
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
            const listItem = document.createElement('li');
            listItem.textContent = project.title;
            listElement.appendChild(listItem);
        }
    }
}
