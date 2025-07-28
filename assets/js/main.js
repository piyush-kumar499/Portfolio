// Main JavaScript functions for portfolio website

// Improved component loading with proper error handling, timing, and order control
function loadComponent(elementId, filePath) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with ID '${elementId}' not found`);
        return Promise.reject(`Element with ID '${elementId}' not found`);
    }

    return fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            element.innerHTML = data;
            
            // Execute any scripts in the loaded component
            const scripts = element.getElementsByTagName('script');
            for (let i = 0; i < scripts.length; i++) {
                const script = scripts[i];
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                document.head.appendChild(newScript);
            }
            
            return element;
        })
        .catch(error => {
            console.error(`Error loading component ${filePath}:`, error);
            // Show fallback content for header/footer
            if (elementId === 'header-placeholder') {
                element.innerHTML = '<div style="height: 60px; background: #6366f1; color: white; display: flex; align-items: center; justify-content: center;"><span>Navigation Loading...</span></div>';
            } else if (elementId === 'footer-placeholder') {
                element.innerHTML = '<div style="background: #1f2937; color: white; padding: 2rem; text-align: center;"><p>Footer Loading...</p></div>';
            }
            throw error;
        });
}

// Enhanced component loading with proper sequencing and initialization
function loadComponentsAndInit(initCallback) {
    // Pre-apply body class immediately to prevent layout shift
    document.body.classList.add('portfolio-body');
    
    // Load header first, then footer to ensure proper order
    loadComponent('header-placeholder', 'header.html')
        .then(() => {
            // Small delay to ensure header is fully rendered and positioned
            return new Promise(resolve => setTimeout(resolve, 100));
        })
        .then(() => {
            // Load footer after header is properly positioned
            return loadComponent('footer-placeholder', 'footer.html');
        })
        .then(() => {
            // Additional delay for scripts to execute
            return new Promise(resolve => setTimeout(resolve, 200));
        })
        .then(() => {
            if (typeof initCallback === 'function') {
                initCallback();
            }
        })
        .catch(error => {
            console.error('Error loading components:', error);
            // Fallback: try loading them simultaneously if sequential loading fails
            return Promise.allSettled([
                loadComponent('header-placeholder', 'header.html'),
                loadComponent('footer-placeholder', 'footer.html')
            ]).then(() => {
                setTimeout(() => {
                    if (typeof initCallback === 'function') {
                        initCallback();
                    }
                }, 300);
            });
        });
}

// Alternative method with better error handling and order guarantee
function loadComponentsSequentially(initCallback) {
    // Ensure body has the correct class from the start
    document.body.classList.add('portfolio-body');
    
    const loadSequence = async () => {
        try {
            // Load header first (critical for layout)
            await loadComponent('header-placeholder', 'header.html');
            
            // Wait for header to be fully processed
            await new Promise(resolve => setTimeout(resolve, 150));
            
            // Verify header is properly positioned
            const header = document.getElementById('portfolio-header');
            if (header) {
                header.style.position = 'fixed';
                header.style.top = '0';
                header.style.zIndex = '9999';
            }
            
            // Load footer after header is secured
            await loadComponent('footer-placeholder', 'footer.html');
            
            // Final delay for all scripts to execute
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // Initialize callback
            if (typeof initCallback === 'function') {
                initCallback();
            }
            
        } catch (error) {
            console.error('Sequential loading failed:', error);
            // Fallback to simultaneous loading
            Promise.allSettled([
                loadComponent('header-placeholder', 'header.html'),
                loadComponent('footer-placeholder', 'footer.html')
            ]).then(() => {
                setTimeout(() => {
                    if (typeof initCallback === 'function') {
                        initCallback();
                    }
                }, 300);
            });
        }
    };
    
    loadSequence();
}

// Homepage Functions
function populateHomepage() {
    if (!window.personalData) {
        console.error('Personal data not loaded');
        return;
    }

    // Safely populate hero section
    const heroNameElement = document.getElementById('hero-name');
    const heroTitleElement = document.getElementById('hero-title');
    const heroBioElement = document.getElementById('hero-bio');
    const heroProfileImgElement = document.getElementById('hero-profile-img');
    const resumeDownloadElement = document.getElementById('resume-download');
    
    if (heroNameElement) heroNameElement.textContent = window.personalData.name || 'Your Name';
    if (heroTitleElement) heroTitleElement.textContent = window.personalData.title || 'Professional Title';
    const availabilityElement = document.getElementById('availability-tag');
const availabilityTextElement = availabilityElement?.querySelector('.availability-text');
if (availabilityTextElement && window.personalData.availability) {
    availabilityTextElement.textContent = window.personalData.availability;
}
    if (heroBioElement) heroBioElement.textContent = window.personalData.shortBio || 'Professional bio will be loaded here...';
    if (heroProfileImgElement) {
        heroProfileImgElement.src = window.personalData.profileImage || 'https://via.placeholder.com/400x400/007bff/ffffff?text=Your+Photo';
        heroProfileImgElement.alt = window.personalData.name || 'Profile Picture';
    }
    
    // Set resume download link
    if (resumeDownloadElement && window.personalData.resumeUrl) {
        resumeDownloadElement.href = window.personalData.resumeUrl;
    }
    
    // Populate social links
    const heroSocialContainer = document.getElementById('hero-social-links');
    if (heroSocialContainer && window.personalData.social) {
        heroSocialContainer.innerHTML = '';
        window.personalData.social.forEach(social => {
            const link = document.createElement('a');
            link.href = social.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'social-link';
            link.innerHTML = `<i class="${social.icon}"></i>`;
            link.title = social.platform;
            heroSocialContainer.appendChild(link);
        });
    }
    
    // Populate skills preview (top 8 skills)
    const skillsContainer = document.getElementById('skills-preview-grid');
if (skillsContainer && window.skillsData) {
    skillsContainer.innerHTML = '';
    
    const topSkills = [...(window.skillsData.programming || []), ...(window.skillsData.frameworks || [])]
        .sort((a, b) => (b.level || 0) - (a.level || 0))
        .slice(0, 8);
    
    topSkills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-item';
        skillElement.innerHTML = `
            <div class="skill-icon">
                <i class="${skill.icon || 'fas fa-code'}" style="color: ${skill.color || '#007bff'}"></i>
            </div>
            <h3>${skill.name || 'Skill'}</h3>
            <div class="skill-bar-container">
                <div class="skill-bar">
                    <div class="skill-progress" data-width="${skill.level || 75}%" style="background-color: ${skill.color || '#007bff'}; width: 0%;"></div>
                </div>
                <div class="skill-percentage">${skill.level || 75}%</div>
            </div>
        `;
        skillsContainer.appendChild(skillElement);
    });
}
    
    // Populate featured projects
    const featuredProjectsContainer = document.getElementById('featured-projects-grid');
    if (featuredProjectsContainer && window.projectsData) {
        featuredProjectsContainer.innerHTML = '';
        
        const featuredProjects = window.projectsData.filter(project => project.featured);
        
        featuredProjects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project-card';
            projectElement.innerHTML = `
                <div class="project-image">
                    <img src="${project.image || 'https://via.placeholder.com/500x300/007bff/ffffff?text=Project'}" alt="${project.title || 'Project'}">
                    <div class="project-overlay">
                        <div class="project-links">
                            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link"><i class="fab fa-github"></i></a>` : ''}
                            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link"><i class="fas fa-external-link-alt"></i></a>` : ''}
                        </div>
                    </div>
                </div>
                <div class="project-content">
                    <h3>${project.title || 'Project Title'}</h3>
                    <p>${project.shortDescription || 'Project description'}</p>
                    <div class="project-tech">
                        ${(project.technologies || []).slice(0, 3).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            `;
            featuredProjectsContainer.appendChild(projectElement);
        });
    }
}

// About Page Functions
function populateAboutPage() {
    if (!window.personalData) {
        console.error('Personal data not loaded');
        return;
    }

    // Update page title
    document.title = `About - ${window.personalData.name || 'Your Name'}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = `About ${window.personalData.name || 'Your Name'} - Background, Education, and Professional Journey`;
    }
    
    // Populate about image
    const aboutProfileImg = document.getElementById('about-profile-img');
    if (aboutProfileImg) {
        aboutProfileImg.src = window.personalData.profileImage || 'https://via.placeholder.com/350x350/007bff/ffffff?text=About+Photo';
        aboutProfileImg.alt = `About ${window.personalData.name || 'Me'}`;
    }
    
    // Populate biography
    const bioContainer = document.getElementById('bio-content');
    if (bioContainer && window.personalData.fullBio) {
        bioContainer.innerHTML = '';
        window.personalData.fullBio.forEach(paragraph => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            bioContainer.appendChild(p);
        });
    }
    
    // Populate education timeline
    const educationContainer = document.getElementById('education-timeline');
    if (educationContainer && window.personalData.education) {
        educationContainer.innerHTML = '';
        window.personalData.education.forEach(edu => {
            const eduElement = document.createElement('div');
            eduElement.className = 'timeline-item';
            eduElement.innerHTML = `
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <h3>${edu.degree || 'Degree'}</h3>
                    <h4>${edu.institution || 'Institution'}</h4>
                    <span class="timeline-year">${edu.year || 'Year'}</span>
                    <p>${edu.description || 'Description'}</p>
                </div>
            `;
            educationContainer.appendChild(eduElement);
        });
    }
    
    // Populate goals
    const goalsContainer = document.getElementById('goals-content');
    if (goalsContainer && window.personalData.goals) {
        goalsContainer.innerHTML = '<ul class="goals-list"></ul>';
        const goalsList = goalsContainer.querySelector('.goals-list');
        window.personalData.goals.forEach(goal => {
            const li = document.createElement('li');
            li.textContent = goal;
            goalsList.appendChild(li);
        });
    }
    
    // Populate passions
    const passionsContainer = document.getElementById('passions-content');
    if (passionsContainer && window.personalData.passions) {
        passionsContainer.innerHTML = '<ul class="passions-list"></ul>';
        const passionsList = passionsContainer.querySelector('.passions-list');
        window.personalData.passions.forEach(passion => {
            const li = document.createElement('li');
            li.textContent = passion;
            passionsList.appendChild(li);
        });
    }
    
    // Populate interests
    const interestsContainer = document.getElementById('interests-grid');
    if (interestsContainer && window.personalData.interests) {
        interestsContainer.innerHTML = '';
        window.personalData.interests.forEach(interest => {
            const interestElement = document.createElement('div');
            interestElement.className = 'interest-item';
            interestElement.innerHTML = `
                <div class="interest-icon">
                    <i class="${interest.icon || 'fas fa-heart'}"></i>
                </div>
                <h3>${interest.title || 'Interest'}</h3>
                <p>${interest.description || 'Description'}</p>
            `;
            interestsContainer.appendChild(interestElement);
        });
    }
}

// Skills Page Functions
function populateSkillsPage() {
    if (!window.skillsData) {
        console.error('Skills data not loaded');
        return;
    }

    document.title = `Skills - ${window.personalData?.name || 'Your Name'}`;
    
    // Populate programming skills
    populateSkillCategory('programming-skills', window.skillsData.programming || []);
    
    // Populate framework skills
    populateSkillCategory('framework-skills', window.skillsData.frameworks || []);
    
    // Populate tools skills
    populateSkillCategory('tools-skills', window.skillsData.tools || []);
    
    // Populate soft skills
    const softSkillsContainer = document.getElementById('soft-skills');
    if (softSkillsContainer && window.skillsData.soft) {
        softSkillsContainer.innerHTML = '';
        window.skillsData.soft.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'soft-skill-item';
            skillElement.innerHTML = `
                <h3>${skill.name || 'Skill'}</h3>
                <p>${skill.description || 'Description'}</p>
            `;
            softSkillsContainer.appendChild(skillElement);
        });
    }
    
    // Populate skills summary
    const summaryContainer = document.getElementById('skills-summary');
    if (summaryContainer) {
        const allTechnicalSkills = [
            ...(window.skillsData.programming || []),
            ...(window.skillsData.frameworks || []),
            ...(window.skillsData.tools || [])
        ];
        const avgLevel = allTechnicalSkills.length > 0 
            ? allTechnicalSkills.reduce((sum, skill) => sum + (skill.level || 0), 0) / allTechnicalSkills.length
            : 0;
        
        summaryContainer.innerHTML = `
            <div class="summary-item">
                <h3>Technical Skills</h3>
                <span class="summary-count">${allTechnicalSkills.length}</span>
            </div>
            <div class="summary-item">
                <h3>Average Proficiency</h3>
                <span class="summary-count">${Math.round(avgLevel)}%</span>
            </div>
            <div class="summary-item">
                <h3>Soft Skills</h3>
                <span class="summary-count">${window.skillsData.soft?.length || 0}</span>
            </div>
        `;
    }
}

function populateSkillCategory(containerId, skills) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-item';
        skillElement.innerHTML = `
            <div class="skill-icon">
                <i class="${skill.icon || 'fas fa-code'}" style="color: ${skill.color || '#007bff'}"></i>
            </div>
            <h3>${skill.name || 'Skill'}</h3>
            <div class="skill-bar-container">
                <div class="skill-bar">
                    <div class="skill-progress" style="width: ${skill.level || 0}%; background-color: ${skill.color || '#007bff'}"></div>
                </div>
                <div class="skill-percentage">${skill.level || 0}%</div>
            </div>
        `;
        container.appendChild(skillElement);
    });
}

// Updated Projects Page Functions
function populateProjectsPage() {
    if (!window.projectsData) {
        console.error('Projects data not loaded');
        return;
    }
    
    document.title = `Projects - ${window.personalData?.name || 'Your Name'}`;
    
    const projectsContainer = document.getElementById('projects-grid');
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = '';
    
    window.projectsData.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = `project-card ${project.category || 'other'}`;
        projectElement.setAttribute('data-category', project.category || 'other');
        
        projectElement.innerHTML = `
            <div class="project-image">
                <img src="${project.image || 'https://via.placeholder.com/500x300/007bff/ffffff?text=Project'}" alt="${project.title || 'Project'}">
                
                <!-- Info button positioned at top right, always visible -->
                <button class="project-info-btn view-details" data-project-id="${project.id || 0}" title="View Project Details">
                    <i class="fas fa-info-circle"></i>
                </button>
                
                <!-- Overlay with only GitHub and Live demo links -->
                <div class="project-overlay">
                    <div class="project-links">
                        ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link" title="View Code"><i class="fab fa-github"></i></a>` : ''}
                        ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link" title="Live Demo"><i class="fas fa-external-link-alt"></i></a>` : ''}
                    </div>
                </div>
            </div>
            <div class="project-content">
                <h3>${project.title || 'Project Title'}</h3>
                <p>${project.shortDescription || 'Project description'}</p>
                <div class="project-tech">
                    ${(project.technologies || []).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-meta">
                    <span class="project-date">${project.completedDate ? new Date(project.completedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Date'}</span>
                    ${project.featured ? '<span class="featured-badge">Featured</span>' : ''}
                </div>
            </div>
        `;
        projectsContainer.appendChild(projectElement);
    });
}

function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function initializeProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    
    if (!modal || !modalClose) return;
    
    // Close modal
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Open modal with project details
    document.addEventListener('click', (e) => {
        if (e.target.closest('.view-details')) {
            const projectId = parseInt(e.target.closest('.view-details').getAttribute('data-project-id'));
            const project = window.projectsData?.find(p => p.id === projectId);
            
            if (project) {
                showProjectModal(project);
            }
        }
    });
}

function showProjectModal(project) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalBody) return;
    
    modalBody.innerHTML = `
        <div class="modal-project">
            <img src="${project.image || 'https://via.placeholder.com/500x300/007bff/ffffff?text=Project'}" alt="${project.title || 'Project'}" class="modal-project-image">
            <div class="modal-project-content">
                <h2>${project.title || 'Project Title'}</h2>
                <p class="modal-project-description">${project.fullDescription || project.shortDescription || 'Project description'}</p>
                
                <div class="modal-project-tech">
                    <h3>Technologies Used</h3>
                    <div class="tech-tags">
                        ${(project.technologies || []).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                ${project.highlights ? `
                    <div class="modal-project-highlights">
                        <h3>Key Highlights</h3>
                        <ul>
                            ${project.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                <div class="modal-project-links">
                    ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><i class="fab fa-github"></i> View Code</a>` : ''}
                    ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                </div>
                
                <div class="modal-project-meta">
                    <p><strong>Completed:</strong> ${project.completedDate ? new Date(project.completedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Date not available'}</p>
                    <p><strong>Category:</strong> ${project.category ? project.category.charAt(0).toUpperCase() + project.category.slice(1) : 'Other'}</p>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Contact Page Functions
function populateContactPage() {
    if (!window.contactData || !window.personalData) {
        console.error('Contact or personal data not loaded');
        return;
    }

    document.title = `Contact - ${window.personalData.name || 'Your Name'}`;
    
    // Populate contact details
    const contactDetailsContainer = document.getElementById('contact-details');
    if (contactDetailsContainer) {
        contactDetailsContainer.innerHTML = `
            <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <div>
                    <h3>Email</h3>
                    <a href="mailto:${window.contactData.email || ''}">${window.contactData.email || 'email@example.com'}</a>
                </div>
            </div>
            <div class="contact-item">
                <i class="fas fa-phone"></i>
                <div>
                    <h3>Phone</h3>
                    <a href="tel:${window.contactData.phone || ''}">${window.contactData.phone || 'Phone number'}</a>
                </div>
            </div>
            <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                    <h3>Location</h3>
                    <span>${window.contactData.location || 'Location'}</span>
                </div>
            </div>
            <div class="contact-item">
                <i class="fas fa-clock"></i>
                <div>
                    <h3>Response Time</h3>
                    <span>${window.contactData.responseTime || 'Within 24 hours'}</span>
                </div>
            </div>
        `;
    }
    
    // Populate social links
    const socialContainer = document.getElementById('contact-social-links');
    if (socialContainer && window.personalData.social) {
        socialContainer.innerHTML = '';
        window.personalData.social.forEach(social => {
            const link = document.createElement('a');
            link.href = social.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'social-link-large';
            link.innerHTML = `<i class="${social.icon}"></i><span>${social.platform}</span>`;
            socialContainer.appendChild(link);
        });
    }
    
    // Update location text
    const locationText = document.getElementById('location-text');
    if (locationText) {
        locationText.textContent = window.contactData.location || 'Location will be loaded here';
    }
}

function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    
    if (!form || !successMessage) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset form after 5 seconds
            setTimeout(() => {
                form.reset();
                form.style.display = 'block';
                successMessage.style.display = 'none';
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 5000);
        }, 1000);
    });
}

// Utility Functions
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Enhanced typewriter effect function
function typewriterEffect(element, text, speed = 100) {
    if (!element || !text) return;
    
    element.textContent = '';
    element.style.borderRight = '2px solid #ffd700';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    setTimeout(type, 1000);
}

// Enhanced initialization with layout protection
function initializePortfolio() {
    // Ensure proper body class is applied immediately
    document.body.classList.add('portfolio-body');
    
    // Add layout protection styles
    const style = document.createElement('style');
    style.textContent = `
        body.portfolio-body {
            padding-top: 80px !important;
        }
        #header-placeholder {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 9999 !important;
        }
        #footer-placeholder {
            position: relative !important;
            z-index: 100 !important;
            margin-top: auto !important;
        }
        @media (max-width: 768px) {
            body.portfolio-body {
                padding-top: 70px !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize animations and other functionality
    animateOnScroll();
    
    // Ensure all data is available before proceeding
    if (typeof window.personalData === 'undefined') {
        console.warn('Personal data not loaded yet');
    }
    if (typeof window.skillsData === 'undefined') {
        console.warn('Skills data not loaded yet');
    }
    if (typeof window.projectsData === 'undefined') {
        console.warn('Projects data not loaded yet');
    }
    if (typeof window.contactData === 'undefined') {
        console.warn('Contact data not loaded yet');
    }
}

// Initialize when DOM is loaded with proper sequencing
document.addEventListener('DOMContentLoaded', () => {
    initializePortfolio();
});

// Export the main loading function for use in HTML files
window.loadComponentsAndInit = loadComponentsAndInit;
window.loadComponentsSequentially = loadComponentsSequentially;


// Function to parse **text** and make it bold
function parseBoldText(text) {
    // Replace **text** with <span class="bold-text">text</span>
    return text.replace(/\*\*(.*?)\*\*/g, '<span class="bold-text">$1</span>');
}

// Function to apply bold text parsing to bio content
function applyBoldTextToBio() {
    const bioContent = document.getElementById('bio-content');
    if (bioContent) {
        const paragraphs = bioContent.querySelectorAll('p');
        paragraphs.forEach(paragraph => {
            paragraph.innerHTML = parseBoldText(paragraph.innerHTML);
        });
    }
}

// Add these functions to your main.js file

// Certificates Page Functions
function populateCertificatesPage() {
    if (!window.certificatesData || !window.certificateCategories) {
        console.error('Certificates data not loaded');
        return;
    }

    document.title = `Certificates - ${window.personalData?.name || 'Your Name'}`;

    // Populate filters
    const filtersContainer = document.getElementById('certificate-filters');
    if (filtersContainer && window.certificateCategories) {
        filtersContainer.innerHTML = '';
        window.certificateCategories.forEach(category => {
            const filterBtn = document.createElement('button');
            filterBtn.className = `filter-btn ${category.id === 'all' ? 'active' : ''}`;
            filterBtn.setAttribute('data-filter', category.id);
            filterBtn.innerHTML = `<i class="${category.icon}"></i>${category.name}`;
            filtersContainer.appendChild(filterBtn);
        });
    }

    // Populate statistics
    populateCertificateStats();

    // Populate certificates grid
    const certificatesContainer = document.getElementById('certificates-grid');
    if (certificatesContainer && window.certificatesData) {
        certificatesContainer.innerHTML = '';

        window.certificatesData.forEach(cert => {
            const certElement = document.createElement('div');
            certElement.className = `certificate-card fade-in`;
            certElement.setAttribute('data-category', cert.category || 'other');

            const expirationStatus = getCertificateExpirationStatus(cert);
            
            certElement.innerHTML = `
                <div class="certificate-header">
                    <img src="${cert.imageUrl || 'https://via.placeholder.com/80x80/6366f1/ffffff?text=CERT'}" 
                         alt="${cert.name || 'Certificate'}" 
                         class="certificate-image">
                    <div class="certificate-info">
                        <h3>${cert.name || 'Certificate Name'}</h3>
                        <div class="certificate-organization">${cert.organization || 'Organization'}</div>
                        <div class="certificate-date">
                            Issued: ${cert.issueDate ? formatDate(cert.issueDate) : 'Date not available'}
                        </div>
                    </div>
                </div>
                
                <div class="certificate-description">
                    ${cert.description || 'Professional certification description'}
                </div>
                
                ${cert.skills && cert.skills.length > 0 ? `
                    <div class="certificate-skills">
                        ${cert.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                ` : ''}
                
                <div class="certificate-actions">
                    ${cert.credentialUrl ? `
                        <a href="${cert.credentialUrl}" target="_blank" rel="noopener noreferrer" class="cert-btn cert-btn-primary">
                            <i class="fas fa-external-link-alt"></i>
                            View Certificate
                        </a>
                    ` : ''}
                    <button class="cert-btn cert-btn-secondary view-certificate-details" data-certificate-id="${cert.id}">
                        <i class="fas fa-info-circle"></i>
                        Details
                    </button>
                    <div class="expiration-status ${expirationStatus.class}">
                        <i class="${expirationStatus.icon}"></i>
                        ${expirationStatus.text}
                    </div>
                </div>
            `;
            
            certificatesContainer.appendChild(certElement);
        });

        // Initialize scroll animations
        initializeCertificateAnimations();
    }
}

function populateCertificateStats() {
    const statsContainer = document.getElementById('certificates-stats');
    if (!statsContainer || !window.certificatesData) return;

    const totalCerts = window.certificatesData.length;
    const activeCerts = window.certificatesData.filter(cert => {
        if (!cert.expirationDate) return true;
        return new Date(cert.expirationDate) > new Date();
    }).length;
    
    const categoriesCount = [...new Set(window.certificatesData.map(cert => cert.category))].length;
    const thisYearCerts = window.certificatesData.filter(cert => {
        if (!cert.issueDate) return false;
        return new Date(cert.issueDate).getFullYear() === new Date().getFullYear();
    }).length;

    statsContainer.innerHTML = `
        <div class="stat-item scale-in">
            <span class="stat-number">${totalCerts}</span>
            <span class="stat-label">Total Certificates</span>
        </div>
        <div class="stat-item scale-in">
            <span class="stat-number">${activeCerts}</span>
            <span class="stat-label">Active Certificates</span>
        </div>
        <div class="stat-item scale-in">
            <span class="stat-number">${categoriesCount}</span>
            <span class="stat-label">Categories</span>
        </div>
        <div class="stat-item scale-in">
            <span class="stat-number">${thisYearCerts}</span>
            <span class="stat-label">This Year</span>
        </div>
    `;
}

function getCertificateExpirationStatus(cert) {
    if (!cert.expirationDate) {
        return {
            class: 'status-no-expiry',
            icon: 'fas fa-infinity',
            text: 'No Expiry'
        };
    }

    const now = new Date();
    const expirationDate = new Date(cert.expirationDate);
    const timeDiff = expirationDate.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) {
        return {
            class: 'status-expired',
            icon: 'fas fa-exclamation-triangle',
            text: 'Expired'
        };
    } else if (daysDiff <= 30) {
        return {
            class: 'status-expiring',
            icon: 'fas fa-clock',
            text: `Expires in ${daysDiff} days`
        };
    } else {
        return {
            class: 'status-valid',
            icon: 'fas fa-check-circle',
            text: 'Valid'
        };
    }
}

function formatDate(dateString) {
    if (!dateString) return 'Date not available';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function initializeCertificateFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const certificateCards = document.querySelectorAll('.certificate-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Filter certificates with animation
            certificateCards.forEach((card, index) => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100);
                } else {
                    card.classList.remove('visible');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initializeCertificateModal() {
    const modal = document.getElementById('certificate-modal');
    const modalClose = document.querySelector('.modal-close');

    if (!modal || !modalClose) return;

    // Close modal
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Open modal with certificate details
    document.addEventListener('click', (e) => {
        if (e.target.closest('.view-certificate-details')) {
            const certificateId = parseInt(e.target.closest('.view-certificate-details').getAttribute('data-certificate-id'));
            const certificate = window.certificatesData?.find(c => c.id === certificateId);

            if (certificate) {
                showCertificateModal(certificate);
            }
        }
    });
}

function showCertificateModal(certificate) {
    const modal = document.getElementById('certificate-modal');
    const modalBody = document.getElementById('certificate-modal-body');
    
    if (!modal || !modalBody) return;
    
    // Store current certificate ID for image viewer
    window.currentModalCertificateId = certificate.id;
    
    const expirationStatus = getCertificateExpirationStatus(certificate);
    
    modalBody.innerHTML = `
        <div class="modal-certificate">
            <img src="${certificate.imageUrl || 'https://via.placeholder.com/150x150/6366f1/ffffff?text=CERT'}" 
                 alt="${certificate.name || 'Certificate'}" 
                 class="modal-certificate-image"
                 title="Click to view full size">
            
            <div class="modal-certificate-content">
                <h2>${certificate.name || 'Certificate Name'}</h2>
                
                <div class="modal-certificate-description">
                    ${certificate.description || 'Professional certification description'}
                </div>
                
                <div class="modal-certificate-meta">
                    <p><strong>Organization:</strong> ${certificate.organization || 'Organization'}</p>
                    <p><strong>Issue Date:</strong> ${certificate.issueDate ? formatDate(certificate.issueDate) : 'Date not available'}</p>
                    ${certificate.expirationDate ? `<p><strong>Expiration Date:</strong> ${formatDate(certificate.expirationDate)}</p>` : '<p><strong>Validity:</strong> No expiration date</p>'}
                    <p><strong>Status:</strong> 
                        <span class="expiration-status ${expirationStatus.class}">
                            <i class="${expirationStatus.icon}"></i>
                            ${expirationStatus.text}
                        </span>
                    </p>
                </div>
                
                ${certificate.skills && certificate.skills.length > 0 ? `
                    <div class="modal-certificate-skills">
                        <h3>Skills Covered</h3>
                        <div class="certificate-skills">
                            ${certificate.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div class="modal-certificate-actions">
                    ${certificate.credentialUrl ? `
                        <a href="${certificate.credentialUrl}" target="_blank" rel="noopener noreferrer" class="cert-btn cert-btn-primary">
                            <i class="fas fa-external-link-alt"></i>
                            View Original Certificate
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function initializeCertificateAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.fade-in, .scale-in, .slide-in-left').forEach(element => {
        observer.observe(element);
    });
}

// Add these functions to your main.js file

// Global variable to track current image index
let currentImageIndex = 0;
let currentCertificates = [];

// Initialize Image Viewer
function initializeImageViewer() {
    const imageViewer = document.getElementById('image-viewer');
    const imageViewerClose = document.getElementById('image-viewer-close');
    const imageViewerPrev = document.getElementById('image-viewer-prev');
    const imageViewerNext = document.getElementById('image-viewer-next');
    
    if (!imageViewer) return;
    
    // Close image viewer
    imageViewerClose?.addEventListener('click', closeImageViewer);
    
    // Close on clicking overlay
    imageViewer.addEventListener('click', (e) => {
        if (e.target === imageViewer) {
            closeImageViewer();
        }
    });
    
    // Navigation controls
    imageViewerPrev?.addEventListener('click', showPreviousImage);
    imageViewerNext?.addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (imageViewer.style.display === 'block') {
            switch (e.key) {
                case 'Escape':
                    closeImageViewer();
                    break;
                case 'ArrowLeft':
                    showPreviousImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
    
    // Initialize click handlers for certificate images
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('certificate-image') ||
            e.target.classList.contains('modal-certificate-image')) {
            const certificateId = getCertificateIdFromImageClick(e.target);
            if (certificateId) {
                openImageViewer(certificateId);
            }
        }
    });
}

function getCertificateIdFromImageClick(imageElement) {
    // Try to find certificate ID from parent elements
    let parent = imageElement.closest('.certificate-card');
    if (parent) {
        const detailsBtn = parent.querySelector('.view-certificate-details');
        return detailsBtn ? parseInt(detailsBtn.getAttribute('data-certificate-id')) : null;
    }
    
    // If clicked from modal, find from modal data
    parent = imageElement.closest('.modal-certificate');
    if (parent) {
        // Get certificate ID from currently displayed modal
        // We'll need to store this when opening the modal
        return window.currentModalCertificateId || null;
    }
    
    return null;
}

function openImageViewer(certificateId) {
    const certificate = window.certificatesData?.find(c => c.id === certificateId);
    if (!certificate) return;
    
    // Get currently visible certificates for navigation
    const visibleCards = document.querySelectorAll('.certificate-card[style*="block"], .certificate-card:not([style*="none"])');
    currentCertificates = Array.from(visibleCards).map(card => {
        const detailsBtn = card.querySelector('.view-certificate-details');
        const id = detailsBtn ? parseInt(detailsBtn.getAttribute('data-certificate-id')) : null;
        return window.certificatesData?.find(c => c.id === id);
    }).filter(Boolean);
    
    // Find current index
    currentImageIndex = currentCertificates.findIndex(c => c.id === certificateId);
    if (currentImageIndex === -1) {
        // If not found in filtered results, show all certificates
        currentCertificates = window.certificatesData || [];
        currentImageIndex = currentCertificates.findIndex(c => c.id === certificateId);
    }
    
    showImageInViewer(certificate);
    document.getElementById('image-viewer').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function showImageInViewer(certificate) {
    const imageViewerImage = document.getElementById('image-viewer-image');
    const imageViewerTitle = document.getElementById('image-viewer-title');
    const imageViewerOrg = document.getElementById('image-viewer-org');
    const imageViewerPrev = document.getElementById('image-viewer-prev');
    const imageViewerNext = document.getElementById('image-viewer-next');
    
    if (!imageViewerImage) return;
    
    // Show loading state
    imageViewerImage.src = '';
    imageViewerImage.style.opacity = '0.5';
    
    // Update image info
    if (imageViewerTitle) imageViewerTitle.textContent = certificate.name || 'Certificate';
    if (imageViewerOrg) imageViewerOrg.textContent = certificate.organization || 'Organization';
    
    // Show/hide navigation buttons
    if (imageViewerPrev) {
        imageViewerPrev.style.display = currentCertificates.length > 1 ? 'flex' : 'none';
    }
    if (imageViewerNext) {
        imageViewerNext.style.display = currentCertificates.length > 1 ? 'flex' : 'none';
    }
    
    // Load image
    const img = new Image();
    img.onload = function() {
        imageViewerImage.src = this.src;
        imageViewerImage.style.opacity = '1';
        imageViewerImage.alt = certificate.name || 'Certificate';
    };
    img.onerror = function() {
        imageViewerImage.src = 'https://via.placeholder.com/800x600/6366f1/ffffff?text=Certificate+Image+Not+Found';
        imageViewerImage.style.opacity = '1';
    };
    img.src = certificate.imageUrl || 'https://via.placeholder.com/800x600/6366f1/ffffff?text=CERT';
}

function showPreviousImage() {
    if (currentCertificates.length <= 1) return;
    
    currentImageIndex = (currentImageIndex - 1 + currentCertificates.length) % currentCertificates.length;
    showImageInViewer(currentCertificates[currentImageIndex]);
}

function showNextImage() {
    if (currentCertificates.length <= 1) return;
    
    currentImageIndex = (currentImageIndex + 1) % currentCertificates.length;
    showImageInViewer(currentCertificates[currentImageIndex]);
}

function closeImageViewer() {
    const imageViewer = document.getElementById('image-viewer');
    if (imageViewer) {
        imageViewer.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Update the existing populateCertificatesPage function to add click titles
function updateCertificateImages() {
    // Add click hint to certificate images
    document.querySelectorAll('.certificate-image').forEach(img => {
        img.title = 'Click to view full size';
        img.style.cursor = 'pointer';
    });
}

// Project Image Viewer Functions - Add to main.js

// Global variables for project image viewer
let currentProjectImages = [];
let currentProjectImageIndex = 0;
let currentProjectData = null;

// Initialize Project Image Viewer
function initializeProjectImageViewer() {
    // Create image viewer HTML if it doesn't exist
    createProjectImageViewerHTML();
    
    const viewer = document.getElementById('project-image-viewer');
    const closeBtn = document.getElementById('project-viewer-close');
    const prevBtn = document.getElementById('project-viewer-prev');
    const nextBtn = document.getElementById('project-viewer-next');
    
    if (!viewer) return;
    
    // Close viewer
    closeBtn?.addEventListener('click', closeProjectImageViewer);
    
    // Close on overlay click
    viewer.addEventListener('click', (e) => {
        if (e.target === viewer) {
            closeProjectImageViewer();
        }
    });
    
    // Navigation
    prevBtn?.addEventListener('click', showPrevProjectImage);
    nextBtn?.addEventListener('click', showNextProjectImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (viewer.style.display === 'block') {
            switch (e.key) {
                case 'Escape':
                    closeProjectImageViewer();
                    break;
                case 'ArrowLeft':
                    showPrevProjectImage();
                    break;
                case 'ArrowRight':
                    showNextProjectImage();
                    break;
            }
        }
    });
    
    // Add click listeners to project images
    document.addEventListener('click', (e) => {
        if (e.target.closest('.project-image img')) {
            const projectCard = e.target.closest('.project-card');
            const projectId = getProjectIdFromCard(projectCard);
            if (projectId) {
                openProjectImageViewer(projectId, 0);
            }
        }
    });
}

function createProjectImageViewerHTML() {
    // Check if viewer already exists
    if (document.getElementById('project-image-viewer')) return;
    
    const viewerHTML = `
        <div class="project-image-viewer" id="project-image-viewer">
            <div class="project-viewer-overlay"></div>
            <div class="project-viewer-container">
                <button class="project-viewer-close" id="project-viewer-close">&times;</button>
                <button class="project-viewer-nav project-viewer-prev" id="project-viewer-prev">&#8249;</button>
                <button class="project-viewer-nav project-viewer-next" id="project-viewer-next">&#8250;</button>
                
                <div class="project-viewer-content">
                    <img class="project-viewer-image" id="project-viewer-image" src="" alt="">
                    <div class="project-viewer-info">
                        <h3 class="project-viewer-title" id="project-viewer-title"></h3>
                        <div class="project-viewer-counter" id="project-viewer-counter"></div>
                    </div>
                </div>
                
                <div class="project-viewer-thumbnails" id="project-viewer-thumbnails"></div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', viewerHTML);
}

function getProjectIdFromCard(projectCard) {
    if (!projectCard) return null;
    
    // Try to get from info button
    const infoBtn = projectCard.querySelector('.view-details');
    if (infoBtn) {
        return parseInt(infoBtn.getAttribute('data-project-id'));
    }
    
    // Alternative: find project by comparing title or other unique identifier
    const titleElement = projectCard.querySelector('.project-content h3');
    if (titleElement && window.projectsData) {
        const title = titleElement.textContent.trim();
        const project = window.projectsData.find(p => p.title === title);
        return project ? project.id : null;
    }
    
    return null;
}

function openProjectImageViewer(projectId, startIndex = 0) {
    const project = window.projectsData?.find(p => p.id === projectId);
    if (!project || !project.images || project.images.length === 0) return;
    
    currentProjectData = project;
    currentProjectImages = project.images;
    currentProjectImageIndex = startIndex;
    
    const viewer = document.getElementById('project-image-viewer');
    if (!viewer) return;
    
    // Show viewer
    viewer.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Update content
    updateProjectViewerContent();
    createProjectThumbnails();
}

function updateProjectViewerContent() {
    const image = document.getElementById('project-viewer-image');
    const title = document.getElementById('project-viewer-title');
    const counter = document.getElementById('project-viewer-counter');
    const prevBtn = document.getElementById('project-viewer-prev');
    const nextBtn = document.getElementById('project-viewer-next');
    
    if (!image || !currentProjectImages.length) return;
    
    // Update image
    image.src = currentProjectImages[currentProjectImageIndex];
    image.alt = `${currentProjectData.title} - Image ${currentProjectImageIndex + 1}`;
    
    // Update title
    if (title) {
        title.textContent = currentProjectData.title;
    }
    
    // Update counter
    if (counter) {
        counter.textContent = `${currentProjectImageIndex + 1} / ${currentProjectImages.length}`;
    }
    
    // Show/hide navigation buttons
    const hasMultipleImages = currentProjectImages.length > 1;
    if (prevBtn) prevBtn.style.display = hasMultipleImages ? 'block' : 'none';
    if (nextBtn) nextBtn.style.display = hasMultipleImages ? 'block' : 'none';
    
    // Update thumbnails
    updateThumbnailsActive();
}

function createProjectThumbnails() {
    const thumbnailsContainer = document.getElementById('project-viewer-thumbnails');
    if (!thumbnailsContainer || currentProjectImages.length <= 1) {
        thumbnailsContainer.style.display = 'none';
        return;
    }
    
    thumbnailsContainer.style.display = 'flex';
    thumbnailsContainer.innerHTML = '';
    
    currentProjectImages.forEach((imageSrc, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `project-thumbnail ${index === currentProjectImageIndex ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${imageSrc}" alt="Thumbnail ${index + 1}">`;
        
        thumbnail.addEventListener('click', () => {
            currentProjectImageIndex = index;
            updateProjectViewerContent();
        });
        
        thumbnailsContainer.appendChild(thumbnail);
    });
}

function updateThumbnailsActive() {
    const thumbnails = document.querySelectorAll('.project-thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentProjectImageIndex);
    });
}

function showPrevProjectImage() {
    if (currentProjectImages.length <= 1) return;
    
    currentProjectImageIndex = (currentProjectImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
    updateProjectViewerContent();
}

function showNextProjectImage() {
    if (currentProjectImages.length <= 1) return;
    
    currentProjectImageIndex = (currentProjectImageIndex + 1) % currentProjectImages.length;
    updateProjectViewerContent();
}

function closeProjectImageViewer() {
    const viewer = document.getElementById('project-image-viewer');
    if (viewer) {
        viewer.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    // Reset variables
    currentProjectImages = [];
    currentProjectImageIndex = 0;
    currentProjectData = null;
}

// Update the populateProjectsPage function to include image click functionality
function updatePopulateProjectsPageForImages() {
    // This function should be called after populateProjectsPage()
    // Add click cursor to project images
    document.querySelectorAll('.project-image img').forEach(img => {
        img.style.cursor = 'pointer';
        img.title = 'Click to view all images';
    });
}
