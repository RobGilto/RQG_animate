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
  "Arbalest": { 
    ranged: { animation: "jb2a.bolt.cold.purple", sound: "path/to/your/sling_sound.mp3" }
  },
  "Atlatl Dart": { 
    ranged: { animation: "jb2a.dart.01.throw.physical", sound: "path/to/your/sling_sound.mp3" }
  },
  "Atlatl Javelin": { 
    ranged: { animation: "jb2a.spear.throw.01", sound: "path/to/your/sling_sound.mp3" }
  },
  "Battle Axe": { 
    melee: { animation: "jb2a.greataxe.melee.fire.yellow", sound: "path/to/your/sling_sound.mp3" }
  },
  "Battle Axe, Iron": { 
    melee: { animation: "jb2a.greataxe.melee.fire.blue", sound: "path/to/your/sling_sound.mp3" }
  },
  "Bite": { 
    melee: { animation: "jb2a.bite.200px.red", sound: "path/to/your/sling_sound.mp3" }
  },
  "Crossbow Bolts": { 
    ranged: { animation: "jb2a.bolt.cold.purple", sound: "path/to/your/sling_sound.mp3" }
  },
  "Bite": { 
    melee: { animation: "jb2a.bite.200px.red", sound: "path/to/your/sling_sound.mp3" }
  },
  "Dagger Axe": { 
    melee: { animation: "jb2a.bite.200px.red", sound: "path/to/your/sling_sound.mp3" }
  },
  "Dart": { 
    ranged: { animation: "jb2a.dart.01.throw.physical", sound: "path/to/your/sling_sound.mp3" }
  },
  "Elf Bow": { 
    ranged: { animation: "jb2a.arrow.cold.green", sound: "path/to/your/sling_sound.mp3" }
  },
  "Gore": { 
    melee: { animation: "jb2a.claws.200px.red", sound: "path/to/your/sling_sound.mp3" }
  },
  "Grapple": { 
    melee: { animation: "jb2a.melee_generic.bludgeoning.one_handed", sound: "path/to/your/sling_sound.mp3" }
  },
  "Great Axe": { 
    melee: { animation: "jb2a.greataxe.melee", sound: "path/to/your/sling_sound.mp3" }
  },
  "Great Hammer": { 
    melee: { animation: "jb2a.melee_attack.02.warhammer", sound: "path/to/your/sling_sound.mp3" }
  },
  "Greatsword": { 
    melee: { animation: "jb2a.greatsword.melee", sound: "path/to/your/sling_sound.mp3" }
  },
  "Head Butt": { 
    melee: { animation: "jb2a.melee_generic.bludgeoning.one_handed", sound: "path/to/your/sling_sound.mp3" }
  },
  "Heavy Cestus": { 
    melee: { animation: "jb2a.melee_generic.bludgeoning.one_handed", sound: "path/to/your/sling_sound.mp3" }
  },
  "Heavy Crossbow": { 
    ranged: { animation: "jb2a.bolt.physical", sound: "path/to/your/sling_sound.mp3" }
  },
  "Heavy Mace": { 
    melee: { animation: "jb2a.mace.melee.01", sound: "path/to/your/sling_sound.mp3" }
  },
  "Hug": { 
    melee: { animation: "jb2a.melee_generic.bludgeoning.one_handed", sound: "path/to/your/sling_sound.mp3" }
  },
  "Javelin": { 
    ranged: { animation: "jb2a.javelin", sound: "path/to/your/sling_sound.mp3" }
  },
  "Kick": { 
    melee: { animation: "jb2a.melee_generic.bludgeoning.one_handed", sound: "path/to/your/sling_sound.mp3" }
  },
  "Kopis": { 
    melee: { animation: "jb2a.melee_attack.01.sickle", sound: "path/to/your/sling_sound.mp3" }
  },
  "Lance": { 
    melee: { animation: "jb2a.spear.melee", sound: "path/to/your/sling_sound.mp3" }
  },
  "Large Wooden Shield": { 
    melee: { animation: "jb2a.melee_attack.06.shield", sound: "path/to/your/sling_sound.mp3" }
  },
  "Light Cestus": { 
    melee: { animation: "jb2a.melee_generic.bludgeoning.one_handed", sound: "path/to/your/sling_sound.mp3" }
  },
  "Light Crossbow": { 
    ranged: { animation: "jb2a.bolt.physical", sound: "path/to/your/sling_sound.mp3" }
  },
  "Light Mace": { 
    melee: { animation: "jb2a.mace.melee", sound: "path/to/your/sling_sound.mp3" }
  },
  "Long Spear": { 
    melee: { animation: "jb2a.spear.melee.fire.white", sound: "path/to/your/sling_sound.mp3" }
  },
  "Maul": { 
    melee: { animation: "jb2a.bite.200px.red", sound: "path/to/your/sling_sound.mp3" }
  },
  "Medium Wooden Shield": { 
    melee: { animation: "jb2a.melee_attack.06.shield", sound: "path/to/your/sling_sound.mp3" }
  },
  "Parrying Dagger": { 
    melee: { animation: "jb2a.dagger.melee.02.white", sound: "path/to/your/dagger_melee_sound.mp3" },
    ranged: { animation: "jb2a.dagger.throw.01.white", sound: "path/to/your/dagger_throw_sound.mp3" }
  },
  "Parrying Dagger": { 
    melee: { animation: "jb2a.dagger.melee.02.white", sound: "path/to/your/dagger_melee_sound.mp3" },
  },
  "Pole Lasso": { 
    melee: { animation: "jb2a.melee_generic.bludgeoning.one_handed", sound: "path/to/your/dagger_melee_sound.mp3" }
  },
  "Quarterstaff": { 
    melee: { animation: "jb2a.quarterstaff", sound: "path/to/your/dagger_melee_sound.mp3" }
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
    return null;  // End the macro immediately
  }

  // Check if exactly one target is selected
  const selectedTargets = Array.from(game.user.targets);
  if (selectedTargets.length !== 1) {
    ui.notifications.warn("Exactly one target must be selected.");
    return null;  // End the macro immediately
  }

  const targetToken = selectedTargets[0];
  if (targetToken.id === selectedToken.id) {
    ui.notifications.warn("The target cannot be the same as the selected character.");
    return null;  // End the macro immediately
  }

  return { selectedToken, targetToken };
}

// Function to trigger animations and sounds
async function triggerEffects(chatMessage, selectedToken, targetToken) {
  // Extract the flavor text directly from the chat message
  const flavorText = chatMessage.flavor || "";

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
  let isMeleeAttack = weaponUsed && weaponEffects[weaponUsed].melee !== undefined;
  let isRangedAttack = weaponUsed && weaponEffects[weaponUsed].ranged !== undefined;

  // Override to always prefer ranged if both are available
  if (isMeleeAttack && isRangedAttack) {
    isRangedAttack = true;
    isMeleeAttack = false;
  }

  const isSuccess = flavorText.includes("Success");
  const isSpecial = flavorText.includes("Special");
  const isCritical = flavorText.includes("Critical");
  const isFailure = flavorText.includes("Failure");
  const isFumble = flavorText.includes("Fumble");

  console.log(`Weapon Used: ${weaponUsed}`);
  console.log(`Is Melee Attack: ${isMeleeAttack}`);
  console.log(`Is Ranged Attack: ${isRangedAttack}`);
  console.log(`Flavor Text: ${flavorText}`);

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
    let attackType = isMeleeAttack ? "melee" : "ranged";

    console.log(`Attack Type: ${attackType}`);

    if (!weaponEffects[weaponUsed]) {
      console.error(`No weapon effects found for weapon: ${weaponUsed}`);
      return;
    }

    if (!weaponEffects[weaponUsed][attackType]) {
      console.error(`No ${attackType} effects found for weapon: ${weaponUsed}`);
      return;
    }

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
            const selectedWeaponId = html.find('[name="weapon-select"]').val();
            const selectedWeapon = actor.items.get(selectedWeaponId);
            if (selectedWeapon) {
              ui.notifications.info(`You selected: ${selectedWeapon.name}`);

              // Determine if the attack is melee or ranged
              const effects = weaponEffects[selectedWeapon.name];
              let isMeleeAttack = effects.melee !== undefined;
              let isRangedAttack = effects.ranged !== undefined;

              // Override to always prefer ranged if both are available
              if (isMeleeAttack && isRangedAttack) {
                isRangedAttack = true;
                isMeleeAttack = false;
              }

              const attackType = isMeleeAttack ? "melee" : "ranged";

              // Perform grid distance check before converting the item to chat
              const gridDistance = canvas.grid.size;
              const dx = Math.abs(targetToken.x - selectedToken.x);
              const dy = Math.abs(targetToken.y - selectedToken.y);
              const distance = Math.sqrt(dx * dx + dy * dy);

              console.log(`Distance between tokens: ${distance}`);
              console.log(`Grid distance: ${gridDistance}`);

              if (attackType === "ranged" || (attackType === "melee" && distance <= gridDistance)) {
                const item = await fromUuid(`Actor.${actorId}.Item.${selectedWeaponId}`);
                item.toChat();
              } else {
                ui.notifications.warn("The target must be exactly one grid space away for melee attack.");
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
            const selectedWeaponId = html.find('[name="weapon-select"]').val();
            const selectedWeapon = actor.items.get(selectedWeaponId);
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
  triggerEffects(chatMessage, selectedToken, targetToken);
});

// Show the weapon selection dialog
const actor = game.actors.get(actorId);
showWeaponSelectionDialog(actor);
