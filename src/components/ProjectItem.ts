import { Component } from "./base-component.js";
import { Project } from "../models/project.js";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>{
    private title: string;
    private people: number;
    private description: string;

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, project.id);
        this.title = project.title;
        this.people = project.people;
        this.description = project.description;
        this.configure();
        this.renderContent();
    }

    configure() {
        
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.title;
        this.element.querySelector('h3')!.textContent = this.people.toString();
        this.element.querySelector('p')!.textContent = this.description;
    }
}