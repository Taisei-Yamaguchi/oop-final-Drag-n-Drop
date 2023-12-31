enum ProjectStatus {
    Active,
    Finished,
}


class Project {
    id: string;
    title: string;
    description: string;
    people: number;
    status: ProjectStatus;

    constructor(id: string, title: string, description: string, people: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = ProjectStatus.Active; // Initialize status as Active
    }

}

export { Project, ProjectStatus };
