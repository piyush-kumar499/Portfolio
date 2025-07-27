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
    
    // Populate skills preview (top 6 skills)
    const skillsContainer = document.getElementById('skills-preview-grid');
if (skillsContainer && window.skillsData) {
    skillsContainer.innerHTML = '';
    
    const topSkills = [...(window.skillsData.programming || []), ...(window.skillsData.frameworks || [])]
        .sort((a, b) => (b.level || 0) - (a.level || 0))
        .slice(0, 6);
    
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
                        <div class="skill-progress" style="width: ${skill.level || 75}%; background-color: ${skill.color || '#007bff'}"></div>
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

// Projects Page Functions
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
                <div class="project-overlay">
                    <div class="project-links">
                        ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link"><i class="fab fa-github"></i></a>` : ''}
                        ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link"><i class="fas fa-external-link-alt"></i></a>` : ''}
                        <button class="project-link view-details" data-project-id="${project.id || 0}"><i class="fas fa-info-circle"></i></button>
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
