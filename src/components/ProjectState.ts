import {Project} from "../models/project.js";
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
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice()); // Pass a copy of the projects array
        }
    }

    addListener(listenerFn: Listener) {
        this.listeners.push(listenerFn);
    }
}

export const projectState = ProjectState.getInstance();
