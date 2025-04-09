// script.js - Final version with fixed View Details rendering for all projects

const projectsData = [
  {
    id: "game-analytics-dashboard",
    title: "Advanced Game Analytics Dashboard",
    description: "Interactive Streamlit dashboard using RAWG API to analyze genre, platform, lifecycle trends, and predict game popularity.",
    fullDescription: "This comprehensive gaming analytics platform leverages the RAWG API to extract and analyze key metrics across the gaming industry...",
    technologies: ["Python", "Streamlit", "Pandas", "Scikit-learn", "RAWG API", "Data Visualization"],
    challenges: "Handling diverse datasets and optimizing Streamlit performance.",
    outcomes: "Achieved 78% prediction accuracy; used by game studios for market trend insights.",
    image: "https://source.unsplash.com/600x400/?dashboard,analytics",
    link: "#",
    github: "https://www.linkedin.com/in/saiganesh-p/"
  },
  {
    id: "risk-assessment-automobile",
    title: "Risk Assessment on Automobile Insurance Claims",
    description: "Applied statistical tools to assess risks and predict claims, improving underwriting strategy.",
    fullDescription: "Developed a risk assessment model for automobile insurance claims processing...",
    technologies: ["Excel", "Power BI", "Statistical Analysis", "Risk Modeling", "Predictive Analytics"],
    challenges: "Inconsistent historical data, balancing accuracy and interpretability.",
    outcomes: "Improved underwriting accuracy by 23% and reduced claim processing time by 15%.",
    image: "https://source.unsplash.com/600x400/?insurance,automobile",
    link: "#",
    github: "#"
  },
  {
    id: "smart-bazar",
    title: "Smart Bazar Customer Analysis",
    description: "Segmented customers with Power BI, delivering insights to improve marketing and retention.",
    fullDescription: "Customer segmentation for Smart Bazar retail chain using transaction and demographic data.",
    technologies: ["Power BI", "Customer Segmentation", "RFM Analysis", "Data Visualization", "Marketing Analytics"],
    challenges: "Data integration and meaningful segmentation.",
    outcomes: "Boosted retention by 12% and repeat purchases by 17%.",
    image: "https://source.unsplash.com/600x400/?retail,customer",
    link: "#",
    github: "#"
  },
  {
    id: "project-management-simulation",
    title: "Project Management Simulation",
    description: "Optimized resources and schedules using Agile for Scope, Resources, and Schedule V3 simulation.",
    fullDescription: "Simulation to optimize resource allocation and delivery timelines in project management.",
    technologies: ["Agile", "Project Management", "Resource Optimization", "Gantt Charts", "Critical Path Analysis"],
    challenges: "Creating realistic simulations and tracking performance metrics.",
    outcomes: "Improved delivery time by 22% and used for project training.",
    image: "https://source.unsplash.com/600x400/?project,management",
    link: "#",
    github: "#"
  },
  {
    id: "undead-unknown",
    title: "Undead and Unknown (Game)",
    description: "First-person zombie hunting game in Unreal Engine using AI behavior trees.",
    fullDescription: "Developed a survival horror game with AI-driven zombie enemies and immersive levels.",
    technologies: ["Unreal Engine", "3D Modeling", "Animation", "Game Design"],
    challenges: "AI performance and multi-enemy combat optimization.",
    outcomes: "Created 3 fully playable levels with adaptive AI.",
    image: "https://source.unsplash.com/600x400/?zombie,game",
    link: "#",
    github: "#"
  }
];



// Back to Top
const backToTopButton = document.createElement('div');
backToTopButton.classList.add('back-to-top');
backToTopButton.innerHTML = '↑';
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
  backToTopButton.classList.toggle('visible', window.scrollY > 300);
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Project Overlay Setup
const projectOverlay = document.createElement('div');
projectOverlay.classList.add('project-overlay');

document.body.appendChild(projectOverlay);

// Close Overlay
function closeProjectOverlay() {
  projectOverlay.classList.remove('active');
  document.body.classList.remove('overlay-active');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectOverlay();
});

// Open Overlay
function openProjectOverlay(projectId) {
  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;

  // Inject overlay content dynamically
  projectOverlay.innerHTML = `
    <div class="project-details">
      <button class="close-overlay">×</button>
      <h3>${project.title}</h3>
      <img src="${project.image}" alt="${project.title}">
      <div class="project-details-content">
        <div class="project-details-section">
          <h4>Overview</h4>
          <p class="project-full-description">${project.fullDescription}</p>
        </div>
        <div class="project-details-section">
          <h4>Technologies Used</h4>
          <div class="project-tech-list">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
        </div>
        <div class="project-details-section">
          <h4>Challenges</h4>
          <p class="project-challenges">${project.challenges}</p>
        </div>
        <div class="project-details-section">
          <h4>Outcomes</h4>
          <p class="project-outcomes">${project.outcomes}</p>
        </div>
        <div class="project-btn-group">
          <a href="${project.github}" class="project-btn btn-secondary github-link" target="_blank">View on GitHub</a>
        </div>
      </div>
    </div>
  `;

  // Add close event again since innerHTML resets it
  projectOverlay.querySelector('.close-overlay').addEventListener('click', closeProjectOverlay);

  projectOverlay.addEventListener('click', (e) => {
    if (e.target === projectOverlay) closeProjectOverlay();
  });

  projectOverlay.classList.add('active');
  document.body.classList.add('overlay-active');
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  const projectElements = document.querySelectorAll('.project');

  projectElements.forEach(project => {
    const heading = project.querySelector('h3')?.textContent.trim().toLowerCase();

    projectsData.forEach(data => {
      if (data.title.toLowerCase().trim() === heading) {
        project.setAttribute('data-id', data.id);

        const existingBtn = project.querySelector('.view-more');
        if (existingBtn) existingBtn.remove();

        const viewMoreBtn = document.createElement('span');
        viewMoreBtn.classList.add('view-more');
        viewMoreBtn.textContent = 'View Details';
        project.appendChild(viewMoreBtn);

        viewMoreBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openProjectOverlay(data.id);
        });
      }
    });
  });

  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        entry.target.classList.remove('hidden');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
  });
});

// Highlight Active Nav Link
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});
