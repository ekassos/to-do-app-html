# To-do App with HTML, CSS, and JS

## Live Demo
You can access a working version of the project [here](https://to-do-app-html-i4c0wuvut-ekassos.vercel.app/).

## Code Source 
The code for this project is adapted from CodingNepal's [Create A Todo List App in HTML CSS & JavaScript](https://www.codingnepalweb.com/create-todo-list-app-html-javascript/) tutorial, with a few additions as noted in the [Improvements section](#improvements) below.

## Features  
- Type a task in the text box and press the "Enter" key or the "Submit" button to register it to local storage. The task persists when the browser tab is refreshed or reopened later (using localStorage in JS).
- When you have some tasks to work over, you can click on their text or the checkmark on the left of each item to mark them as completed. 
- To distinguish between completed and pending tasks, use the three tabs ("All," "Pending," "Completed") to navigate to the right tab.
- Made a mistake? Click on the three dots on the right of each task and select "Edit." You can now edit the text of the task in the text box. Submit your correction with the "Enter" key or the "Submit" button.
- You can also delete all tasks by clicking on the three dots on the right of each task and selecting "Delete." 
- Done for the day or need a fresh start? Click "Clear All" to remove all (pending and completed) tasks.

## Improvements  
1. A Submit button that works alongside the tutorial's functionality of pressing "Enter" to submit an item (added a second method to capture a wider range of how a user might choose to interact with the app).
2. A strike-through line appears over a submitted task when the user hovers over the task's text to signify that clicking on the text will mark a task as completed and aid in functionality discovery.
3. An updated "Mark Task as Completed" function that updates the view instantly. In the tutorial's version, if a user crossed out a task in the "Pending" tab, they would need to navigate to another tab and return for the completed task to be removed from the list.
