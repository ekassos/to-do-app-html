# To-do App with HTML, CSS, and JS

$\textcolor{ForestGreen}{\textbf{\emph{Completed:}}} \text{\emph{ Friday, Sep 2, 2022}}$

## Live Demo
You can access a working version of the project [here](https://to-do-app-html-i4c0wuvut-ekassos.vercel.app/).

> **Note**  
> If you are accessing the live demo using Safari (*tested on Release Version 16.1 and Technology Preview Release 152 with Safari 16.0 and WebKit 18615.1.2.3*), the checkmark in the task name input box might not turn darker as you type. This is a browser CSS-stylebook compatability issue, and the feature works as expected in Chromium browsers (Chrome, Brave, etc.), Firefox and the like. Still, the to-do app should not suffer in functionality because of this issue.  
> 
> A WhichBrowser plugin patch to detect the browser client and replace the image accordingly seemed like an overkill for this project. If you are facing these issues, you can clone the repository and use [Visual Studio Code](https://code.visualstudio.com) and the [Live Preview extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server) to view the project correctly locally.

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
> *These improvements are referenced throught the project files using the numbers shown below, e.g. Improvement (5).*
1. A Submit button that works alongside the tutorial's functionality of pressing "Enter" to submit an item (added a second method to capture a wider range of how a user might choose to interact with the app).
2. A strike-through line appears over a submitted task when the user hovers over the task's text to signify that clicking on the text will mark a task as completed and aid in functionality discovery.
3. An updated "Mark Task as Completed" function that updates the view instantly. In the tutorial's version, if a user crossed out a task in the "Pending" tab, they would need to navigate to another tab and return for the completed task to be removed from the list.
4. Added cues to whether the Submit button can be used (high opacity when task item textbox is empty), with matching checkmark icon behavior.
5. Fixed code support for handling and editing tasks with special characters by using the `encodeURI()` and `decodeURI()` functions.
