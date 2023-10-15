import { Component } from "./base-component.js";
import { Project } from "../models/project.js";

//use this class in projectList
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
        this.element.querySelector('h3')!.textContent = this.members;
        this.element.querySelector('p')!.textContent = this.description;
    }

    get members(): string {
        return this.people === 1 ? '1 member assigned' : `${this.people} members assigned`;
    }
}