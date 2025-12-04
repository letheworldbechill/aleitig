document.addEventListener("DOMContentLoaded", () => {
  const stepSections = document.querySelectorAll(".step");
  const navButtons = document.querySelectorAll(".step-nav-button");

  // Info-Buttons (auf/zu klappen)
  const infoButtons = document.querySelectorAll(".info-button");
  infoButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("expanded");
    });
  });

  // Checkbox-Logik: zeigt/versteckt den "Nächster Schritt" Button
  const allCheckboxes = document.querySelectorAll(
    ".confirm-checkbox input[type='checkbox']"
  );

  allCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const stepSection = checkbox.closest(".step");
      updateNextButtonVisibility(stepSection);
    });
  });

  // Status initial prüfen
  stepSections.forEach((section) => updateNextButtonVisibility(section));

  function updateNextButtonVisibility(stepSection) {
    const checkboxes = stepSection.querySelectorAll(
      ".confirm-checkbox input[type='checkbox']"
    );
    const nextButton = stepSection.querySelector(".next-step-btn");

    if (!nextButton) return;

    if (checkboxes.length === 0) {
      nextButton.classList.remove("visible");
      return;
    }

    const allChecked = Array.from(checkboxes).every((cb) => cb.checked);

    if (allChecked) {
      nextButton.classList.add("visible");
    } else {
      nextButton.classList.remove("visible");
    }
  }

  // Navigation zwischen den Schritten per Tabs oben
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      activateStep(targetId);
    });
  });

  // "Nächster Schritt" Buttons unten
  const nextStepButtons = document.querySelectorAll(".next-step-btn");
  nextStepButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-next-step");
      if (target === "done") {
        // Letzter Schritt – hier kannst du z.B. eine Meldung anzeigen oder redirecten
        alert("Alle Schritte abgeschlossen!");
      } else {
        activateStep(target);
      }
    });
  });

  function activateStep(stepId) {
    // Abschnitt sichtbar machen
    stepSections.forEach((section) => {
      if (section.id === stepId) {
        section.classList.add("step-active");
      } else {
        section.classList.remove("step-active");
      }
    });

    // Nav-Button aktiv setzen
    navButtons.forEach((btn) => {
      if (btn.getAttribute("data-target") === stepId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // nach oben scrollen (optional)
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});
