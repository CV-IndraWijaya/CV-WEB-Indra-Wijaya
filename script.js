/* =====================================================
   INITIALIZATION & DOM READY
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("loadingScreen").classList.add("hidden");
  }, 1500);

  // Initialize all features
  setupNavigation();
  setupScrollReveal();
  setupModalHandlers();
  setupContactForm();
  setupSmoothScroll();
  setupScrollTop();
  setupTheme();
});

/* =====================================================
     NAVIGATION & MOBILE MENU
  ===================================================== */
function setupNavigation() {
  const navbar = document.getElementById("navbar");
  const navbarMenu = document.getElementById("navbarMenu");
  const navItems = navbarMenu.querySelectorAll(".nav-item");

  const navbarToggle = document.getElementById("navbarToggle");

  // Scroll behavior for navbar
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Active menu item based on scroll position
  window.addEventListener("scroll", () => {
    let current = "";

    navItems.forEach((item) => {
      const sectionId = item.getAttribute("data-section");
      const section = document.getElementById(sectionId);

      if (section) {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          current = sectionId;
        }
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("data-section") === current) {
        item.classList.add("active");
      }
    });
  });

  // Smooth scroll for nav links
  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = item.getAttribute("data-section");
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
      // close mobile menu after click
      if (navbarMenu && navbarMenu.classList.contains("open")) {
        navbarMenu.classList.remove("open");
        if (navbarToggle) navbarToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Mobile toggle button
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener("click", () => {
      const isOpen = navbarMenu.classList.toggle("open");
      navbarToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close menu on resize to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && navbarMenu.classList.contains("open")) {
        navbarMenu.classList.remove("open");
        navbarToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      const target = e.target;
      if (navbarMenu.classList.contains("open") && navbarToggle && navbarMenu) {
        if (!navbarMenu.contains(target) && !navbarToggle.contains(target)) {
          navbarMenu.classList.remove("open");
          navbarToggle.setAttribute("aria-expanded", "false");
        }
      }
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navbarMenu.classList.contains("open")) {
        navbarMenu.classList.remove("open");
        navbarToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
}

/* =====================================================
     SMOOTH SCROLL
  ===================================================== */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* =====================================================
     SCROLL REVEAL ANIMATION
  ===================================================== */
function setupScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    reveals.forEach((element) => {
      const top = element.getBoundingClientRect().top;
      const isVisible = top < window.innerHeight - 100;

      if (isVisible) {
        element.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Trigger on load
}

/* =====================================================
     EXPERIENCE DETAILS TOGGLE
  ===================================================== */
function toggleDetail(btn) {
  const card = btn.closest(".experience-card");
  const details = card.querySelector(".experience-details");
  const isOpen = details.style.display !== "none";

  // Close all other details
  document.querySelectorAll(".experience-details").forEach((detail) => {
    detail.style.display = "none";
  });
  document.querySelectorAll(".toggle-btn").forEach((button) => {
    button.classList.remove("expanded");
  });

  // Toggle current
  if (!isOpen) {
    details.style.display = "block";
    btn.classList.add("expanded");
  } else {
    details.style.display = "none";
    btn.classList.remove("expanded");
  }
}

/* =====================================================
     PROJECT DETAILS TOGGLE
  ===================================================== */
function toggleProjectDetail(btn) {
  const card = btn.closest(".project-card");
  const details = card.querySelector(".project-details");
  const isOpen = details.style.display !== "none";

  // Close all other details
  document.querySelectorAll(".project-details").forEach((detail) => {
    detail.style.display = "none";
  });
  document.querySelectorAll(".project-toggle").forEach((button) => {
    button.classList.remove("expanded");
  });

  // Toggle current
  if (!isOpen) {
    details.style.display = "block";
    btn.classList.add("expanded");
  } else {
    details.style.display = "none";
    btn.classList.remove("expanded");
  }
}

/* =====================================================
     MODAL HANDLERS (SUCCESS MODAL)
  ===================================================== */
function setupModalHandlers() {
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".modal-close");

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const modal = e.target.closest(".modal");
      if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  });

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modals.forEach((modal) => {
        modal.classList.remove("active");
      });
      document.body.style.overflow = "auto";
    }
  });
}

/* =====================================================
   CONTACT FORM - FORMSPREE
===================================================== */
function setupContactForm() {
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Get form data
      const name = form.querySelector('input[name="name"]').value;
      const email = form.querySelector('input[name="email"]').value;
      const subject = form.querySelector('input[name="subject"]').value;
      const message = form.querySelector('textarea[name="message"]').value;

      // Validasi
      if (!name || !email || !message) {
        showMessage("❌ Semua field harus diisi!", "error", formMessage);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showMessage("❌ Email tidak valid!", "error", formMessage);
        return;
      }

      try {
        // Kirim ke Formspree
        const formData = new FormData(form);

        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          // Reset form
          form.reset();

          // Tampilkan pesan sukses
          showMessage(
            "✅ Pesan berhasil dikirim! Terima kasih telah menghubungi saya.",
            "success",
            formMessage
          );

          // Tampilkan success modal
          setTimeout(() => {
            const successModal = document.getElementById("successModal");
            if (successModal) {
              successModal.classList.add("active");
            }
          }, 800);

          // Hapus pesan setelah 5 detik
          setTimeout(() => {
            formMessage.className = "form-message";
          }, 5000);
        } else {
          showMessage(
            "❌ Terjadi kesalahan saat mengirim pesan.",
            "error",
            formMessage
          );
        }
      } catch (error) {
        console.error("Error:", error);
        showMessage(
          "❌ Koneksi gagal. Silakan coba lagi.",
          "error",
          formMessage
        );
      }
    });
  }
}

function showMessage(text, type, element) {
  element.textContent = text;
  element.className = `form-message ${type}`;
}

/* =====================================================
     SCROLL TOP BUTTON
  ===================================================== */
function setupScrollTop() {
  const scrollTop = document.getElementById("scrollTop");
  const actionBar = document.getElementById("actionBar");

  if (scrollTop) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollTop.classList.add("visible");
      } else {
        scrollTop.classList.remove("visible");
      }
    });

    scrollTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  if (actionBar) {
    window.addEventListener("scroll", () => {
      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      if (scrollPercent > 20) {
        actionBar.classList.add("visible");
      } else {
        actionBar.classList.remove("visible");
      }
    });
  }
}

/* =====================================================
     THEME TOGGLE (DARK MODE)
  ===================================================== */
function setupTheme() {
  // Check system preference
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.documentElement.style.colorScheme = "dark";
  }

  // Listen for theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      document.documentElement.style.colorScheme = e.matches ? "dark" : "light";
    });
}

/* =====================================================
     UTILITY FUNCTIONS
  ===================================================== */

// Debounce function for performance
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Analytics logging removed - no longer needed

/* ===== PROJECT CARD V2 FUNCTIONS ===== */

// Toggle project details (expanded/collapsed)
function toggleDetails(btn) {
  const detailsContainer = btn.nextElementSibling;
  const isOpen = detailsContainer.style.display === "block";

  // Close animation
  if (isOpen) {
    detailsContainer.style.animation = "none";
    setTimeout(() => {
      detailsContainer.style.animation = "slideUp 0.3s ease";
    }, 10);
    detailsContainer.style.display = "none";
  } else {
    // Open animation
    detailsContainer.style.display = "block";
    detailsContainer.style.animation = "slideDown 0.3s ease";
  }

  // Toggle button state
  btn.classList.toggle("expanded");
}

// ================= COPY CODE (FINAL FIX) =================
function copyCode(btn, codeId) {
  const codeElement = document.getElementById(codeId);

  if (!codeElement) {
    console.error("Code not found:", codeId);
    return;
  }

  const text = codeElement.innerText;
  const originalHTML = btn.innerHTML;

  // Clipboard API (localhost / https)
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.classList.add("copied");

        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.classList.remove("copied");
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  // Fallback (file://)
  else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => (btn.innerHTML = originalHTML), 2000);
  }
}

// Add slideUp animation (complement to slideDown)
const style = document.createElement("style");
style.textContent = `
    @keyframes slideUp {
      from {
        opacity: 1;
        max-height: 500px;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        max-height: 0;
        transform: translateY(-10px);
      }
    }
    
    @keyframes slideDown {
      from {
        opacity: 0;
        max-height: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        max-height: 500px;
        transform: translateY(0);
      }
    }
  `;

function toggleSection(id, btn) {
  const content = document.getElementById(id);
  const icon = btn.querySelector("i");
  const span = btn.querySelector("span");

  if (content.style.display === "none" || content.style.display === "") {
    content.style.display = "block";
    icon.className = "fas fa-eye-slash";
    span.innerText = "Hide Code";
  } else {
    content.style.display = "none";
    icon.className = "fas fa-eye";
    span.innerText = "Show Code";
  }
}

function copyCode(btn, elementId) {
  const codeElement = document.getElementById(elementId);
  const textToCopy = codeElement.innerText;

  navigator.clipboard.writeText(textToCopy).then(() => {
    const span = btn.querySelector("span");
    const icon = btn.querySelector("i");
    const originalText = span.innerText;

    span.innerText = "Copied!";
    icon.className = "fas fa-check";

    setTimeout(() => {
      span.innerText = originalText;
      icon.className = "fas fa-copy";
    }, 2000);
  });
}

document.head.appendChild(style);
