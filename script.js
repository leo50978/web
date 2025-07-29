const toggleBtn = document.getElementById('toggleAboutBtn');
  const aboutSection = document.getElementById('aboutSection');
  const toggleIcon = document.getElementById('toggleIcon');

  toggleBtn.addEventListener('click', () => {
    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      // Fermer la section
      aboutSection.style.maxHeight = null;
      aboutSection.setAttribute('aria-hidden', 'true');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleIcon.style.transform = 'rotate(0deg)';
    } else {
      // Ouvrir la section
      aboutSection.style.maxHeight = aboutSection.scrollHeight + 'px';
      aboutSection.setAttribute('aria-hidden', 'false');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleIcon.style.transform = 'rotate(180deg)';
      // Scroll vers la section (un peu décalé)
      setTimeout(() => {
        aboutSection.scrollIntoView({behavior: 'smooth', block: 'start'});
      }, 300);
    }
  });

  // Si la fenêtre est redimensionnée, ajuste la maxHeight si ouvert
  window.addEventListener('resize', () => {
    if (toggleBtn.getAttribute('aria-expanded') === 'true') {
      aboutSection.style.maxHeight = aboutSection.scrollHeight + 'px';
    }
  });
     function openFullscreen(button) {
    const article = button.closest("article");
    const img = article.querySelector("img");

    const fullImg = document.createElement("div");
    fullImg.style.position = "fixed";
    fullImg.style.top = "0";
    fullImg.style.left = "0";
    fullImg.style.width = "100%";
    fullImg.style.height = "100%";
    fullImg.style.background = "rgba(0, 0, 0, 0.9)";
    fullImg.style.display = "flex";
    fullImg.style.alignItems = "center";
    fullImg.style.justifyContent = "center";
    fullImg.style.zIndex = "9999";
    fullImg.style.cursor = "zoom-out";

    // Bloquer scroll arrière-plan
    document.body.style.overflow = "hidden";

    const imgClone = document.createElement("img");
    imgClone.src = img.src;
    imgClone.alt = img.alt;
    imgClone.style.maxWidth = "90%";
    imgClone.style.maxHeight = "90%";
    imgClone.style.borderRadius = "8px";
    fullImg.appendChild(imgClone);

    // Bouton fermeture
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Fermer";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "20px";
    closeBtn.style.right = "20px";
    closeBtn.style.padding = "10px 15px";
    closeBtn.style.background = "#fff";
    closeBtn.style.border = "none";
    closeBtn.style.borderRadius = "4px";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.fontWeight = "600";
    fullImg.appendChild(closeBtn);

    function closeModal() {
      document.body.removeChild(fullImg);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    }

    closeBtn.addEventListener("click", closeModal);

    // Fermer au clic en dehors de l’image
    fullImg.addEventListener("click", (e) => {
      if (e.target === fullImg) closeModal();
    });

    // Fermer au clavier (Escape)
    function onKeyDown(e) {
      if (e.key === "Escape") {
        closeModal();
      }
    }
    document.addEventListener("keydown", onKeyDown);

    document.body.appendChild(fullImg);

    // Focus sur bouton fermer pour accessibilité
    closeBtn.focus();
  }
  // Mobile menu toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  let open = false;
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('max-h-0');
    mobileMenu.classList.toggle('max-h-screen');
    open = !open;
  });

  // Scroll Spy
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const spyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active-link', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(section => spyObserver.observe(section));

  // Fade-in
  const faders = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  faders.forEach(el => fadeObserver.observe(el));

  // Compteurs animés
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.dataset.target;
      const count = +counter.innerText;
      const increment = Math.ceil(target / 50);
      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target;
      }
    };
    const countObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) updateCount();
      });
    }, { threshold: 0.8 });
    countObs.observe(counter);
  });
   // Modal : 15 minutes offertes
  function openModal() {
    document.getElementById("modal").classList.remove("hidden");
  }

  function closeModal() {
    document.getElementById("modal").classList.add("hidden");
  }

  // Modal : Choisir un plan
  function openPlanModal(planName) {
    const modal = document.getElementById('planModal');
    const planText = document.getElementById('planName');
    const planInput = document.getElementById('planInput');

    planText.textContent = planName;
    planInput.value = planName;
    modal.classList.remove('hidden');
  }

  function closePlanModal() {
    document.getElementById('planModal').classList.add('hidden');
  }

  // Fermer les modals si clic à l'extérieur
  window.onclick = function (e) {
    const modal15 = document.getElementById("modal");
    const planModal = document.getElementById("planModal");

    if (e.target === modal15) closeModal();
    if (e.target === planModal) closePlanModal();
  };
   // Gestion de l'envoi du formulaire des plans
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("planForm");
    const confirmation = document.getElementById("confirmationMessage");

    form.addEventListener("submit", function (e) {
      e.preventDefault(); // empêche la soumission classique

      const formData = new FormData(form);

      fetch("https://formspree.io/f/yourFormID", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      }).then(response => {
        if (response.ok) {
          form.classList.add("hidden");
          confirmation.classList.remove("hidden");
        } else {
          alert("Erreur lors de l'envoi. Veuillez réessayer.");
        }
      });
    });
  });
 