// autobind decorator
// function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;
//     const adjustedDescriptor: PropertyDescriptor = {
//         configurable: true,
//         get() {
//             const boundFn = originalMethod.bind(this);
//             return boundFn;
//         },
//     };
//     return adjustedDescriptor;
// }

export class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    // Inside ProjectInput class
    private titleInputElement: HTMLInputElement;
    private descriptionInputElement: HTMLInputElement;
    private peopleInputElement: HTMLInputElement;


    constructor() {
        this.templateElement = document.getElementById("project-input") as HTMLTemplateElement;
        this.hostElement = document.getElementById("app") as HTMLDivElement;

        // Get the content of the template
        const importedNode = document.importNode(this.templateElement.content, true);
        // Get the form element from the template
        this.element = importedNode.firstElementChild as HTMLFormElement;
        // Add a new id to the form
        this.element.id = "user-input";
        // Attach the form to the host element
        this.attach();

        // Inside ProjectInput constructor
        this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;
        this.configure();

    }

    private attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
    // Inside ProjectInput class
    private configure() {
        this.element.addEventListener("submit", this.submitHandler.bind(this));
    }

    // Inside ProjectInput class
    // @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        console.log(userInput);
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
    
        if (
            enteredTitle.trim().length === 0 ||
            enteredDescription.trim().length === 0 ||
            enteredPeople.trim().length === 0
        ) {
            alert("Invalid input, please try again!");
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

}