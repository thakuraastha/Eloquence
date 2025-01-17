 
        // Navigation scroll effect
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.nav');
            if (window.scrollY > 20) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        menuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Responsive navigation
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                navLinks.style.display = 'flex';
            } else {
                navLinks.style.display = 'none';
            }
        });
 
 
 
 
 // Data
 const questions = [
  {
      question: "Tell me about yourself.",
      tip: "Focus on professional experiences and achievements relevant to the role.",
  },
  {
      question: "What is your greatest strength?",
      tip: "Align your strength with the job requirements and provide specific examples.",
  },
  {
      question: "Where do you see yourself in five years?",
      tip: "Show ambition while remaining realistic and relevant to the company's growth.",
  },
  {
      question: "Why should we hire you?",
      tip: "Emphasize your unique skills and how they match the company's needs.",
  },
  {
      question: "What is your biggest weakness?",
      tip: "Choose a genuine weakness but focus on how you're working to improve it.",
  },
];

const categories = [
  {
      title: "Technical Interviews",
      description: "Practice coding problems, system design, and technical concepts.",
      icon: "💻",
      questions: 150,
  },
  {
      title: "Behavioral Interviews",
      description: "Prepare for questions about your experience and work style.",
      icon: "👥",
      questions: 100,
  },
  {
      title: "Leadership Interviews",
      description: "Focus on management, strategy, and team leadership scenarios.",
      icon: "📊",
      questions: 75,
  },
  {
      title: "HR Interviews",
      description: "Common questions about your background, goals, and expectations.",
      icon: "📋",
      questions: 120,
  },
];

const tips = [
  {
      title: "Research the Company",
      content: "Thoroughly research the company's history, mission, values, products/services, and recent news. This shows genuine interest and helps you align your answers with their culture.",
  },
  {
      title: "Practice the STAR Method",
      content: "When answering behavioral questions, use the STAR method: Situation, Task, Action, Result. This structure helps you provide clear, concise, and compelling examples.",
  },
  {
      title: "Prepare Questions",
      content: "Have thoughtful questions ready for your interviewer about the role, team, company culture, and growth opportunities. This demonstrates your enthusiasm and critical thinking.",
  },
  {
      title: "Body Language",
      content: "Maintain good eye contact, offer a firm handshake, sit up straight, and smile. Your non-verbal communication is just as important as your verbal responses.",
  },
  {
      title: "Follow Up",
      content: "Send a thank-you email within 24 hours of your interview. Reference specific conversation points and reiterate your interest in the position.",
  },
];

// Initialize practice questions
let currentQuestionIndex = 0;
const questionElement = document.getElementById('current-question');
const tipContainer = document.getElementById('tip-container');
const tipElement = document.getElementById('current-tip');
const toggleTipButton = document.getElementById('toggle-tip');
const nextQuestionButton = document.getElementById('next-question');

function updateQuestion() {
  questionElement.textContent = questions[currentQuestionIndex].question;
  tipElement.textContent = questions[currentQuestionIndex].tip;
  tipContainer.style.display = 'none';
  toggleTipButton.textContent = 'Show Tip';
}

toggleTipButton.addEventListener('click', () => {
  const isHidden = tipContainer.style.display === 'none';
  tipContainer.style.display = isHidden ? 'block' : 'none';
  toggleTipButton.textContent = isHidden ? 'Hide Tip' : 'Show Tip';
});

nextQuestionButton.addEventListener('click', () => {
  currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
  updateQuestion();
});

// Initialize categories
const categoriesGrid = document.querySelector('.categories-grid');
categories.forEach(category => {
  const categoryCard = document.createElement('div');
  categoryCard.className = 'category-card';
  categoryCard.innerHTML = `
      <div class="category-header">
          <span class="category-icon">${category.icon}</span>
          <h3 class="category-title">${category.title}</h3>
      </div>
      <p class="category-description">${category.description}</p>
      <span class="badge">${category.questions} questions</span>
      <div class="button-group">
          <button class="button button-primary">Start Practice</button>
      </div>
  `;
  categoriesGrid.appendChild(categoryCard);
});

// Initialize tips
const accordion = document.querySelector('.accordion');
tips.forEach((tip, index) => {
  const item = document.createElement('div');
  item.className = 'accordion-item';
  item.innerHTML = `
      <button class="accordion-trigger" aria-expanded="false" aria-controls="tip-content-${index}">
          ${tip.title}
          <svg class="accordion-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
      </button>
      <div class="accordion-content" id="tip-content-${index}" aria-hidden="true">
          ${tip.content}
      </div>
  `;
  accordion.appendChild(item);
});

// Tab functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
      // Update tab buttons
      tabButtons.forEach(btn => btn.setAttribute('aria-selected', 'false'));
      button.setAttribute('aria-selected', 'true');

      // Update tab panels
      const targetId = button.getAttribute('aria-controls');
      tabPanels.forEach(panel => {
          panel.setAttribute('aria-hidden', panel.id !== targetId);
      });
  });
});

// Accordion functionality
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const content = trigger.nextElementSibling;

      trigger.setAttribute('aria-expanded', !isExpanded);
      content.setAttribute('aria-hidden', isExpanded);
  });
});

// Answer submission
document.getElementById('submit-answer').addEventListener('click', function() {
  const answer = document.getElementById('answer-box').value;
  if (answer.trim() === "") {
      alert("Please write your answer before submitting.");
  } else {
      alert("Answer submitted: " + answer);
      // You can add further logic here, such as saving the answer or evaluating it.
  }
});

// Initialize first question
updateQuestion();