// Define the content for each page along with their titles
const pages = [
  { title: "Start", content: "Choose an Actor" },
  { title: "Details", content: "Select Race, Culture, Occupation, and Cult" },
  { title: "Page 3", content: "Content for Page 3" },
  { title: "Page 4", content: "Content for Page 4" },
  { title: "Page 5", content: "Content for Page 5" },
  { title: "Page 6", content: "Content for Page 6" },
  { title: "Page 7", content: "Content for Page 7" },
  { title: "Page 8", content: "Content for Page 8" },
  { title: "Page 9", content: "Content for Page 9" }
];

// Global object to hold dropdown options and their corresponding data
const globalOptions = {
  races: {
    auto: { weight: 0 },
    human: { STR: "3d6", weight: 50, weightFunctions: [(details) => details.culture === 'Culture A' ? 20 : 0] },
    darktroll: { STR: "3d6+6", weight: 50, weightFunctions: [(details) => details.culture === 'Culture B' ? 20 : 0] }
  },
  cultures: {
    auto: { weight: 0 },
    "Culture A": { weight: 33, weightFunctions: [(details) => details.race === 'human' ? 17 : 0] },
    "Culture B": { weight: 33, weightFunctions: [(details) => details.race === 'darktroll' ? 17 : 0] },
    "Culture C": { weight: 34 }
  },
  occupations: {
    auto: { weight: 0 },
    "Occupation X": { weight: 40, weightFunctions: [(details) => details.cult === 'Cult 1' ? 20 : 0] },
    "Occupation Y": { weight: 30, weightFunctions: [(details) => details.cult === 'Cult 2' ? 20 : 0] },
    "Occupation Z": { weight: 30 }
  },
  cults: {
    auto: { weight: 0 },
    "Cult 1": {
      weight: 25,
      weightFunctions: [
        (details) => details.race === 'human' ? 10 : 0,
        (details) => details.occupation === 'Occupation X' ? 10 : 0
      ]
    },
    "Cult 2": {
      weight: 25,
      weightFunctions: [
        (details) => details.race === 'darktroll' ? 10 : 0,
        (details) => details.occupation === 'Occupation Y' ? 10 : 0
      ]
    },
    "Cult 3": { weight: 50 }
  }
};

// Initialize the current page index
let currentPage = 0;

// Global list to store selected actors and details
let selectedActors = [];
let actorDetails = {};

// Function to get all actors
function getActors() {
  return game.actors.map(actor => actor);
}

// Function to apply weight functions as modifiers
function applyWeightFunctions(weight, weightFunctions, details) {
  if (!weightFunctions) return weight;
  if (!Array.isArray(weightFunctions)) {
    weightFunctions = [weightFunctions];
  }

  return weightFunctions.reduce((modifiedWeight, func) => {
    if (typeof func === 'function') {
      const modifier = func(details);
      return modifiedWeight + modifier;
    }
    return modifiedWeight;
  }, weight);
}

// Function to get weighted random selection from a list excluding "auto"
function getWeightedRandomSelection(list, actorId) {
  const details = actorDetails[actorId];
  const weights = Object.entries(list)
    .filter(([key]) => key !== 'auto')
    .map(([key, value]) => {
      const weight = applyWeightFunctions(value.weight, value.weightFunctions || value.weightFunction, details);
      return { key, weight };
    });

  const totalWeight = weights.reduce((sum, item) => sum + item.weight, 0);
  const randomWeight = Math.random() * totalWeight;

  let weightSum = 0;
  for (const item of weights) {
    weightSum += item.weight;
    if (randomWeight <= weightSum) {
      return item.key;
    }
  }
}

// Function to load the details of the selected actor
function loadActorDetails(actorId) {
  const details = actorDetails[actorId];
  if (details) {
    document.getElementById('race-select').value = details.race || 'human';
    document.getElementById('culture-select').value = details.culture || 'auto';
    document.getElementById('occupation-select').value = details.occupation || 'auto';
    document.getElementById('cult-select').value = details.cult || 'auto';
  }
}

// Function to handle "auto" selections and set default values
function handleAutoSelections() {
  selectedActors.forEach(actor => {
    const details = actorDetails[actor.id];
    if (details.race === 'auto') details.race = getWeightedRandomSelection(globalOptions.races, actor.id);
    if (details.culture === 'auto') details.culture = getWeightedRandomSelection(globalOptions.cultures, actor.id);
    if (details.occupation === 'auto') details.occupation = getWeightedRandomSelection(globalOptions.occupations, actor.id);
    if (details.cult === 'auto') details.cult = getWeightedRandomSelection(globalOptions.cults, actor.id);
  });
}

// Function to log all selected actors and their details
function logSelectedActorsAndDetails() {
  console.log("Selected Actors and Details:");
  selectedActors.forEach(actor => {
    const details = actorDetails[actor.id];
    console.log(`Actor ID: ${actor.id}, Actor: ${actor.name}, Details:`, details);
  });
}

// Create a function to render a specific page
function renderPage(pageIndex) {
  const page = pages[pageIndex];
  let content = `<h2>${page.title}</h2><p>${page.content}</p>`;
  if (pageIndex === 0) {
    // Dropdown for actor selection on Page 1 (Start)
    let actors = getActors().filter(actor => !selectedActors.some(selected => selected.id === actor.id));
    content += `<select id="actor-select">${actors.map(actor => `<option value="${actor.id}">${actor.name}</option>`)}</select>`;
    content += `<button id="add-actor-button" style="margin-left: 10px;">Add Actor</button>`;
  } else if (pageIndex === 1) {
    // Dropdowns for race, culture, occupation, and cult on Page 2
    let actors = selectedActors.map(actor => `<option value="${actor.id}">${actor.name}</option>`).join('');
    content += `
      <div>
        <label for="actor-detail-select">Actor:</label>
        <select id="actor-detail-select">${actors}</select>
      </div>
      <div>
        <label for="race-select">Race:</label>
        <select id="race-select">${Object.keys(globalOptions.races).map(race => `<option value="${race}">${race}</option>`)}</select>
      </div>
      <div>
        <label for="culture-select">Culture:</label>
        <select id="culture-select">${Object.keys(globalOptions.cultures).map(culture => `<option value="${culture}">${culture}</option>`)}</select>
      </div>
      <div>
        <label for="occupation-select">Occupation:</label>
        <select id="occupation-select">${Object.keys(globalOptions.occupations).map(occupation => `<option value="${occupation}">${occupation}</option>`)}</select>
      </div>
      <div>
        <label for="cult-select">Cult:</label>
        <select id="cult-select">${Object.keys(globalOptions.cults).map(cult => `<option value="${cult}">${cult}</option>`)}</select>
      </div>
    `;
    content += `<button id="sync-all-button" style="margin-top: 10px;">Sync All</button>`;
  } else if (pageIndex === 2) {
    // Display the list of selected actors on Page 3
    content += `<ul>${selectedActors.map(actor => `<li>${actor.name}</li>`).join('')}</ul>`;
  }
  return content;
}

// Create the side navigator content
function createSideNav() {
  return `
    <div id="side-nav" style="float: left; width: 20%; border-right: 1px solid #ccc; padding-right: 10px;">
      <ul>
        ${pages.map((page, index) => `<li style="margin-bottom: 5px;"><button class="nav-button" data-page="${index}">${page.title}</button></li>`).join('')}
      </ul>
    </div>
  `;
}

// Create the bottom sub-panel content
function createBottomPanel(pageIndex) {
  let nextButton;
  if (pageIndex === 0) {
    nextButton = `<button id="next-button-page-1" style="margin-left: 10px;">Next</button>`;
  } else if (pageIndex === 1) {
    nextButton = `<button id="next-button-page-2" style="margin-left: 10px;">Next</button>`;
  } else {
    nextButton = pageIndex < pages.length - 1 ? `<button id="next-button">Next</button>` : '';
  }
  return `
    <div id="bottom-panel" style="width: 100%; border-top: 1px solid #ccc; padding-top: 10px; display: flex; justify-content: flex-end;">
      <button id="cancel-button">Cancel</button>
      <button id="save-button" style="margin-left: 10px;">Save</button>
      ${nextButton}
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
    // Add event listener for the next button on Page 1
    html.find('#next-button-page-1').click(() => {
      const actorId = html.find('#actor-select').val();
      const actor = game.actors.get(actorId);
      selectedActors.push(actor);
      actorDetails[actorId] = {
        race: 'human',
        culture: 'auto',
        occupation: 'auto',
        cult: 'auto'
      };
      logSelectedActorsAndDetails();
      currentPage++;
      dialog.data.content = createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listener for the next button on Page 2
    html.find('#next-button-page-2').click(() => {
      const actorId = html.find('#actor-detail-select').val();
      actorDetails[actorId].race = html.find('#race-select').val();
      actorDetails[actorId].culture = html.find('#culture-select').val();
      actorDetails[actorId].occupation = html.find('#occupation-select').val();
      actorDetails[actorId].cult = html.find('#cult-select').val();

      handleAutoSelections();

      logSelectedActorsAndDetails();
      currentPage++;
      dialog.data.content = createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listeners for dropdowns to dynamically save selections
    html.find('#actor-detail-select').change(function() {
      const actorId = $(this).val();
      loadActorDetails(actorId);
    });
    html.find('#race-select').change(function() {
      const actorId = html.find('#actor-detail-select').val();
      actorDetails[actorId].race = $(this).val();
      logSelectedActorsAndDetails();
    });
    html.find('#culture-select').change(function() {
      const actorId = html.find('#actor-detail-select').val();
      actorDetails[actorId].culture = $(this).val();
      logSelectedActorsAndDetails();
    });
    html.find('#occupation-select').change(function() {
      const actorId = html.find('#actor-detail-select').val();
      actorDetails[actorId].occupation = $(this).val();
      logSelectedActorsAndDetails();
    });
    html.find('#cult-select').change(function() {
      const actorId = html.find('#actor-detail-select').val();
      actorDetails[actorId].cult = $(this).val();
      logSelectedActorsAndDetails();
    });

    // Add event listeners for side navigator buttons
    html.find('.nav-button').click(function() {
      currentPage = parseInt($(this).data('page'));
      dialog.data.content = createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listener for the add actor button
    html.find('#add-actor-button').click(() => {
      const actorId = html.find('#actor-select').val();
      const actor = game.actors.get(actorId);
      selectedActors.push(actor);
      actorDetails[actorId] = {
        race: 'human',
        culture: 'auto',
        occupation: 'auto',
        cult: 'auto'
      };
      logSelectedActorsAndDetails();
      // Re-render the current page to update the list of selected actors and remove the added actor
      dialog.data.content = createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listener for the sync all button
    html.find('#sync-all-button').click(() => {
      const actorId = html.find('#actor-detail-select').val();
      const details = actorDetails[actorId];
      for (const id in actorDetails) {
        actorDetails[id] = { ...details };
      }
      logSelectedActorsAndDetails();
      dialog.data.content = createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listener for the cancel button
    html.find('#cancel-button').click(() => {
      dialog.close();
    });

    // Add event listener for the save button
    html.find('#save-button').click(() => {
      logSelectedActorsAndDetails();
      // Add your save logic here
    });

    // Load the initial details for the first actor
    if (currentPage === 1 && selectedActors.length > 0) {
      loadActorDetails(selectedActors[0].id);
    }
  }
}).render(true);