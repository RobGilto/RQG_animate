// Configuration option to enable or disable sound
const playSound = false;  // Set to true to enable sound

// Animation and Sound Configuration
const animations = {
  sword: "jb2a.greatsword.melee.standard.white",
  bow: "jb2a.arrow.physical.white",
  miss: "jb2a.ui.miss"
};

const sounds = {
  sword: "path/to/your/sword_sound.mp3",
  bow: "path/to/your/bow_sound.mp3"
};

// Function to perform initial checks
function performInitialChecks() {
  // Check if a token is selected
  const selectedToken = canvas.tokens.controlled[0];
  if (!selectedToken) {
    ui.notifications.warn("No token is selected.");
    console.log("No token is selected.");
    return null;  // End the macro immediately
  }

  // Check if exactly one target is selected
  const selectedTargets = Array.from(game.user.targets);
  if (selectedTargets.length !== 1) {
    ui.notifications.warn("Exactly one target must be selected.");
    console.log("Exactly one target must be selected.");
    return null;  // End the macro immediately
  }

  const targetToken = selectedTargets[0];
  if (targetToken.id === selectedToken.id) {
    ui.notifications.warn("The target cannot be the same as the selected character.");
    console.log("The target cannot be the same as the selected character.");
    return null;  // End the macro immediately
  }

  return { selectedToken, targetToken };
}

// Function to trigger animations and sounds
async function triggerEffects(chatMessage, selectedToken, targetToken) {
  console.log("Starting execution for chatMessage ID:", chatMessage.id);

  // Extract the flavor text directly from the chat message
  const flavorText = chatMessage.flavor || "";

  // Check if the message indicates a sword attack or a bow attack with a specific result
  const isSwordAttack = flavorText.includes("Broadsword");
  const isBowAttack = flavorText.includes("Bow");
  const isSuccess = flavorText.includes("Success");
  const isSpecial = flavorText.includes("Special");
  const isCritical = flavorText.includes("Critical");
  const isFailure = flavorText.includes("Failure");
  const isFumble = flavorText.includes("Fumble");

  // Get the position of the selected token (source) and target token
  const sourcePosition = {
    x: selectedToken.center.x,
    y: selectedToken.center.y
  };
  const targetPosition = {
    x: targetToken.center.x,
    y: targetToken.center.y
  };

  if (isSwordAttack && (isSuccess || isSpecial || isCritical)) {
    // Check if the target is exactly one grid space away for melee attack
    const gridDistance = canvas.grid.size;
    const dx = Math.abs(targetToken.x - selectedToken.x);
    const dy = Math.abs(targetToken.y - selectedToken.y);
    if ((dx === gridDistance && dy === 0) || (dy === gridDistance && dx === 0)) {
      // Play sword animation from the source to the target using Sequencer module
      const animationPromise = new Sequence()
        .effect()
        .file(animations.sword)
        .atLocation(sourcePosition)
        .stretchTo(targetPosition)
        .play();

      // Optionally, play a sound if enabled and wait for it to finish
      const soundPromise = playSound ? new Promise((resolve) => {
        const audio = new Audio(sounds.sword);
        audio.volume = 0.8;
        audio.addEventListener("ended", resolve);
        audio.play();
      }) : Promise.resolve();

      // Wait for both animation and sound to complete
      await Promise.all([animationPromise, soundPromise]);
    } else {
      ui.notifications.warn("The target must be exactly one grid space away for melee attack.");
      console.log("The target must be exactly one grid space away for melee attack.");
    }
  } else if (isBowAttack && (isSuccess || isSpecial || isCritical) && !isFailure && !isFumble) {
    // Play bow animation from the source to the target using Sequencer module
    const animationPromise = new Sequence()
      .effect()
      .file(animations.bow)
      .atLocation(sourcePosition)
      .stretchTo(targetPosition)
      .play();

    // Optionally, play a sound if enabled and wait for it to finish
    const soundPromise = playSound ? new Promise((resolve) => {
      const audio = new Audio(sounds.bow);
      audio.volume = 0.8;
      audio.addEventListener("ended", resolve);
      audio.play();
    }) : Promise.resolve();

    // Wait for both animation and sound to complete
    await Promise.all([animationPromise, soundPromise]);
  }

  // Play miss animation for Failure or Fumble
  if (isFailure || isFumble) {
    const missPromise = new Sequence()
      .effect()
      .file(animations.miss)
      .atLocation(targetPosition)
      .play();

    if (isBowAttack) {
      // Adjust arrow animation for miss
      const missShift = Math.random() > 0.5 ? 50 : -50; // Randomly choose to miss above or below the target
      const missPosition = {
        x: targetPosition.x,
        y: targetPosition.y + missShift
      };
      const arrowMissPromise = new Sequence()
        .effect()
        .file(animations.bow)
        .atLocation(sourcePosition)
        .stretchTo({
          x: missPosition.x,
          y: missPosition.y // Travel further
        })
        .play();
      //await Promise.all([missPromise, arrowMissPromise]);
      //await arrowMissPromise;
      await missPromise;
    } else {
      await missPromise;
    }
  }

  // Toggle off the target token
  game.user.updateTokenTargets([]);

  console.log("Ending execution for chatMessage ID:", chatMessage.id);
}

// Perform initial checks
const checkResults = performInitialChecks();
if (!checkResults) {
  // End the macro if checks fail
  return;
}
const { selectedToken, targetToken } = checkResults;

// Get the actor ID from the selected token
const actorId = selectedToken.actor.id;

// Event listener for chat messages
Hooks.on("createChatMessage", (chatMessage) => {
  console.log("createChatMessage hook triggered for chatMessage ID:", chatMessage.id);
  triggerEffects(chatMessage, selectedToken, targetToken);
});

// Function to show weapon selection dialog
function showWeaponSelectionDialog(actor) {
  // Filter for equipped weapons
  let equippedWeapons = actor.items.filter(i => i.type === "weapon" && i.system.equippedStatus === "equipped");

  if (equippedWeapons.length > 0) {
    let weaponOptions = equippedWeapons.map(weapon => `<option value="${weapon.id}">${weapon.name} (Type: ${weapon.type})</option>`).join("");

    let content = `
      <form>
        <div class="form-group">
          <label for="weapon-select">Select Weapon:</label>
          <select id="weapon-select" name="weapon-select">
            ${weaponOptions}
          </select>
        </div>
      </form>
    `;

    new Dialog({
      title: `Equipped weapons for ${actor.name}`,
      content: content,
      buttons: {
        ok: {
          label: "OK",
          callback: async (html) => {
            let selectedWeaponId = html.find('[name="weapon-select"]').val();
            let selectedWeapon = actor.items.get(selectedWeaponId);
            if (selectedWeapon) {
              ui.notifications.info(`You selected: ${selectedWeapon.name}`);
              
              // Perform grid distance check before converting the item to chat
              const gridDistance = canvas.grid.size;
              const dx = Math.abs(targetToken.x - selectedToken.x);
              const dy = Math.abs(targetToken.y - selectedToken.y);
              if ((dx === gridDistance && dy === 0) || (dy === gridDistance && dx === 0) || selectedWeapon.name.includes("Bow")) {
                const item = await fromUuid(`Actor.${actorId}.Item.${selectedWeaponId}`);
                item.toChat();
              } else {
                ui.notifications.warn("The target must be exactly one grid space away for melee attack.");
                console.log("The target must be exactly one grid space away for melee attack.");
              }
            }
          }
        },
        cancel: {
          label: "Cancel"
        }
      }
    }).render(true);
  } else {
    ui.notifications.info(`No equipped weapons found for ${actor.name}.`);
  }
}

// Show the weapon selection dialog
const actor = game.actors.get(actorId);
showWeaponSelectionDialog(actor);