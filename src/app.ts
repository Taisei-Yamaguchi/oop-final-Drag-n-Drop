// Code goes here!
import { ProjectInput}  from "./components/ProjectInput.js";
import { ProjectList } from "./components/project-list.js";


const projectInput = new ProjectInput();
const activeProjectsList = new ProjectList('active');
const finishedProjectsList = new ProjectList('finished');


//Different point1: use these variables with console.log so that there no errors from not using instances.
console.log(projectInput);
console.log(activeProjectsList);
console.log(finishedProjectsList);