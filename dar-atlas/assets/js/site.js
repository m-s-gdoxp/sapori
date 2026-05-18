const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const page = document.body.dataset.page || "";

const header = $("[data-site-header]");
const menuToggle = $("[data-menu-toggle]");
const primaryNav = $("[data-primary-nav]");

if (header) {
  const syncHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      document.body.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

$$("[data-nav]").forEach((link) => {
  if (link.dataset.nav === page) {
    link.classList.add("is-active");
    link.setAttribute("aria-current", "page");
  }
});

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
};

$$("[data-booking-form]").forEach((form) => {
  const status = $("[data-booking-status]", form);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const arrival = data.get("arrival");
    const departure = data.get("departure");
    if (!arrival || !departure) {
      status.textContent = "Please choose arrival and departure dates.";
      status.classList.add("is-visible");
      return;
    }
    const summary = `Stay request: ${formatDate(arrival)} to ${formatDate(departure)}, ${data.get("guests")} guests, ${data.get("rooms")} room(s).`;
    const subject = encodeURIComponent("Dar Atlas Marrakech stay inquiry");
    const body = encodeURIComponent(`${summary}\n\nPlease confirm availability and best direct rate.`);
    status.innerHTML = `${summary} <a href="mailto:m.s.gdoxp@gmail.com?subject=${subject}&body=${body}">Send this inquiry</a>`;
    status.classList.add("is-visible");
  });
});

$$("[data-contact-form]").forEach((form) => {
  const status = $("[data-contact-status]", form);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Dar Atlas Marrakech ${data.get("interest")} inquiry`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone") || "Not provided"}\nInterest: ${data.get("interest")}\nMessage: ${data.get("message")}`
    );
    status.innerHTML = `Your inquiry is ready. <a href="mailto:m.s.gdoxp@gmail.com?subject=${subject}&body=${body}">Open email to send it</a>.`;
    status.classList.add("is-visible");
    form.reset();
  });
});

$$("[data-filter-group]").forEach((group) => {
  const target = document.querySelector(group.dataset.filterGroup);
  if (!target) return;

  group.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;
    const filter = button.dataset.filter;

    $$("button[data-filter]", group).forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    $$("[data-tags]", target).forEach((item) => {
      const tags = item.dataset.tags.split(" ");
      item.classList.toggle("is-hidden", filter !== "all" && !tags.includes(filter));
    });
  });
});

const lightbox = $("[data-lightbox]");
if (lightbox) {
  const lightboxImage = $("img", lightbox);
  const closeButton = $("button", lightbox);

  $$("[data-lightbox-src]").forEach((item) => {
    item.addEventListener("click", () => {
      lightboxImage.src = item.dataset.lightboxSrc;
      lightboxImage.alt = item.dataset.lightboxAlt || "";
      lightbox.classList.add("is-open");
      closeButton.focus();
    });
  });

  const close = () => {
    lightbox.classList.remove("is-open");
    lightboxImage.removeAttribute("src");
  };

  closeButton.addEventListener("click", close);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) close();
  });
}

$$("[data-newsletter]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = $("input", form);
    const button = $("button", form);
    if (input.value.trim()) {
      button.textContent = "Sent";
      input.value = "";
      setTimeout(() => {
        button.textContent = "Join";
      }, 1800);
    }
  });
});

const revealItems = $$("[data-reveal]");
if ("IntersectionObserver" in window && revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
