export class ProjectState {
    private projects: any[] = [];
    private listeners: any[] = [];
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
        const newProject = {
            title,
            description,
            people,
            id: Math.random().toString(),
        };
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice()); // Pass a copy of the projects array
        }
    }

    addListener(listenerFn: any) {
        this.listeners.push(listenerFn);
    }
}

export const projectState = ProjectState.getInstance();
