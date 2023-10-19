import { validate, Validatable } from '../helpers/validation.js';
import { projectState } from "./ProjectState.js";
import { Component } from "./base-component.js";
// import { ProjectItem } from './ProjectItem.js'; //try


export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    private titleInputElement: HTMLInputElement;
    private descriptionInputElement: HTMLInputElement;
    private peopleInputElement: HTMLInputElement;
    // private projectItem: ProjectItem; //try

    constructor() {
        super("project-input", "app", "user-input");
        // Inside ProjectInput constructor
        this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;
        this.configure();

    }

    configure() {
        this.element.addEventListener("submit", this.submitHandler.bind(this));
    }

    renderContent() {}
    
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            // Call the addProject method from projectState and pass the form input values
            projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }

    private gatherUserInput(): [string, string, number] | void {
        const title: Validatable = {
            value: this.titleInputElement.value,
            required: true,
        };

        const description: Validatable = {
            value: this.descriptionInputElement.value,
            required: true,
        };

        const people: Validatable = {
            value: +this.peopleInputElement.value,
            required: true,
            min: 1,
            max: 10,
        };

        if (
            !validate(title) ||
            !validate(description) ||
            !validate(people)
        ) {
            alert('Invalid input, please try again!');
            return;
        }

        return [this.titleInputElement.value, this.descriptionInputElement.value, +this.peopleInputElement.value];
    }

    private clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
}