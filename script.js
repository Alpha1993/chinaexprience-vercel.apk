// Festival data
const festivals = [
  {
    name: "Chinese New Year",
    chineseName: "春节",
    date: "January/February",
    duration: "15 days",
    description:
      "The most important celebration in Chinese culture, marking the beginning of the lunar new year with family reunions, fireworks, and traditional customs.",
    traditions: [
      "Red envelopes (hongbao) with money",
      "Dragon and lion dances",
      "Reunion dinner on New Year's Eve",
      "Fireworks and firecrackers",
      "Spring cleaning before the new year",
    ],
    significance: "Family unity, good fortune, and fresh beginnings",
    colors: "linear-gradient(45deg, #dc2626 0%, #eab308 100%)",
    emoji: "🐉",
    funFact:
      "The celebration lasts for 15 days, ending with the Lantern Festival!",
  },
  {
    name: "Mid-Autumn Festival",
    chineseName: "中秋节",
    date: "September/October",
    duration: "3 days",
    description:
      "A harvest festival celebrating the full moon, family reunions, and the legendary Chang'e who flew to the moon.",
    traditions: [
      "Eating mooncakes with family",
      "Moon gazing and appreciation",
      "Lantern displays and parades",
      "Family gatherings and stories",
      "Giving gifts to loved ones",
    ],
    significance: "Family unity, harvest gratitude, and celestial beauty",
    colors: "linear-gradient(45deg, #f59e0b 0%, #fbbf24 100%)",
    emoji: "🌕",
    funFact:
      "Mooncakes often contain surprise ingredients like salted egg yolks representing the moon!",
  },
  {
    name: "Dragon Boat Festival",
    chineseName: "端午节",
    date: "May/June",
    duration: "3 days",
    description:
      "Commemorating the poet Qu Yuan with exciting dragon boat races, delicious zongzi, and protective traditions.",
    traditions: [
      "Dragon boat racing competitions",
      "Eating pyramid-shaped zongzi",
      "Hanging aromatic herbs",
      "Wearing colorful silk threads",
      "Traditional folk performances",
    ],
    significance: "Honor, courage, and protection from evil spirits",
    colors: "linear-gradient(45deg, #059669 0%, #3b82f6 100%)",
    emoji: "🐲",
    funFact:
      "Dragon boat teams can have up to 20 paddlers racing to drumbeats!",
  },
  {
    name: "Lantern Festival",
    chineseName: "元宵节",
    date: "February/March",
    duration: "1 day",
    description:
      "The magical finale of Chinese New Year celebrations, illuminating the night with countless beautiful lanterns and sweet tangyuan.",
    traditions: [
      "Colorful lantern displays",
      "Solving riddles on lanterns",
      "Eating sweet tangyuan",
      "Lion and dragon dances",
      "Traditional opera performances",
    ],
    significance: "Light over darkness, unity, and wishes fulfilled",
    colors: "linear-gradient(45deg, #9333ea 0%, #ec4899 100%)",
    emoji: "🏮",
    funFact:
      "Some lanterns can be as large as buildings and shaped like animals or mythical creatures!",
  },
];

// Hero slide data
const heroSlides = [
  {
    title: "Discover the Wonders of China",
    subtitle: "A Journey Through Culture, Food, and Traditions",
    background: "linear-gradient(45deg, #dc2626 0%, #991b1b 50%, #eab308 100%)",
  },
  {
    title: "Taste Authentic Chinese Cuisine",
    subtitle: "From Street Food to Imperial Delicacies",
    background: "linear-gradient(45deg, #eab308 0%, #f59e0b 50%, #dc2626 100%)",
  },
  {
    subtitle: "The Leaders of Tomorrow ",
    background: "linear-gradient(45deg, #991b1b 0%, #ec4899 50%, #9333ea 100%)",
  },
];

// Global state
let currentSlide = 0;
let currentFestival = 0;
let slideInterval;
let activeSection = "hero";

// Initialize app
document.addEventListener("DOMContentLoaded", function () {
  initializeHero();
  initializeNavigation();
  initializeFestivals();
  initializeScrollSpy();
  setupSmoothScrolling();
});

// Hero functionality
function initializeHero() {
  updateHeroSlide();
  startSlideShow();

  // Slide indicators
  const indicators = document.querySelectorAll(".indicator");
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentSlide = index;
      updateHeroSlide();
      resetSlideShow();
    });
  });
}

function updateHeroSlide() {
  const slide = heroSlides[currentSlide];
  const heroBackground = document.getElementById("hero-background");
  const heroTitle = document.getElementById("hero-title");
  const heroSubtitle = document.getElementById("hero-subtitle");
  const indicators = document.querySelectorAll(".indicator");

  if (heroBackground) heroBackground.style.background = slide.background;
  if (heroTitle) heroTitle.textContent = slide.title;
  if (heroSubtitle) heroSubtitle.textContent = slide.subtitle;

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentSlide);
  });
}

function startSlideShow() {
  slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    updateHeroSlide();
  }, 5000);
}

function resetSlideShow() {
  clearInterval(slideInterval);
  startSlideShow();
}

// Navigation functionality
function initializeNavigation() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileNav = document.getElementById("mobile-nav");
  const navItems = document.querySelectorAll(".nav-item, .mobile-nav-item");

  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("show");
    });
  }

  // Navigation items
  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const section = e.target.getAttribute("data-section");
      scrollToSection(section);

      // Close mobile menu
      if (mobileNav) {
        mobileNav.classList.remove("show");
      }
    });
  });
}

function updateActiveNavItem(section) {
  const navItems = document.querySelectorAll(".nav-item, .mobile-nav-item");
  navItems.forEach((item) => {
    const itemSection = item.getAttribute("data-section");
    item.classList.toggle("active", itemSection === section);
  });
}

// Festival functionality
function initializeFestivals() {
  updateFestivalContent();

  const festivalBtns = document.querySelectorAll(".festival-btn");
  festivalBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      currentFestival = index;
      updateFestivalContent();
      updateActiveFestivalBtn();
    });
  });
}

function updateFestivalContent() {
  const festival = festivals[currentFestival];

  // Update header
  const festivalHeader = document.getElementById("festival-header");
  if (festivalHeader) {
    festivalHeader.style.background = festival.colors;
  }

  updateElementContent("festival-emoji-large", festival.emoji);
  updateElementContent("festival-name", festival.name);
  updateElementContent("festival-chinese-name", festival.chineseName);
  updateElementContent("festival-description", festival.description);
  updateElementContent("significance-text", festival.significance);
  updateElementContent("fun-fact-text", festival.funFact);

  // Update traditions
  const traditionsGrid = document.getElementById("traditions-grid");
  if (traditionsGrid) {
    traditionsGrid.innerHTML = "";
    festival.traditions.forEach((tradition) => {
      const div = document.createElement("div");
      div.className = "tradition-item";
      div.textContent = tradition;
      traditionsGrid.appendChild(div);
    });
  }

  // Add fade animation
  const festivalContent = document.getElementById("festival-content");
  if (festivalContent) {
    festivalContent.classList.remove("animate-fade-in");
    setTimeout(() => {
      festivalContent.classList.add("animate-fade-in");
    }, 10);
  }
}

function updateActiveFestivalBtn() {
  const festivalBtns = document.querySelectorAll(".festival-btn");
  festivalBtns.forEach((btn, index) => {
    btn.classList.toggle("active", index === currentFestival);
  });
}

function updateElementContent(id, content) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = content;
  }
}

// Scroll functionality
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const navHeight = document.querySelector(".navbar").offsetHeight;
    const elementPosition = element.offsetTop - navHeight;

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
}

function initializeScrollSpy() {
  window.addEventListener("scroll", () => {
    const sections = [
      "hero",
      "chinese-food",
      "chinese-festivals",
      "student-experience",
    ];
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const height = element.offsetHeight;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + height
        ) {
          if (activeSection !== section) {
            activeSection = section;
            updateActiveNavItem(section);
          }
        }
      }
    });
  });
}

function setupSmoothScrolling() {
  document.documentElement.style.scrollBehavior = "smooth";

  // Footer links
  const footerLinks = document.querySelectorAll(".footer-link");
  footerLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        const sectionId = href.substring(1);
        scrollToSection(sectionId);
      }
    });
  });
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export functions for global access
window.scrollToSection = scrollToSection;

// Auto-advance slides every 5 seconds
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000); // 5000ms = 5 seconds
});

// Like Button Interaction
document.querySelectorAll(".like-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const heartIcon = button.querySelector("i");
    const countSpan = button.querySelector(".like-count");

    // Toggle heart fill
    heartIcon.classList.toggle("fas");
    heartIcon.classList.toggle("far");

    // Update count
    let currentCount = parseInt(countSpan.textContent);
    countSpan.textContent = heartIcon.classList.contains("fas")
      ? currentCount + 1
      : currentCount - 1;
  });
});

// "View More" CTA
function showMoreRecipes() {
  alert("More delicious recipes coming soon! Stay tuned for updates.");
  // In a real site, this would scroll to a hidden section or open a modal
}
