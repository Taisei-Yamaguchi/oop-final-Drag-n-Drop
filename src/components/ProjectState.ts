import {Project,ProjectStatus} from "../models/project.js";
type Listener = (projects: Project[]) => void;

export class ProjectState {
    private projects: Project[] = [];
    private listeners: Listener[] = [];
    private static instance: ProjectState;

    private constructor() {}

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addProject(title: string, description: string, people: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            people
        );
        this.projects.push(newProject);
        this.updateListeners();
    }

    addListener(listenerFn: Listener) {
        this.listeners.push(listenerFn);
    }

    moveProject(id: string, newStatus: ProjectStatus) {
        const foundProject = this.projects.find((project) => project.id === id);
    
        if (foundProject && foundProject.status !== newStatus) {
            foundProject.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

export const projectState = ProjectState.getInstance();
