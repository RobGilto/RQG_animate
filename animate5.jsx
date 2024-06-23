// Configuration option to enable or disable sound
const playSound = false;  // Set to true to enable sound

// Animation and Sound Configuration
const weaponEffects = {
  "Broadsword": { 
    melee: { animation: "jb2a.greatsword.melee.standard.white", sound: "path/to/your/sword_sound.mp3" }
  },
  "Fist": { 
    melee: { animation: "jb2a.melee_generic.bludgeoning.one_handed", sound: "path/to/your/sword_sound.mp3" }
  },
  "Grapple": { 
    melee: { animation: "jb2a.melee_generic.bludgeoning.two_handed", sound: "path/to/your/sword_sound.mp3" }
  },
  "Kick": { 
    melee: { animation: "jb2a.melee_generic.bludgeoning.one_handed", sound: "path/to/your/sword_sound.mp3" }
  },
  "Claw": { 
    melee: { animation: "jb2a.claws.200px.red", sound: "path/to/your/sword_sound.mp3" }
  },
  "Composite Bow": { 
    ranged: { animation: "jb2a.arrow.cold.blue", sound: "path/to/your/bow_sound.mp3" }
  },
  "Dagger": { 
    melee: { animation: "jb2a.dagger.melee.02.white", sound: "path/to/your/dagger_melee_sound.mp3" },
    ranged: { animation: "jb2a.dagger.throw.01.white", sound: "path/to/your/dagger_throw_sound.mp3" }
  },
  "Short Spear": { 
    melee: { animation: "jb2a.spear.melee.01.white", sound: "path/to/your/short_spear_melee_sound.mp3" },
    ranged: { animation: "jb2a.spear.throw.standard.white", sound: "path/to/your/short_spear_throw_sound.mp3" }
  },
  "Long Spear": { 
    melee: { animation: "jb2a.spear.melee.fire.white", sound: "path/to/your/long_spear_sound.mp3" }
  },
  "Sling": { 
    ranged: { animation: "jb2a.slingshot", sound: "path/to/your/sling_sound.mp3" }
  },
  "miss": { 
    animation: "jb2a.ui.miss"
  },
  "override": { 
    animation: "jb2a.hammer.throw", sound: "path/to/your/override_sound.mp3"
  }
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
  console.log("Flavor text:", flavorText);

  // Determine the type of attack and weapon used
  let weaponUsed = null;
  let maxLength = 0;
  Object.keys(weaponEffects).forEach(weapon => {
    const regex = new RegExp(`\\b${weapon}\\b`, 'i'); // Use word boundaries to match exact weapon names
    if (regex.test(flavorText) && weapon.length > maxLength) {
      weaponUsed = weapon;
      maxLength = weapon.length;
    }
  });

  // Check if the weapon has melee or ranged attack types
  const isMeleeAttack = weaponUsed && weaponEffects[weaponUsed].melee !== undefined;
  const isRangedAttack = weaponUsed && weaponEffects[weaponUsed].ranged !== undefined;

  console.log("Weapon used:", weaponUsed);
  console.log("Is Melee Attack:", isMeleeAttack);
  console.log("Is Ranged Attack:", isRangedAttack);

  const isSuccess = flavorText.includes("Success");
  const isSpecial = flavorText.includes("Special");
  const isCritical = flavorText.includes("Critical");
  const isFailure = flavorText.includes("Failure");
  const isFumble = flavorText.includes("Fumble");

  console.log("Is Success:", isSuccess);
  console.log("Is Special:", isSpecial);
  console.log("Is Critical:", isCritical);
  console.log("Is Failure:", isFailure);
  console.log("Is Fumble:", isFumble);

  // Get the position of the selected token (source) and target token
  const sourcePosition = {
    x: selectedToken.center.x,
    y: selectedToken.center.y
  };
  const targetPosition = {
    x: targetToken.center.x,
    y: targetToken.center.y
  };

  if (weaponUsed && (isSuccess || isSpecial || isCritical)) {
    const attackType = isMeleeAttack ? "melee" : "ranged";

    console.log("Attack type:", attackType);

    if (!weaponEffects[weaponUsed]) {
      console.error(`No weapon effects found for weapon: ${weaponUsed}`);
      return;
    }

    if (!weaponEffects[weaponUsed][attackType]) {
      console.error(`No ${attackType} effects found for weapon: ${weaponUsed}`);
      return;
    }

    // Check if the target is exactly one grid space away for melee attack
    const gridDistance = canvas.grid.size;
    const dx = Math.abs(targetToken.x - selectedToken.x);
    const dy = Math.abs(targetToken.y - selectedToken.y);

    if (attackType === "ranged" || (attackType === "melee" && ((dx === gridDistance && dy === 0) || (dy === gridDistance && dx === 0)))) {
      console.log(`Playing animation for weapon: ${weaponUsed}, attack type: ${attackType}`);
      // Play appropriate animation from the source to the target using Sequencer module
      const animationPromise = new Sequence()
        .effect()
        .file(weaponEffects[weaponUsed][attackType].animation)
        .atLocation(sourcePosition)
        .stretchTo(targetPosition)
        .play();

      // Optionally, play a sound if enabled and wait for it to finish
      const soundPromise = playSound ? new Promise((resolve) => {
        const audio = new Audio(weaponEffects[weaponUsed][attackType].sound);
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
  }

  // Play miss animation for Failure or Fumble
  if (isFailure || isFumble) {
    const missPromise = new Sequence()
      .effect()
      .file(weaponEffects.miss.animation)
      .atLocation(targetPosition)
      .play();

    if (isRangedAttack && weaponUsed && weaponEffects[weaponUsed].ranged) {
      // Adjust animation for miss
      const missShift = Math.random() > 0.5 ? 50 : -50; // Randomly choose to miss above or below the target
      const missPosition = {
        x: targetPosition.x,
        y: targetPosition.y + missShift
      };
      const weaponMissPromise = new Sequence()
        .effect()
        .file(weaponEffects[weaponUsed].ranged.animation)
        .atLocation(sourcePosition)
        .stretchTo({
          x: missPosition.x,
          y: missPosition.y // Travel further
        })
        .play();
      await missPromise;
    } else {
      await missPromise;
    }
  }

  // Toggle off the target token
  game.user.updateTokenTargets([]);

  console.log("Ending execution for chatMessage ID:", chatMessage.id);
}



// Function to show weapon selection dialog
function showWeaponSelectionDialog(actor) {
  // Filter for equipped weapons
  let equippedWeapons = actor.items.filter(i => i.type === "weapon" && i.system.equippedStatus === "equipped");

  // Filter out arrows, bolts, and stones
  equippedWeapons = equippedWeapons.filter(weapon => !["Arrow", "Bolt", "Stone", "Sling Stones"].includes(weapon.name));

  if (equippedWeapons.length > 0) {
    let weaponOptions = equippedWeapons.map(weapon => {
      let type;
      const effects = weaponEffects[weapon.name];
      if (effects) {
        const hasMelee = Boolean(effects.melee);
        const hasRanged = Boolean(effects.ranged);
        if (hasMelee && hasRanged) type = "Both";
        else if (hasMelee) type = "Melee";
        else if (hasRanged) type = "Ranged";
        else type = "Unknown";
      } else {
        type = "Unknown";
      }

      return `<option value="${weapon.id}">${weapon.name} (Type: ${type})</option>`;
    }).join("");

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
              
              // Determine if the attack is melee or ranged
              const effects = weaponEffects[selectedWeapon.name];
              const attackType = effects.melee && effects.ranged ? 
                (html.find('[name="attack-type"]').val() || "melee") : 
                (effects.melee ? "melee" : "ranged");

              // Perform grid distance check before converting the item to chat
              const gridDistance = canvas.grid.size;
              const dx = Math.abs(targetToken.x - selectedToken.x);
              const dy = Math.abs(targetToken.y - selectedToken.y);

              if (attackType === "ranged" || (attackType === "melee" && ((dx === gridDistance && dy === 0) || (dy === gridDistance && dx === 0)))) {
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
        },
        forceRanged: {
          label: "Force Ranged Attack",
          callback: async (html) => {
            let selectedWeaponId = html.find('[name="weapon-select"]').val();
            let selectedWeapon = actor.items.get(selectedWeaponId);
            if (selectedWeapon) {
              ui.notifications.info(`You selected: ${selectedWeapon.name} for a forced ranged attack.`);
              
              // Play override animation and sound
              const sourcePosition = {
                x: selectedToken.center.x,
                y: selectedToken.center.y
              };
              const targetPosition = {
                x: targetToken.center.x,
                y: targetToken.center.y
              };
              
              const animationPromise = new Sequence()
                .effect()
                .file(weaponEffects.override.animation)
                .atLocation(sourcePosition)
                .stretchTo(targetPosition)
                .play();

              const soundPromise = playSound ? new Promise((resolve) => {
                const audio = new Audio(weaponEffects.override.sound);
                audio.volume = 0.8;
                audio.addEventListener("ended", resolve);
                audio.play();
              }) : Promise.resolve();

              await Promise.all([animationPromise, soundPromise]);
            }
          }
        }
      }
    }).render(true);
  } else {
    ui.notifications.info(`No equipped weapons found for ${actor.name}.`);
  }
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

// Show the weapon selection dialog
const actor = game.actors.get(actorId);
showWeaponSelectionDialog(actor);


