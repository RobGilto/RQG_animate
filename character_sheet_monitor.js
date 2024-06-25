let currentActor = null;
let currentItem = null;

// Function to update the display with actor, item, and outcome details
function updateDisplay(actorName, actorId, itemName, itemId, outcome) {
  document.getElementById("actor-name").innerText = `Actor Name: ${actorName}`;
  document.getElementById("actor-id").innerText = `Actor ID: ${actorId}`;
  document.getElementById("item-name").innerText = `Item Name: ${itemName}`;
  document.getElementById("item-id").innerText = `Item ID: ${itemId}`;
  document.getElementById("outcome").innerText = `Outcome: ${outcome}`;
}

// Function to handle character sheet rendering
function handleRenderActorSheet(app, html, data) {
  currentActor = app.actor;
  const actorId = currentActor.id;
  const actorName = currentActor.name;
  console.log("Actor Name:", actorName);
  console.log("Actor ID:", actorId);

  // Add click listener to item elements
  html.find('.item').click(ev => {
    const itemId = ev.currentTarget.dataset.itemId;
    const item = currentActor.items.get(itemId);
    const itemName = item ? item.name : "N/A";
    console.log("Item Name:", itemName);
    console.log("Item ID:", itemId);
    currentItem = item;
    updateDisplay(actorName, actorId, itemName, itemId, "N/A");
  });
}

// Function to handle chat messages
async function handleChatMessage(message, html, data) {
  console.log("Chat Message Data:", message.system || {});
  console.log("Chat Message HTML:", html[0].outerHTML); // Log the entire HTML content of the chat message

  // Display the chat message content for debugging purposes
  console.log("Chat Message Content:", message.content);

  // Check if the message contains an outcome
  const content = $(html).find('.flavor-text').text() || message.content;
  const outcomeMatch = content.match(/(Success|Critical|Failure|Fumble)/i);
  
  if (outcomeMatch && currentActor && currentItem) {
    const outcome = outcomeMatch[0];
    console.log("Outcome:", outcome);
    updateDisplay(currentActor.name, currentActor.id, currentItem.name, currentItem.id, outcome);
  }

  // Check if the message contains a UUID and extract actor and item information
  const uuidMatch = message.content.match(/Actor\.([a-zA-Z0-9]+)\.Item\.([a-zA-Z0-9]+)/);
  if (uuidMatch) {
    const actorId = uuidMatch[1];
    const itemId = uuidMatch[2];
    const actor = game.actors.get(actorId);
    if (actor) {
      const item = actor.items.get(itemId);
      if (item) {
        console.log("Actor Name:", actor.name);
        console.log("Actor ID:", actor.id);
        console.log("Item Name:", item.name);
        console.log("Item ID:", item.id);
        updateDisplay(actor.name, actor.id, item.name, item.id, "N/A");
      }
    }
  }
}

// Function to create the GUI window
function createMonitorWindow() {
  const content = `
    <div>
      <h3>Character Sheet Monitor</h3>
      <div id="actor-name">Actor Name: N/A</div>
      <div id="actor-id">Actor ID: N/A</div>
      <div id="item-name">Item Name: N/A</div>
      <div id="item-id">Item ID: N/A</div>
      <div id="outcome">Outcome: N/A</div>
      <button id="close-window">Close</button>
    </div>
  `;

  const dialog = new Dialog({
    title: "Character Sheet Monitor",
    content: content,
    buttons: {},
    render: (html) => {
      // Add click event for the close button
      html.find("#close-window").click(() => {
        dialog.close();
        stopListening();
      });
    },
    close: () => {
      stopListening();
    }
  }).render(true);

  // Start listening for character sheet rendering and chat messages
  function startListening() {
    Hooks.on("renderActorSheet", handleRenderActorSheet);
    Hooks.on("renderChatMessage", handleChatMessage);
  }

  // Stop listening for character sheet rendering and chat messages
  function stopListening() {
    Hooks.off("renderActorSheet", handleRenderActorSheet);
    Hooks.off("renderChatMessage", handleChatMessage);
    ui.notifications.info("Character sheet monitor deactivated.");
  }

  // Initially start listening for events
  startListening();
}

// Run the function to create the window
createMonitorWindow();
