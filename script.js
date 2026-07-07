/* =========================================================
   Whack-A-Pest — vanilla JS interactivity
   No frameworks, no build step. Loaded with `defer`, so the
   DOM is already parsed by the time this runs.
   ========================================================= */

/* ---------- sticky / glass header on scroll ---------- */
(function stickyHeader() {
  var header = document.getElementById("site-header");
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
/* ---------- mobile menu ---------- */
(function mobileMenu() {
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("mobile-menu");
  var icon = document.getElementById("menu-icon");
  if (!toggle || !menu || !icon) return;

  var open = false;

  function setOpen(next) {
    open = next;
    menu.classList.toggle("hidden", !open);
    toggle.setAttribute("aria-expanded", String(open));
    icon.innerHTML = open
      ? '<use href="#icon-x"></use>'
      : '<use href="#icon-menu"></use>';
  }

  toggle.addEventListener("click", function () {
    setOpen(!open);
  });

  menu.querySelectorAll(".mobile-link").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && open) setOpen(false);
  });
})();
/* ---------- FAQ accordion (one open at a time, first open by default) ---------- */
(function faqAccordion() {
  var items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  function closeAll() {
    items.forEach(function (item) {
      item.classList.remove("open");
      var q = item.querySelector(".faq-question");
      if (q) q.setAttribute("aria-expanded", "false");
    });
  }

  function openItem(item) {
    item.classList.add("open");
    var q = item.querySelector(".faq-question");
    if (q) q.setAttribute("aria-expanded", "true");
  }

  items.forEach(function (item) {
    var question = item.querySelector(".faq-question");
    if (!question) return;
    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      closeAll();
      if (!isOpen) openItem(item);
    });
  });

  // First FAQ open by default, matching the original site.
  openItem(items[0]);
})();
/* ---------- footer year ---------- */
(function footerYear() {
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();

/* ---------- quote form -> Web3Forms ---------- */
(function quoteForm() {
  var form = document.getElementById("quote-form");
  var status = document.getElementById("quote-status");
  var submitBtn = document.getElementById("quote-submit");
  if (!form || !status || !submitBtn) return;

  var defaultBtnHTML = submitBtn.innerHTML;

  function showStatus(message, isError) {
    status.textContent = message;
    status.style.color = isError ? "#f87171" : "var(--primary)";
    status.classList.remove("hidden");
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";
    status.classList.add("hidden");

    var formData = new FormData(form);
    var payload = Object.fromEntries(formData.entries());

    try {
      var response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      var result = await response.json();

      if (result.success) {
        showStatus(
          "Thanks — we've got your request and will be in touch shortly, usually the same day.",
          false
        );
        form.reset();
      } else {
        throw new Error(result.message || "Something went wrong.");
      }
    } catch (err) {
      showStatus(
        "Something went wrong sending that. Please WhatsApp or call us directly — we don't want you to miss out.",
        true
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = defaultBtnHTML;
    }
  });
})();
