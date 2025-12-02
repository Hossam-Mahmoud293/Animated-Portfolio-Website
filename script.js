/**
 * PROFESSIONAL PORTFOLIO JAVASCRIPT
 * Based on Hossam Mahmoud's real projects and skills
 * GitHub: https://github.com/Hossam-Mahmoud293
 */

// ===== CONFIGURATION =====
const CONFIG = {
  // GitHub API Configuration
  github: {
    username: "Hossam-Mahmoud293",
    api: "https://api.github.com",
    projectsPerPage: 6,
  },

  // Animation Durations
  animations: {
    fast: 150,
    normal: 300,
    slow: 500,
    verySlow: 800,
  },

  // Breakpoints
  breakpoints: {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
    large: 1200,
  },

  // Theme Management
  theme: {
    defaultMode: "dark",
    toggleElement: null,
    currentMode: "dark",
  },

  // Real Projects from GitHub
  realProjects: [
    {
      name: "Elite Properties",
      description: "موقع عقاري حديث مع دعم كامل للغة العربية وتصميم متجاوب",
      category: "web",
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      github: "https://github.com/Hossam-Mahmoud293/elite-properties",
      demo: "https://hossam-mahmoud293.github.io/elite-properties/",
      image: "/imgs/Elite Properties.jfif",
    },
    {
      name: "طمأنينة - استشارات نفسية",
      description: "منصة استشارات نفسية متكاملة مع حجز مواعيد ودفع إلكتروني",
      category: "web",
      tech: ["HTML5", "CSS3", "JavaScript", "Payment Integration"],
      github:
        "https://github.com/Hossam-Mahmoud293/Psychological_consultations",
      demo: "https://hossam-mahmoud293.github.io/Psychological_consultations/",
      image: "/imgs/طمأنينة - استشارات نفسية.jpeg",
    },
    {
      name: "Modern Portfolio",
      description: "معرض أعمال احترافي مع GSAP و GitHub API",
      category: "web",
      tech: ["HTML5", "CSS3", "JavaScript", "GSAP", "GitHub API"],
      github: "https://github.com/Hossam-Mahmoud293/Hossam-Portfolio",
      demo: "https://hossam-mahmoud293.github.io/Hossam-Portfolio/",
      image: "/imgs/Modern Portfolio.jpeg",
    },
    {
      name: "Hangman Game",
      description: "لعبة Hangman تفاعلية مع رسوم متحركة",
      category: "app",
      tech: ["HTML5", "CSS3", "JavaScript", "Game Logic"],
      github: "https://github.com/Hossam-Mahmoud293/Hangman-Game",
      demo: "https://hossam-mahmoud293.github.io/Hangman-Game/",
      image: "/imgs/Hangman Game.jfif",
    },
    {
      name: "Memory Game",
      description: "لعبة ذاكرة تفاعلية مع تأثيرات بصرية",
      category: "app",
      tech: ["HTML5", "CSS3", "JavaScript", "Animations"],
      github: "https://github.com/Hossam-Mahmoud293/Memory-Game",
      demo: "https://hossam-mahmoud293.github.io/Memory-Game/",
      image: "/imgs/Memory Game.jfif",
    },
    {
      name: "Quiz Application",
      description: "تطبيق اختبارات تفاعلي مع نظام نقاط",
      category: "app",
      tech: ["HTML5", "CSS3", "JavaScript", "Quiz System"],
      github: "https://github.com/Hossam-Mahmoud293/Quiz-Application",
      demo: "https://hossam-mahmoud293.github.io/Quiz-Application/",
      image: "/imgs/Quiz App.jfif",
    },
    {
      name: "Typing Speed Test",
      description: "اختبار سرعة الكتابة مع إحصائيات دقيقة",
      category: "app",
      tech: ["HTML5", "CSS3", "JavaScript", "Performance Tracking"],
      github: "https://github.com/Hossam-Mahmoud293/Typing-Speed-Test-Game",
      demo: "https://hossam-mahmoud293.github.io/Typing-Speed-Test-Game/",
      image: "/imgs/Typing Speed Test Game.jfif",
    },
    {
      name: "Montreal Creative Portfolio",
      description: "معرض أعمال إبداعي بتصميم عصري",
      category: "design",
      tech: ["HTML5", "CSS3", "JavaScript", "Creative Design"],
      github:
        "https://github.com/Hossam-Mahmoud293/Montreal-Creative-Portfolio",
      demo: "https://hossam-mahmoud293.github.io/Montreal-Creative-Portfolio/",
      image: "/imgs/Montreal creative portfolio.jfif",
    },
  ],

  // Real Skills based on projects
  skills: {
    frontend: [
      { name: "HTML5", level: 95 },
      { name: "Modern CSS", level: 90 },
      { name: "JavaScript (ES6+)", level: 85 },
      { name: "Responsive Design", level: 95 },
      { name: "GSAP Animations", level: 75 },
      { name: "GitHub API", level: 70 },
    ],
    tools: [
      { name: "Git & GitHub", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "Chrome DevTools", level: 80 },
      { name: "Figma", level: 70 },
    ],
    soft: [
      { name: "Problem Solving", level: 90 },
      { name: "Creative Design", level: 85 },
      { name: "Project Management", level: 75 },
      { name: "Communication", level: 80 },
    ],
  },
};

// ===== STATE MANAGEMENT =====
class PortfolioApp {
  constructor() {
    this.state = {
      currentSection: "home",
      isDarkMode: true,
      isMobileMenuOpen: false,
      currentFilter: "all",
      projects: [],
      skills: {},
      isLoading: false,
      scrollY: 0,
    };

    this.elements = {};
    this.observers = {};

    this.init();
  }

  // ===== INITIALIZATION =====
  init() {
    this.cacheElements();
    this.loadStoredPreferences();
    this.setupEventListeners();
    this.loadProjects();
    this.initializeAnimations();
    this.setupIntersectionObservers();
    this.updateYear();
    this.initParticles();
    this.initTypingEffect();

    console.log("🚀 Portfolio initialized successfully!");
  }

  cacheElements() {
    this.elements = {
      // Navigation
      header: document.getElementById("header"),
      nav: document.getElementById("nav"),
      navLinks: document.querySelectorAll(".nav-link"),
      mobileNavLinks: document.querySelectorAll(".mobile-nav-link"),
      menuToggle: document.getElementById("menu-toggle"),
      mobileMenu: document.getElementById("mobile-menu"),
      themeToggle: document.getElementById("theme-toggle"),

      // Sections
      sections: document.querySelectorAll(".section"),
      hero: document.getElementById("home"),

      // Portfolio
      portfolioGrid: document.querySelector(".portfolio-grid"),
      filterButtons: document.querySelectorAll(".filter-btn"),

      // Skills
      skillBars: document.querySelectorAll(".skill-progress"),

      // Contact
      contactForm: document.getElementById("contact-form"),

      // UI Elements
      scrollTop: document.getElementById("scroll-top"),
      currentYear: document.getElementById("current-year"),
    };
  }

  // ===== EVENT LISTENERS =====
  setupEventListeners() {
    // Navigation
    this.setupNavigation();

    // Theme Toggle
    this.setupThemeToggle();

    // Mobile Menu
    this.setupMobileMenu();

    // Portfolio Filters
    this.setupPortfolioFilters();

    // Contact Form
    this.setupContactForm();

    // Scroll Events
    this.setupScrollEvents();

    // Keyboard Events
    this.setupKeyboardEvents();

    // Window Resize
    this.setupResizeEvents();
  }

  setupNavigation() {
    // Desktop Navigation
    this.elements.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleNavigation(e, link));
    });

    // Mobile Navigation
    this.elements.mobileNavLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleNavigation(e, link));
    });
  }

  handleNavigation(e, link) {
    e.preventDefault();

    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      // Update active states
      this.updateActiveLinks(targetId);
      this.state.currentSection = targetId;

      // Smooth scroll
      this.smoothScrollTo(targetSection);

      // Close mobile menu
      this.closeMobileMenu();
    }
  }

  setupThemeToggle() {
    this.elements.themeToggle.addEventListener("click", () =>
      this.toggleTheme()
    );
  }

  setupMobileMenu() {
    this.elements.menuToggle.addEventListener("click", () =>
      this.toggleMobileMenu()
    );

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        this.state.isMobileMenuOpen &&
        !this.elements.mobileMenu.contains(e.target) &&
        !this.elements.menuToggle.contains(e.target)
      ) {
        this.closeMobileMenu();
      }
    });
  }

  setupPortfolioFilters() {
    this.elements.filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => this.filterProjects(btn));
    });
  }

  setupContactForm() {
    if (this.elements.contactForm) {
      this.elements.contactForm.addEventListener("submit", (e) =>
        this.handleContactForm(e)
      );
    }
  }

  setupScrollEvents() {
    let ticking = false;

    const updateScrollState = () => {
      this.state.scrollY = window.pageYOffset;
      this.handleScroll();
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    });
  }

  setupKeyboardEvents() {
    document.addEventListener("keydown", (e) => {
      // ESC to close mobile menu
      if (e.key === "Escape" && this.state.isMobileMenuOpen) {
        this.closeMobileMenu();
      }

      // Ctrl/Cmd + K for search (future feature)
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        this.showNotification("ميزة البحث قيد التطوير 🚧", "info");
      }
    });
  }

  setupResizeEvents() {
    let resizeTimer;

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => this.handleResize(), 250);
    });
  }

  // ===== THEME MANAGEMENT =====
  toggleTheme() {
    this.state.isDarkMode = !this.state.isDarkMode;

    document.body.classList.toggle("dark-mode", this.state.isDarkMode);

    // Update icon
    const icon = this.elements.themeToggle.querySelector("i");
    icon.className = this.state.isDarkMode ? "bx bx-sun" : "bx bx-moon";

    // Save preference
    localStorage.setItem("theme", this.state.isDarkMode ? "dark" : "light");

    // Add transition effect
    document.body.style.transition = "all 0.3s ease";

    // Update theme meta tag
    this.updateThemeMeta();
  }

  loadStoredPreferences() {
    // Load theme preference - default to dark mode
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      this.state.isDarkMode = false;
      document.body.classList.remove("dark-mode");
      const icon = this.elements.themeToggle.querySelector("i");
      icon.className = "bx bx-moon";
    } else {
      // Default to dark mode
      this.state.isDarkMode = true;
      document.body.classList.add("dark-mode");
      const icon = this.elements.themeToggle.querySelector("i");
      icon.className = "bx bx-sun";
    }

    // Load other preferences
    const lastVisit = localStorage.getItem("lastVisit");
    if (lastVisit) {
      console.log(
        "مرحباً بعودتك! آخر زيارة كانت:",
        new Date(lastVisit).toLocaleDateString("ar")
      );
    }
  }

  updateThemeMeta() {
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.content = this.state.isDarkMode ? "#1a1a1a" : "#ffffff";
    }
  }

  // ===== MOBILE MENU =====
  toggleMobileMenu() {
    this.state.isMobileMenuOpen = !this.state.isMobileMenuOpen;

    this.elements.mobileMenu.classList.toggle(
      "active",
      this.state.isMobileMenuOpen
    );
    this.elements.menuToggle.querySelector("i").className = this.state
      .isMobileMenuOpen
      ? "bx bx-x"
      : "bx bx-menu";

    // Prevent body scroll when menu is open
    document.body.style.overflow = this.state.isMobileMenuOpen ? "hidden" : "";
  }

  closeMobileMenu() {
    this.state.isMobileMenuOpen = false;
    this.elements.mobileMenu.classList.remove("active");
    this.elements.menuToggle.querySelector("i").className = "bx bx-menu";
    document.body.style.overflow = "";
  }

  // ===== NAVIGATION =====
  updateActiveLinks(targetId) {
    // Update desktop nav
    this.elements.navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${targetId}`
      );
    });

    // Update mobile nav
    this.elements.mobileNavLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${targetId}`
      );
    });
  }

  smoothScrollTo(targetSection) {
    const headerHeight = this.elements.header.offsetHeight;
    const targetPosition = targetSection.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }

  // ===== SCROLL HANDLING =====
  handleScroll() {
    // Update header state
    this.updateHeaderState();

    // Update scroll to top button
    this.updateScrollTopButton();

    // Update active section based on scroll position
    this.updateActiveSection();

    // Update progress bar
    this.updateProgressBar();
  }

  updateHeaderState() {
    const scrolled = this.state.scrollY > 50;
    this.elements.header.classList.toggle("scrolled", scrolled);
  }

  updateScrollTopButton() {
    const visible = this.state.scrollY > 300;
    this.elements.scrollTop.classList.toggle("visible", visible);
  }

  updateActiveSection() {
    const scrollPosition = this.state.scrollY + 100;
    let currentSection = "";

    this.elements.sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    if (currentSection && currentSection !== this.state.currentSection) {
      this.state.currentSection = currentSection;
      this.updateActiveLinks(currentSection);
    }
  }

  updateProgressBar() {
    const scrollTop = window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }
  }

  // ===== PORTFOLIO MANAGEMENT =====
  async loadProjects() {
    this.state.isLoading = true;

    try {
      // Use real projects from CONFIG
      this.state.projects = CONFIG.realProjects;
      this.renderProjects();
    } catch (error) {
      console.error("Failed to load projects:", error);
      this.showNotification("فشل في تحميل المشاريع", "error");
    } finally {
      this.state.isLoading = false;
    }
  }

  renderProjects() {
    if (!this.elements.portfolioGrid) return;

    const filteredProjects = this.getFilteredProjects();

    this.elements.portfolioGrid.innerHTML = "";

    filteredProjects.forEach((project, index) => {
      const projectElement = this.createProjectElement(project, index);
      this.elements.portfolioGrid.appendChild(projectElement);
    });

    // Animate projects in
    this.animateProjects();
  }

  getFilteredProjects() {
    if (this.state.currentFilter === "all") {
      return this.state.projects;
    }

    return this.state.projects.filter(
      (project) => project.category === this.state.currentFilter
    );
  }

  createProjectElement(project, index) {
    const article = document.createElement("article");
    article.className = "portfolio-item animate-scale-in";
    article.setAttribute("data-category", project.category);
    article.style.animationDelay = `${index * 100}ms`;

    article.innerHTML = `
            <div class="portfolio-image">
                <img src="${project.image}" alt="${
      project.name
    }" loading="lazy">
                <div class="portfolio-overlay">
                    <h3 class="portfolio-title">${project.name}</h3>
                    <p class="portfolio-description">${project.description}</p>
                    <div class="portfolio-links">
                        <a href="${
                          project.demo || project.github
                        }" class="portfolio-link" target="_blank" aria-label="معاينة المشروع">
                            <i class='bx bx-show'></i>
                        </a>
                        <a href="${
                          project.github
                        }" class="portfolio-link" target="_blank" aria-label="كود المصدر">
                            <i class='bx bx-code-alt'></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="portfolio-content">
                <div class="portfolio-tags">
                    ${project.tech
                      .map((tech) => `<span class="tag">${tech}</span>`)
                      .join("")}
                </div>
                <h3>${project.name}</h3>
                <p>${project.description}</p>
            </div>
        `;

    return article;
  }

  filterProjects(button) {
    // Update active state
    this.elements.filterButtons.forEach((btn) =>
      btn.classList.remove("active")
    );
    button.classList.add("active");

    // Update filter
    this.state.currentFilter = button.getAttribute("data-filter");

    // Re-render projects
    this.renderProjects();
  }

  animateProjects() {
    const projects =
      this.elements.portfolioGrid.querySelectorAll(".portfolio-item");
    projects.forEach((project, index) => {
      setTimeout(() => {
        project.style.opacity = "1";
        project.style.transform = "translateY(0)";
      }, index * 100);
    });
  }

  // ===== SKILLS ANIMATION =====
  animateSkills() {
    this.elements.skillBars.forEach((bar) => {
      const targetWidth = bar.style.width;

      // Reset width
      bar.style.width = "0%";

      // Animate to target width
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 200);
    });
  }

  // ===== CONTACT FORM =====
  async handleContactForm(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Validate form
    if (!this.validateContactForm(data)) {
      return;
    }

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML =
      '<i class="bx bx-loader-alt bx-spin"></i> جاري الإرسال...';
    submitBtn.disabled = true;

    try {
      // Simulate form submission
      await this.simulateFormSubmission(data);

      // Show success message
      this.showNotification(
        "تم إرسال رسالتك بنجاح! سأتواصل معك قريباً 🎉",
        "success"
      );

      // Reset form
      e.target.reset();
    } catch (error) {
      this.showNotification(
        "فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى",
        "error"
      );
    } finally {
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  validateContactForm(data) {
    if (!data.name || !data.email || !data.message) {
      this.showNotification("يرجى ملء جميع الحقول المطلوبة", "warning");
      return false;
    }

    if (!this.isValidEmail(data.email)) {
      this.showNotification("يرجى إدخال بريد إلكتروني صحيح", "warning");
      return false;
    }

    return true;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async simulateFormSubmission(data) {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Form data submitted:", data);
        resolve();
      }, 1500);
    });
  }

  // ===== NOTIFICATIONS =====
  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;

    const icons = {
      success: "bx-check-circle",
      error: "bx-x-circle",
      warning: "bx-error",
      info: "bx-info-circle",
    };

    notification.innerHTML = `
            <div class="notification-content">
                <i class='bx ${icons[type]}'></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class='bx bx-x'></i>
            </button>
        `;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            background: white;
            color: var(--neutral-900);
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            min-width: 300px;
            transform: translateX(400px);
            transition: all 0.3s ease;
            border-right: 4px solid var(--primary-500);
        `;

    if (this.state.isDarkMode) {
      notification.style.background = "var(--neutral-800)";
      notification.style.color = "var(--neutral-100)";
    }

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Auto remove
    setTimeout(() => {
      this.closeNotification(notification);
    }, 5000);

    // Manual close
    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.addEventListener("click", () => {
      this.closeNotification(notification);
    });
  }

  closeNotification(notification) {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  // ===== INTERSECTION OBSERVERS =====
  setupIntersectionObservers() {
    // Animate elements on scroll
    const animateObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");

            // Special handling for skills
            if (entry.target.classList.contains("skills")) {
              this.animateSkills();
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe all sections
    this.elements.sections.forEach((section) => {
      animateObserver.observe(section);
    });
  }

  // ===== ANIMATIONS =====
  initializeAnimations() {
    // Add initial animations
    this.addInitialAnimations();

    // Setup scroll animations
    this.setupScrollAnimations();
  }

  addInitialAnimations() {
    // Hero animations
    const heroElements = this.elements.hero.querySelectorAll(
      ".animate-slide-in-left, .animate-slide-in-right"
    );
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateX(0)";
      }, index * 200);
    });
  }

  setupScrollAnimations() {
    // Add scroll-reveal class to elements
    const elementsToAnimate = document.querySelectorAll(
      ".skill-category, .portfolio-item, .contact-method"
    );
    elementsToAnimate.forEach((el) => {
      el.classList.add("scroll-reveal");
    });
  }

  // ===== UTILITY METHODS =====
  updateYear() {
    if (this.elements.currentYear) {
      this.elements.currentYear.textContent = new Date().getFullYear();
    }
  }

  handleResize() {
    // Handle responsive changes
    const isMobile = window.innerWidth < CONFIG.breakpoints.tablet;

    if (!isMobile && this.state.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  debounce(func, wait) {
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

  // ===== PARTICLES SYSTEM =====
  initParticles() {
    const container = document.getElementById("particles");
    if (!container) return;

    const particleCount = 160;

    for (let i = 0; i < particleCount; i++) {
      this.createParticle(container, i);
    }
  }

  createParticle(container, index) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random size
    const size = Math.random() * 12 + 8;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random position
    particle.style.left = `${Math.random() * 100}%`;

    // Random delay
    particle.style.animationDelay = `${Math.random() * 8}s`;

    // Random duration
    particle.style.animationDuration = `${Math.random() * 8 + 8}s`;

    container.appendChild(particle);
  }

  // ===== TYPING EFFECT =====
  initTypingEffect() {
    const element = document.querySelector(".typing-text");
    if (!element) return;

    const text = "أنا مطور Frontend متخصص في JavaScript";
    let currentCharIndex = 0;

    const type = () => {
      if (currentCharIndex < text.length) {
        element.textContent = text.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        setTimeout(type, 80);
      }
    };

    // Start typing after 1 second
    setTimeout(type, 1000);
  }

  // ===== PUBLIC API =====
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  showLoading() {
    this.state.isLoading = true;
    // Add loading UI
  }

  hideLoading() {
    this.state.isLoading = false;
    // Remove loading UI
  }
}

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  // Update current year automatically
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Initialize the app
  window.PortfolioApp = new PortfolioApp();

  // Scroll to top button
  const scrollTopBtn = document.getElementById("scroll-top");
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.PortfolioApp.scrollToTop();
    });
  }

  // Performance monitoring
  if ("performance" in window) {
    window.addEventListener("load", () => {
      const perfData = performance.getEntriesByType("navigation")[0];
      console.log(
        `Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`
      );
    });
  }

  // Service Worker registration (for future PWA)
  if ("serviceWorker" in navigator) {
    // navigator.serviceWorker.register('/sw.js');
  }

  console.log("🎨 Portfolio loaded successfully!");
  console.log(
    "📊 Real projects loaded from GitHub:",
    CONFIG.realProjects.length
  );
  console.log(
    "💻 Skills configured:",
    Object.keys(CONFIG.skills).length,
    "categories"
  );
});

// ===== ERROR HANDLING =====
window.addEventListener("error", (e) => {
  console.error("Portfolio Error:", e.error);

  // Show user-friendly error message
  if (window.PortfolioApp) {
    window.PortfolioApp.showNotification(
      "حدث خطأ ما. يرجى تحديث الصفحة",
      "error"
    );
  }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy loading images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    imageObserver.observe(img);
  });
}

// ===== EXPORT FOR EXTERNAL USE =====
window.PortfolioConfig = CONFIG;
