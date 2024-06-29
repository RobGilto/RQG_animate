// Define the content for each page
const pages = [
  "Choose an Actor",
  "Select an Action",
  "Content for Page 3",
  "Content for Page 4",
  "Content for Page 5",
  "Content for Page 6",
  "Content for Page 7",
  "Content for Page 8",
  "Content for Page 9"
];

// Initialize the current page index
let currentPage = 0;

// Variable to store the selected actor
let selectedActor = null;

// Function to get all actor names
function getActorNames() {
  return game.actors.map(actor => actor.name);
}

// Create a function to render a specific page
function renderPage(pageIndex) {
  let content = `<h2>Page ${pageIndex + 1}</h2><p>${pages[pageIndex]}</p>`;
  if (pageIndex === 0) {
    // Dropdown for actor selection on Page 1
    let actorNames = getActorNames();
    content += `<select id="actor-select">${actorNames.map(name => `<option value="${name}">${name}</option>`)}</select>`;
  } else if (pageIndex === 1) {
    // Display the selected actor on Page 2
    content += `<p>Selected Actor: ${selectedActor}</p>`;
  }
  return content;
}

// Create the side navigator content
function createSideNav() {
  return `
    <div id="side-nav" style="float: left; width: 20%; border-right: 1px solid #ccc; padding-right: 10px;">
      <ul>
        ${pages.map((_, index) => `<li style="margin-bottom: 5px;"><button class="nav-button" data-page="${index}">Page ${index + 1}</button></li>`).join('')}
      </ul>
    </div>
  `;
}

// Create the bottom sub-panel content
function createBottomPanel(pageIndex) {
  let nextButton = pageIndex < pages.length - 1 ? `<button id="next-button">Next</button>` : '';
  return `
    <div id="bottom-panel" style="width: 100%; border-top: 1px solid #ccc; padding-top: 10px; display: flex; justify-content: flex-end;">
      <button id="cancel-button">Cancel</button>
      <button id="save-button" style="margin-left: 10px;">Save</button>
      ${nextButton ? `<button id="next-button" style="margin-left: 10px;">Next</button>` : ''}
    </div>
  `;
}

// Create the dialog content including the side navigator, main page area, and bottom panel
function createDialogContent(pageIndex) {
  return `
    <div style="display: flex; flex-direction: column; height: 100%;">
      <div style="flex-grow: 1; display: flex;">
        ${createSideNav()}
        <div id="main-content" style="flex-grow: 1; padding-left: 10px;">
          ${renderPage(pageIndex)}
        </div>
      </div>
      ${createBottomPanel(pageIndex)}
    </div>
  `;
}

// Create the dialog
const dialog = new Dialog({
  title: "Multi-Page Dialog",
  content: createDialogContent(currentPage),
  buttons: {},
  render: (html) => {
    // Add event listener for the next button
    html.find('#next-button').click(() => {
      if (currentPage === 0) {
        // Store the selected actor when moving from Page 1 to Page 2
        selectedActor = html.find('#actor-select').val();
        console.log("Selected Actor:", selectedActor);
      }
      currentPage++;
      dialog.data.content = createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listeners for side navigator buttons
    html.find('.nav-button').click(function() {
      currentPage = parseInt($(this).data('page'));
      dialog.data.content = createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listener for the cancel button
    html.find('#cancel-button').click(() => {
      dialog.close();
    });

    // Add event listener for the save button
    html.find('#save-button').click(() => {
      console.log("Save button clicked");
      // Add your save logic here
    });
  }
}).render(true);
