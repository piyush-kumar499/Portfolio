// Centralized data store for all portfolio content
// Initialize data immediately to ensure availability
(function() {
    'use strict';
    
    // Basic Information
window.personalData = {
    name: "Piyush Kumar Chaurasiya",
    title: "🎓 B.Tech CSE (AI & ML) | Future AI/ML Engineer",
    email: "piyushchaurasiya805@gmail.com",
    phone: "", // Intentionally left empty
    location: "Gopalganj, Bihar 841428",
    profileImage: "assets/images/piyush.jpg", // Update this path if needed
    resumeUrl: "", // Optional: add resume download URL later
    
    // Biography
    shortBio: "🚀 Passionate about building intelligent systems and impactful web applications. I’m a B.Tech student specializing in Artificial Intelligence and Machine Learning, eager to explore real-world use cases of AI while mastering full-stack web development. Always driven by curiosity, I strive to turn ideas into reality through code, learning, and collaboration.",
    
    fullBio: [
    "👋 Hey there! I'm **Piyush Kumar Chaurasiya** — a passionate and ambitious Computer Science Engineering undergraduate *(2025–2029)* specializing in **Artificial Intelligence and Machine Learning**. I’m driven by curiosity, fueled by creativity, and constantly inspired by how technology can solve meaningful problems around us.",
    
    "🚀 My journey in tech began with basic programming and web development, but quickly expanded into full-stack application design, cloud computing, and machine learning. I’m fascinated by how intelligent systems can enhance decision-making, automate tedious processes, and unlock powerful user experiences — and I aim to be part of building such systems that scale and serve people worldwide.",
    
    "💻 In the world of development, I enjoy building **end-to-end solutions**. From crafting sleek and responsive front-end interfaces using React or Vue, to building robust back-end APIs with Node.js or Python, I thrive in environments that challenge me to learn fast, think logically, and code cleanly. I also explore real-world AI problems — including classification models, recommendation systems, and NLP — and continuously work on side projects to strengthen both theory and practice.",
    
    "📚 I'm a strong believer in **continuous learning**, whether it's through online platforms, hackathons, developer communities, or open-source contributions. I actively follow the latest advancements in AI and software engineering and often build proof-of-concept projects, watch deep-dive tech talks, or write clean documentation and notes to reinforce my understanding.",
    
    "🧠 Outside of development, I enjoy reading about startup journeys, UI/UX case studies, and AI ethics. I believe that **soft skills** like communication, adaptability, and empathy are just as crucial as technical ability — especially when working in a team or leading others toward a common vision.",
    
    "🤝 I'm currently open to **internships, remote collaborations, freelance projects**, and **mentorship** — anything that helps me learn by doing and contribute meaningfully in return. If you're working on something exciting in the space of AI, full-stack engineering, or innovative education tech, I’d love to connect and be a part of it!",
    
    "🎯 My mission is simple: **Keep learning, stay humble, build useful things, and make a positive impact with technology.**"
],
        
        // Social Links
social: [
    {
        platform: "GitHub",
        url: "https://github.com/piyush-kumar499",
        icon: "fab fa-github"
    },
    {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/piyushchaurasiya091",
        icon: "fab fa-linkedin"
    },
    {
        platform: "Twitter",
        url: "",
        icon: "fab fa-twitter"
    },
    {
        platform: "Instagram",
        url: "",
        icon: "fab fa-instagram"
    },
    {
        platform: "Email",
        url: "mailto:piyushchaurasiya805@gmail.com",
        icon: "fas fa-envelope"
    }
],
        
        // Education
education: [
    {
        degree: "High School (10th)",
        institution: "Sarla Bhrama Bal Vidya Mandir, Motihari",
        year: "2021 – 2023",
        description: "Completed foundational education with strong academic performance, developing core skills in mathematics, science, and logical reasoning. Built early interest in computer science through hands-on learning and school-level competitions."
    },
    {
        degree: "Senior Secondary (12th)",
        institution: "Gyanda International School, Gopalganj",
        year: "2023 – 2025",
        description: "Pursued science stream with a focus on Physics, Chemistry, and Mathematics. Actively participated in coding workshops and tech activities, which further deepened my interest in technology and software development."
    },
    {
        degree: "B.Tech in Computer Science and Engineering (AI & ML)",
        institution: "Bansal Institute Of Engineering and Technology, Lucknow",
        year: "2025 – Pursuing",
        description: "Currently pursuing undergraduate studies with specialization in Artificial Intelligence and Machine Learning. Focused on building intelligent systems, solving real-world problems using data, and gaining expertise in full-stack web development alongside AI/ML concepts."
    }
],
        
        // Goals & Passions
goals: [
        "🎯 Become a skilled AI/ML Engineer capable of building intelligent systems that create real-world impact",
        "💻 Build modern, responsive, and scalable web applications using full-stack technologies",
        "🚀 Gain practical experience through internships, freelance projects, and collaborations with real teams",
        "📚 Never stop learning — constantly explore new frameworks, AI tools, and industry best practices",
        "🌐 Contribute to open-source projects and grow as a developer by learning from the community",
        "🎤 Share my learning journey through blogs, social media, and developer communities"
    ],
    
    passions: [
        "🤖 Applying AI and Machine Learning to solve real-world challenges and automate smart solutions",
        "🧠 Understanding how technology works beneath the surface and building things from scratch",
        "🎨 Designing clean, user-friendly interfaces with attention to detail and accessibility",
        "🛠️ Writing maintainable, modular, and performance-optimized code across the stack",
        "🌱 Growing continuously as a developer while helping others in their learning journey",
        "📈 Bridging the gap between theory and practice by working on meaningful projects"
    ],
        
        // Personal Interests
interests: [
    {
        title: "Coding & Problem Solving",
        icon: "fas fa-code",
        description: "Solving real-world problems through logic, algorithms, and creative coding"
    },
    {
        title: "AI & Machine Learning",
        icon: "fas fa-robot",
        description: "Building intelligent systems, exploring ML models, and applying AI to real-world challenges"
    },
    {
        title: "Full-Stack Web Development",
        icon: "fas fa-laptop-code",
        description: "Creating responsive, scalable applications using modern frontend and backend technologies"
    },
    {
        title: "Continuous Learning",
        icon: "fas fa-graduation-cap",
        description: "Exploring new technologies, frameworks, and industry trends through self-learning"
    },
    {
        title: "Tech Communities & Collaboration",
        icon: "fas fa-users",
        description: "Engaging with like-minded developers through open source, forums, and peer learning"
    },
    {
        title: "UI/UX & Design Thinking",
        icon: "fas fa-pencil-ruler",
        description: "Designing intuitive user experiences with clean interfaces and accessible layouts"
    },
    {
        title: "Exploring Future Technologies",
        icon: "fas fa-microchip",
        description: "Staying curious about emerging fields like robotics, automation, and ethical AI"
    },
    {
        title: "Music & Refreshment",
        icon: "fas fa-music",
        description: "Listening to music and content to stay creative, motivated, and balanced while learning or coding"
    }
]
    };

// Skills Data
window.skillsData = {
    programming: [
    { name: "JavaScript", level: 85, icon: "fab fa-js-square", color: "#f7df1e" },
    { name: "TypeScript", level: 60, icon: "fab fa-js-square", color: "#3178c6" },
    { name: "Python", level: 80, icon: "fab fa-python", color: "#3776ab" },
    { name: "Java", level: 60, icon: "fab fa-java", color: "#ed8b00" },
    { name: "C++", level: 70, icon: "fas fa-code", color: "#00599c" },
    { name: "C", level: 65, icon: "fas fa-terminal", color: "#555555" },
    { name: "PHP", level: 60, icon: "fab fa-php", color: "#777bb4" },
    { name: "HTML5", level: 90, icon: "fab fa-html5", color: "#e34c26" },
    { name: "CSS3", level: 85, icon: "fab fa-css3-alt", color: "#264de4" },
    { name: "SQL", level: 75, icon: "fas fa-database", color: "#003B57" },
    { name: "MySQL", level: 70, icon: "fas fa-database", color: "#4479A1" },
    { name: "Go (Golang)", level: 30, icon: "fas fa-terminal", color: "#00ADD8" },
    { name: "Kotlin", level: 25, icon: "fas fa-mobile-alt", color: "#A97BFF" },
    { name: "Swift", level: 20, icon: "fab fa-swift", color: "#FA7343" },
    { name: "Ruby", level: 25, icon: "fas fa-gem", color: "#CC342D" },
    { name: "Rust", level: 15, icon: "fas fa-cogs", color: "#DEA584" },
    { name: "R", level: 20, icon: "fas fa-chart-line", color: "#276DC3" },
    { name: "MATLAB", level: 30, icon: "fas fa-calculator", color: "#0076A8" },
    { name: "Bash", level: 40, icon: "fas fa-terminal", color: "#2e3436" },
    { name: "JSON", level: 80, icon: "fas fa-code", color: "#292929" }
],
    
    frameworks: [
        { name: "React.js", level: 30, icon: "fab fa-react", color: "#61dafb" },
        { name: "Node.js", level: 30, icon: "fab fa-node-js", color: "#339933" },
        { name: "Express.js", level: 25, icon: "fas fa-server", color: "#000000" },
        { name: "Next.js", level: 20, icon: "fas fa-bolt", color: "#000000" },
        { name: "Vue.js", level: 15, icon: "fab fa-vuejs", color: "#4fc08d" },
        { name: "Angular", level: 10, icon: "fab fa-angular", color: "#dd0031" },
        { name: "Flask", level: 20, icon: "fas fa-flask", color: "#000000" },
        { name: "Django", level: 15, icon: "fas fa-code", color: "#092e20" }
    ],
    
    tools: [
        { name: "Git & GitHub", level: 90, icon: "fab fa-git-alt", color: "#f05032" },
        { name: "Docker", level: 20, icon: "fab fa-docker", color: "#2496ed" },
        { name: "AWS", level: 25, icon: "fab fa-aws", color: "#ff9900" },
        { name: "MongoDB", level: 60, icon: "fas fa-database", color: "#47a248" },
        { name: "PostgreSQL", level: 30, icon: "fas fa-database", color: "#336791" },
        { name: "Redis", level: 20, icon: "fas fa-database", color: "#dc382d" },
        { name: "Firebase", level: 30, icon: "fas fa-fire", color: "#FFA611" },
        { name: "VS Code", level: 90, icon: "fas fa-terminal", color: "#007ACC" },
        { name: "Postman", level: 80, icon: "fas fa-paper-plane", color: "#ff6c37" },
        { name: "Figma", level: 70, icon: "fab fa-figma", color: "#a259ff" },
        { name: "Jest", level: 20, icon: "fas fa-vial", color: "#c21325" },
        { name: "Webpack", level: 25, icon: "fas fa-cube", color: "#8dd6f9" },
        { name: "Netlify", level: 40, icon: "fas fa-cloud", color: "#00c7b7" },
        { name: "NPM & Node Package Manager", level: 70, icon: "fab fa-npm", color: "#CB3837" },
        { name: "Canva", level: 65, icon: "fas fa-paint-brush", color: "#00C4CC" }
    ],
    
    soft: [
    { name: "Self-Learning", description: "Actively learns new tools, technologies, and concepts through self-directed study" },
    { name: "Problem Solving", description: "Breaks down complex problems and creates logical, working solutions" },
    { name: "Growth Mindset", description: "Believes in continuous improvement and learning from mistakes or feedback" },
    { name: "Attention to Detail", description: "Focuses on accuracy, quality, and polish in both code and presentation" },
    { name: "Adaptability", description: "Quickly adapts to new environments, tools, and development practices" },
    { name: "Communication", description: "Explains technical ideas clearly in written, verbal, and visual formats" },
    { name: "Project Ownership", description: "Takes responsibility for planning, building, and completing personal or team projects" },
    { name: "Creativity", description: "Applies original ideas to both problem solving and user experience design" },
    { name: "Time Management", description: "Effectively manages time across studies, learning, and project work" },
    { name: "Goal-Oriented Thinking", description: "Always works toward meaningful objectives with a focus on real-world outcomes" },
    { name: "Initiative & Proactiveness", description: "Starts and improves tasks without waiting — self-motivated and forward-looking" },
    { name: "Persistence & Grit", description: "Keeps going through challenges, debugging, or long tasks without giving up" },
    { name: "Open to Feedback", description: "Welcomes constructive criticism and uses it to grow technically and personally" },
    { name: "Critical Thinking", description: "Analyzes decisions logically and evaluates the best path or solution" },
    { name: "Collaboration", description: "Works well with others, contributes ideas, and listens to improve team outcomes" },
    { name: "Tech Adaptability", description: "Learns and experiments with a wide variety of development tools and stacks" },
    { name: "Empathy for Users", description: "Thinks from the user's perspective when designing or developing apps" },
    { name: "Analytical Thinking", description: "Breaks down data, patterns, and systems to improve processes or performance" }
]
};

// Projects Data - Main source for all project information
window.projectsData = [
    {
        id: 1,
        title: "Full PHP Website with Backend",
        shortDescription: "A complete PHP-based website with authentication and database integration",
        fullDescription: "A dynamic and fully functional PHP website that includes user authentication (login/signup), secure session handling, database operations using MySQL, and admin-side features. Built to simulate a production-ready structure with proper file handling and UI elements.",
        technologies: ["PHP", "JavaScript", "MySQL", "HTML", "CSS"],
        category: "web",
        featured: true,
        image: "https://via.placeholder.com/500x300/00599c/ffffff?text=PHP+Website",
        githubUrl: "",
        liveUrl: "",
        completedDate: "2025-03-30",
        highlights: [
            "Secure authentication system",
            "MySQL-based data management",
            "Form validation and session handling",
            "Admin panel with basic CMS logic"
        ]
    },
    {
        id: 2,
        title: "Authentication Page (Login/Signup)",
        shortDescription: "A simple and secure authentication system",
        fullDescription: "Designed a lightweight authentication page using PHP, HTML, CSS, and JavaScript. Handles form submission, input validation, and login session initialization.",
        technologies: ["PHP", "JavaScript", "HTML", "CSS"],
        category: "web",
        featured: false,
        image: "https://via.placeholder.com/500x300/222222/ffffff?text=Login+Page",
        githubUrl: "",
        liveUrl: "",
        completedDate: "2024-12-15",
        highlights: [
            "Session-based login system",
            "Responsive form design",
            "Client-side and server-side validation"
        ]
    },
    {
        id: 3,
        title: "Unit Converter Toolkit",
        shortDescription: "10 conversion tools built with PHP and JavaScript",
        fullDescription: "A suite of unit conversion tools including temperature, area, time, speed, length, volume, pressure, mass, energy, and storage. Each tool is built as an individual PHP-powered interface with dynamic JavaScript functionality.",
        technologies: ["PHP", "JavaScript", "HTML", "CSS"],
        category: "tools",
        featured: false,
        image: "https://via.placeholder.com/500x300/007bff/ffffff?text=Converters",
        githubUrl: "",
        liveUrl: "",
        completedDate: "2025-07-15",
        highlights: [
            "10 types of measurement units",
            "Lightweight and responsive",
            "User-friendly interface",
            "Reusable modular structure"
        ]
    },
    {
        id: 4,
        title: "Image Size Reducer (PHP)",
        shortDescription: "Compress images using PHP server-side scripting",
        fullDescription: "A simple web-based tool to upload and compress images using PHP and JavaScript. Reduces file size while preserving image quality.",
        technologies: ["PHP", "JavaScript", "HTML", "CSS"],
        category: "tools",
        featured: false,
        image: "https://via.placeholder.com/500x300/17a2b8/ffffff?text=Image+Reducer",
        githubUrl: "",
        liveUrl: "",
        completedDate: "2025-05-10",
        highlights: [
            "Image compression via PHP",
            "Drag and drop image upload",
            "Progress indicator with real-time feedback"
        ]
    },
    {
        id: 5,
        title: "Image to PDF Generator",
        shortDescription: "Convert uploaded images into downloadable PDFs",
        fullDescription: "This tool allows users to upload multiple images and convert them into a single PDF file using client-side scripting. Built using vanilla JS and styled for user simplicity.",
        technologies: ["HTML", "CSS", "JavaScript"],
        category: "tools",
        featured: false,
        image: "https://via.placeholder.com/500x300/ffc107/000000?text=Image+to+PDF",
        githubUrl: "",
        liveUrl: "",
        completedDate: "2025-04-20",
        highlights: [
            "Supports multiple image inputs",
            "Client-side PDF generation",
            "Simple and minimal UI"
        ]
    },
    {
        id: 6,
        title: "Image Size Reducer (JS)",
        shortDescription: "Frontend image compression using JavaScript",
        fullDescription: "Client-side tool built to compress images before uploading. Great for optimizing uploads without needing a backend server.",
        technologies: ["HTML", "CSS", "JavaScript"],
        category: "tools",
        featured: false,
        image: "https://via.placeholder.com/500x300/20c997/ffffff?text=JS+Reducer",
        githubUrl: "",
        liveUrl: "",
        completedDate: "2025-01-10",
        highlights: [
            "Drag-and-drop image input",
            "Client-side compression algorithm",
            "Instant download of reduced files"
        ]
    },
    {
        id: 7,
        title: "HTML Colour Palette",
        shortDescription: "Explore and pick HTML-safe color palettes",
        fullDescription: "A UI tool to explore and select color palettes useful for HTML and web development. Includes hex and RGB previews.",
        technologies: ["HTML", "CSS", "JavaScript"],
        category: "tools",
        featured: false,
        image: "https://via.placeholder.com/500x300/fd7e14/ffffff?text=Color+Palette",
        githubUrl: "",
        liveUrl: "",
        completedDate: "2025-01-05",
        highlights: [
            "Hex and RGB color preview",
            "Copy-to-clipboard support",
            "Color swatch viewer"
        ]
    },
    {
        id: 8,
        title: "Colour Code Picker",
        shortDescription: "Select colors and get corresponding code values",
        fullDescription: "Simple tool that allows developers to pick a color and receive its hex, RGB, and HSL values instantly.",
        technologies: ["HTML", "CSS", "JavaScript"],
        category: "tools",
        featured: false,
        image: "https://via.placeholder.com/500x300/6f42c1/ffffff?text=Color+Picker",
        githubUrl: "",
        liveUrl: "",
        completedDate: "2024-12-20",
        highlights: [
            "Instant color preview",
            "Multiple format outputs",
            "Easy-to-use interface"
        ]
    },
    {
        id: 9,
        title: "AI Chatbot",
        shortDescription: "Basic AI chatbot simulation using JS",
        fullDescription: "Built a simple AI chatbot interface using HTML, CSS, and JavaScript. The bot uses predefined responses to mimic a conversational flow and dynamically renders replies.",
        technologies: ["HTML", "CSS", "JavaScript"],
        category: "ai",
        featured: false,
        image: "https://via.placeholder.com/500x300/e83e8c/ffffff?text=AI+Chatbot",
        githubUrl: "",
        liveUrl: "",
        completedDate: "2024-11-25",
        highlights: [
            "Conversation UI flow",
            "Simulated text-based intelligence",
            "Typing indicator feature"
        ]
    },
    {
        id: 10,
        title: "AI Assistant",
        shortDescription: "Basic AI-powered assistant prototype",
        fullDescription: "A front-end simulation of an AI assistant that handles simple queries and responses. Built using JavaScript logic and styled for modern interaction.",
        technologies: ["HTML", "CSS", "JavaScript"],
        category: "ai",
        featured: false,
        image: "https://via.placeholder.com/500x300/6f42c1/ffffff?text=AI+Assistant",
        githubUrl: "",
        liveUrl: "",
        completedDate: "2024-11-20",
        highlights: [
            "Predefined AI-like command structure",
            "Voice-like UI simulation",
            "Smooth UI experience"
        ]
    },
{
    id: 11,
    title: "Basic Calculator",
    shortDescription: "Perform basic arithmetic operations easily",
    fullDescription: "A user-friendly calculator to perform basic arithmetic operations including addition, subtraction, multiplication, and division using JavaScript and responsive layout.",
    technologies: ["HTML", "CSS", "JavaScript"],
    category: "tools",
    featured: false,
    image: "https://via.placeholder.com/500x300/007bff/ffffff?text=Basic+Calculator",
    githubUrl: "",
    liveUrl: "",
    completedDate: "2024-07-15",
    highlights: [
        "Simple and intuitive UI",
        "Handles basic arithmetic operations",
        "Responsive layout for mobile users"
    ]
},
{
    id: 12,
    title: "Advanced Mortgage Calculator",
    shortDescription: "Calculate mortgage details with advanced breakdowns",
    fullDescription: "An advanced mortgage calculator allowing users to calculate monthly payments, loan amortization, interest, and total cost. Suitable for both home buyers and finance learners.",
    technologies: ["HTML", "CSS", "JavaScript"],
    category: "tools",
    featured: false,
    image: "https://via.placeholder.com/500x300/17a2b8/ffffff?text=Mortgage+Calculator",
    githubUrl: "https://github.com/piyush-kumar499/Calculator-Projects/tree/main/Advance%20Mortgage%20Calculator",
    liveUrl: "",
    completedDate: "2024-07-10",
    highlights: [
        "Interest breakdown calculations",
        "EMI and total cost preview",
        "Responsive and clean UI"
    ]
},
{
    id: 13,
    title: "BMI Calculator",
    shortDescription: "Calculate Body Mass Index quickly and accurately",
    fullDescription: "A lightweight and responsive tool for calculating Body Mass Index (BMI) based on user-provided height and weight. Provides instant feedback on health categories.",
    technologies: ["HTML", "CSS", "JavaScript"],
    category: "tools",
    featured: false,
    image: "https://via.placeholder.com/500x300/28a745/ffffff?text=BMI+Calculator",
    githubUrl: "",
    liveUrl: "",
    completedDate: "2024-06-20",
    highlights: [
        "Health classification results",
        "Interactive and responsive layout",
        "Real-time result generation"
    ]
},
{
    id: 14,
    title: "EMI Calculator",
    shortDescription: "Compute loan EMI, total interest and repayment details",
    fullDescription: "This EMI Calculator helps users calculate the monthly installment, interest payable, and total payment for a loan. Useful for financial planning and budgeting.",
    technologies: ["HTML", "CSS", "JavaScript"],
    category: "tools",
    featured: false,
    image: "https://via.placeholder.com/500x300/fd7e14/ffffff?text=EMI+Calculator",
    githubUrl: "",
    liveUrl: "",
    completedDate: "2024-05-25",
    highlights: [
        "Supports principal/interest/tenure inputs",
        "Real-time EMI and total cost output",
        "User-friendly and minimal design"
    ]
},
{
    id: 15,
    title: "Age Calculator",
    shortDescription: "Calculate exact age in years, months and days",
    fullDescription: "This tool calculates the exact age of a person from their date of birth. Displays the result in years, months, and days. Built with pure JavaScript and fully responsive.",
    technologies: ["HTML", "CSS", "JavaScript"],
    category: "tools",
    featured: false,
    image: "https://via.placeholder.com/500x300/6f42c1/ffffff?text=Age+Calculator",
    githubUrl: "",
    liveUrl: "",
    completedDate: "2024-05-10",
    highlights: [
        "Precise date-based age calculation",
        "Supports leap years and date edge cases",
        "Smooth UX with live results"
    ]
},
{
    id: 16,
    title: "Area Converter Tool",
    shortDescription: "Convert between different units of area quickly",
    fullDescription: "This area converter allows users to switch between various area measurement units such as square meters, square feet, hectares, and acres. Developed as part of a unit converter toolkit.",
    technologies: ["PHP", "JavaScript", "HTML", "CSS"],
    category: "tools",
    featured: false,
    image: "https://via.placeholder.com/500x300/ffc107/000000?text=Area+Converter",
    githubUrl: "",
    liveUrl: "",
    completedDate: "2025-04-10",
    highlights: [
        "Supports multiple area units",
        "Built for real-time conversion",
        "Responsive and easy to use"
    ]
},
{
    id: 17,
    title: "Temperature Converter Tool",
    shortDescription: "Convert temperatures between Celsius, Fahrenheit, and Kelvin",
    fullDescription: "This tool enables conversion between Celsius, Fahrenheit, and Kelvin with accurate precision. Designed for both academic and practical use.",
    technologies: ["PHP", "JavaScript", "HTML", "CSS"],
    category: "tools",
    featured: false,
    image: "https://via.placeholder.com/500x300/17a2b8/ffffff?text=Temp+Converter",
    githubUrl: "",
    liveUrl: "",
    completedDate: "2025-04-12",
    highlights: [
        "Handles decimal inputs",
        "Real-time calculation",
        "Mobile-friendly UI"
    ]
},
{
    id: 18,
    title: "Weight/Mass Converter Tool",
    shortDescription: "Switch between common mass and weight units",
    fullDescription: "A weight converter tool supporting units like grams, kilograms, pounds, and ounces. Offers instant conversion results for daily use or academic purposes.",
    technologies: ["PHP", "JavaScript", "HTML", "CSS"],
    category: "tools",
    featured: false,
    image: "https://via.placeholder.com/500x300/28a745/ffffff?text=Mass+Converter",
    githubUrl: "",
    liveUrl: "",
    completedDate: "2025-04-18",
    highlights: [
        "Supports metric and imperial units",
        "Live unit-to-unit conversion",
        "Clean UI with dropdown selector"
    ]
},
{
    id: 19,
    title: "Digital Storage Converter Tool",
    shortDescription: "Convert between bytes, kilobytes, megabytes, and more",
    fullDescription: "Designed to convert storage units such as bytes, KB, MB, GB, and TB. Useful for developers, engineers, and students handling data size comparisons.",
    technologies: ["PHP", "JavaScript", "HTML", "CSS"],
    category: "tools",
    featured: false,
    image: "https://via.placeholder.com/500x300/007bff/ffffff?text=Storage+Converter",
    githubUrl: "",
    liveUrl: "",
    completedDate: "2025-04-22",
    highlights: [
        "Covers binary and decimal units",
        "Responsive table of values",
        "Optimized for performance"
    ]
},
{
    id: 20,
    title: "Energy Converter Tool",
    shortDescription: "Convert between Joules, Calories, and Kilowatt-hours",
    fullDescription: "A compact tool to convert energy measurements commonly used in physics and electrical systems. Built for students and professionals alike.",
    technologies: ["PHP", "JavaScript", "HTML", "CSS"],
    category: "tools",
    featured: false,
    image: "https://via.placeholder.com/500x300/fd7e14/ffffff?text=Energy+Converter",
    githubUrl: "",
    liveUrl: "",
    completedDate: "2025-05-01",
    highlights: [
        "Supports all standard energy units",
        "Includes tooltip definitions for each unit",
        "Instant responsive results"
    ]
},
{
    id: 21,
    title: "Length Converter Tool",
    shortDescription: "Convert lengths between meters, inches, feet, and more",
    fullDescription: "A tool designed to convert between various length units such as meters, kilometers, inches, feet, and miles. Built with responsiveness and simplicity in mind.",
    technologies: ["PHP", "JavaScript", "HTML", "CSS"],
    category: "tools",
    featured: false,
    image: "https://via.placeholder.com/500x300/20c997/ffffff?text=Length+Converter",
    githubUrl: "",
    liveUrl: "",
    completedDate: "2025-05-08",
    highlights: [
        "Metric and imperial unit support",
        "Real-time conversions",
        "Mobile-optimized design"
    ]
},
{
    id: 22,
    title: "Pressure Converter Tool",
    shortDescription: "Convert between different pressure units accurately",
    fullDescription: "A handy utility for converting pressure values among units like Pascal, Bar, PSI, and atm. Ideal for scientific and mechanical applications.",
    technologies: ["PHP", "JavaScript", "HTML", "CSS"],
    category: "tools",
    featured: false,
    image: "https://via.placeholder.com/500x300/e83e8c/ffffff?text=Pressure+Converter",
    githubUrl: "",
    liveUrl: "",
    completedDate: "2025-05-15",
    highlights: [
        "Supports scientific and daily units",
        "Built with conversion formulas",
        "Interactive dropdown and input"
    ]
},
{
    id: 23,
    title: "Speed Converter Tool",
    shortDescription: "Convert between various speed units easily",
    fullDescription: "This tool enables users to convert between speed units such as km/h, m/s, mph, and knots. Designed for transportation and physics use cases.",
    technologies: ["PHP", "JavaScript", "HTML", "CSS"],
    category: "tools",
    featured: false,
    image: "https://via.placeholder.com/500x300/6f42c1/ffffff?text=Speed+Converter",
    githubUrl: "",
    liveUrl: "",
    completedDate: "2025-05-22",
    highlights: [
        "Fast and accurate conversions",
        "Dropdown for selecting input/output units",
        "Optimized for all screen sizes"
    ]
},
{
    id: 24,
    title: "Time Converter Tool",
    shortDescription: "Convert between time formats and units",
    fullDescription: "Convert between seconds, minutes, hours, days, and weeks. Built as part of the comprehensive unit converter series using PHP and JavaScript.",
    technologies: ["PHP", "JavaScript", "HTML", "CSS"],
    category: "tools",
    featured: false,
    image: "https://via.placeholder.com/500x300/28a745/ffffff?text=Time+Converter",
    githubUrl: "",
    liveUrl: "",
    completedDate: "2025-06-01",
    highlights: [
        "Flexible unit conversion",
        "Responsive inputs and outputs",
        "Lightweight and fast loading"
    ]
},
{
    id: 25,
    title: "Volume Converter Tool",
    shortDescription: "Convert volume units like liters, gallons, and milliliters",
    fullDescription: "A conversion utility to convert volumes between liters, milliliters, cubic meters, gallons, and more. Designed for practical kitchen, academic, and scientific purposes.",
    technologies: ["PHP", "JavaScript", "HTML", "CSS"],
    category: "tools",
    featured: false,
    image: "https://via.placeholder.com/500x300/fd7e14/ffffff?text=Volume+Converter",
    githubUrl: "",
    liveUrl: "",
    completedDate: "2025-07-01",
    highlights: [
        "Covers kitchen to scientific units",
        "Intuitive design with unit info",
        "Real-time result updates"
    ]
}
];


    // Contact Information
    window.contactData = {
        email: "piyushchaurasiya805@gmail.com",
        phone: "No Phone",
        location: "Gopalganj, Bihar 841428",
        availability: "Available for freelance projects, internships and full-time opportunities",
        responseTime: "I typically respond within 24 hours"
    };

    // Dispatch custom event to notify that data is loaded
    const dataLoadedEvent = new CustomEvent('portfolioDataLoaded', {
        detail: {
            personalData: window.personalData,
            skillsData: window.skillsData,
            projectsData: window.projectsData,
            contactData: window.contactData
        }
    });
    
    // Dispatch immediately if DOM is already loaded, otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            document.dispatchEvent(dataLoadedEvent);
        });
    } else {
        document.dispatchEvent(dataLoadedEvent);
    }

})();