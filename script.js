document.addEventListener('DOMContentLoaded', () => {
  // ---------------- NAVBAR TOGGLE ----------------
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('#nav-links a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('show'));
  });

  // ---------------- HERO TYPING EFFECT ----------------
  const topSpan = document.querySelector('#hero-title .top-text');
  const bottomSpan = document.querySelector('#hero-title .highlight');
  const cursorSpan = document.querySelector('#hero-title .cursor');
  const subtitle = document.querySelector('.hero-sub');

  if (topSpan && bottomSpan && cursorSpan) {
    topSpan.textContent = '';
    bottomSpan.textContent = '';
    cursorSpan.style.opacity = '1';

    const part1 = 'Welcome to';
    const part2 = 'CyberSecure';
    const speed1 = 60;
    const speed2 = 80;

    function typeText(targetSpan, text, speed) {
      return new Promise(resolve => {
        let k = 0;
        function next() {
          if (k <= text.length) {
            targetSpan.textContent = text.slice(0, k);
            // Move cursor after current text
            cursorSpan.style.display = 'inline-block';
            targetSpan.after(cursorSpan);
            k++;
            setTimeout(next, speed);
          } else {
            resolve();
          }
        }
        next();
      });
    }

    (async function runTyping() {
      await typeText(topSpan, part1, speed1);
      await new Promise(r => setTimeout(r, 180));
      await typeText(bottomSpan, part2, speed2);
      document.getElementById('hero-title').classList.add('done');
      cursorSpan.style.opacity = '0'; // Hide cursor after typing
      subtitle?.classList.add('show');
    })();
  }

  // ---------------- NAV SCROLL EFFECT ----------------
  if (
    window.location.pathname.endsWith('index.html') ||
    window.location.pathname === '/' ||
    !window.location.pathname.includes('.html')
  ) {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    window.addEventListener('scroll', () => {
      const nav = document.querySelector('nav');
      if (window.scrollY > 100) {
        nav.style.backgroundColor = 'rgba(10, 31, 68, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
      } else {
        nav.style.backgroundColor = '#030509';
        nav.style.backdropFilter = 'none';
      }
    });

    addInteractiveEffects();
  }

  // ---------------- QUIZ PAGE ----------------
  if (window.location.pathname.endsWith('quiz.html')) {
    initializeQuizLevels();
  }
});

const quizData = {
  'Level 1 – Rookie Defender (5 Questions) ': [
    {
      question: 'You get an email from your bank saying "Your account will be blocked, click this link now!". What should you do?',
      options: ['Click the link and log in quickly', 'Call the bank using their official number', 'Reply with your account details', 'Forward it to friends to warn them'],
      correct: 1,
      explanation: 'Never click links in urgent emails. Instead, call your bank using a number you trust to verify—this helps avoid phishing scams that impersonate your bank.'
    },
    {
      question: 'Your friend asks for your Netflix password. What\'s the safest response?',
      options: ['Share it, no problem', 'Say no and explain account sharing is unsafe', 'Share it but change it later', 'Post it in WhatsApp group'],
      correct: 1,
      explanation: 'Declining to share your password helps protect your account\'s security, maintains accountability, and aligns with Netflix\'s terms of use, which restrict sharing to household members only.'
    },
    {
      question: 'You see a pop-up offering a "free iPhone if you click here." What do you do?',
      options: ['Click immediately', 'Close the pop-up', 'Fill out details just in case it\'s real', 'Share it on social media'],
      correct: 1,
      explanation: 'Pop-ups offering freebies are scams—never click, just close the tab or browser to avoid malware or phishing attempts.'
    },
    {
      question: 'Your computer asks for a software update. What should you do?',
      options: ['Download from official system update', 'Ignore it', 'Search "free update" on Google and download', 'Ask a stranger online for the link'],
      correct: 0,
      explanation: 'Always use official system or app update channels—this ensures you are installing legitimate, safe updates that fix vulnerabilities.'
    },
    {
      question: 'You create a password "123456" for your email. What\'s wrong?',
      options: ['Nothing, it\'s easy to remember', 'It\'s too long', 'Hackers can\'t guess numbers', 'It\'s too weak and easy to hack'],
      correct: 3,
      explanation: '"123456" is one of the most common and weakest passwords—hackers can crack it in under a second.'
    }
  ],
  'Level 2 – Smart Protector (10 Questions)': [
    {
      question: 'What is two-factor authentication (2FA)?',
      options: ['Using two different passwords', 'An extra security step beyond passwords', 'Having two email accounts', 'Logging in twice'],
      correct: 1,
      explanation: '2FA adds an extra layer of security by requiring a second form of verification beyond your password.'
    },
    {
      question: 'Which of these is a safe browsing practice?',
      options: ['Clicking on pop-up ads', 'Using public Wi-Fi for banking', 'Keeping browser updated', 'Sharing passwords with friends'],
      correct: 2,
      explanation: 'Keeping your browser updated ensures you have the latest security patches against vulnerabilities.'
    },
    {
      question: 'What is a VPN used for?',
      options: ['To make internet faster', 'To get more social media followers', 'To watch movies for free', 'To secure internet connection and hide location'],
      correct: 3,
      explanation: 'A VPN encrypts your internet connection and hides your IP address for enhanced privacy.'
    },
    {
      question: 'How can you identify a secure website?',
      options: ['It has many images', 'It has a padlock icon in the address bar', 'It has pop-up ads', 'It asks for personal information'],
      correct: 1,
      explanation: 'The padlock icon indicates a secure HTTPS connection between your browser and the website.'
    },
    {
      question: 'Which of these is a red flag in a phishing email?',
      options: ['Urgent action required', 'Professional logo', 'Correct spelling', 'Your real name'],
      correct: 0,
      explanation: 'Phishing emails often create false urgency to pressure victims into acting quickly without thinking.'
    },
    {
      question: 'What should you do if you receive a suspicious email?',
      options: ['Click the link to verify', 'Reply asking for more info', 'Delete it immediately', 'Forward to friends'],
      correct: 2,
      explanation: 'Never interact with suspicious emails. Delete them immediately and report if necessary.'
    },
    {
      question: 'How can you verify if a website is secure?',
      options: ['It looks professional', 'It has HTTPS and a padlock icon', 'It has many ads', 'It loads quickly'],
      correct: 1,
      explanation: 'HTTPS (the \'s\' stands for secure) and the padlock icon indicate an encrypted, secure connection.'
    },
    {
      question: 'What is social engineering?',
      options: ['Building social media apps', 'Engineering social networks', 'Manipulating people to reveal confidential information', 'Creating online communities'],
      correct: 2,
      explanation: 'Social engineering involves manipulating people into revealing confidential information or performing actions.'
    },
    {
      question: 'What should you do if your account gets hacked?',
      options: ['Ignore it', 'Tell your friends', 'Create new accounts', 'Change all passwords immediately'],
      correct: 3,
      explanation: 'Immediately change all passwords and enable two-factor authentication if your account is compromised.'
    },
    {
      question: 'What is malware?',
      options: ['A type of computer hardware', 'Malicious software designed to harm computers', 'A programming language', 'A type of internet connection'],
      correct: 1,
      explanation: 'Malware is malicious software designed to damage, disrupt, or gain unauthorized access to computer systems.'
    }
  ],
  'Level 3 – Cyber Warrior (15 Questions) ': [
    {
      question: 'Why should you avoid using public Wi-Fi for sensitive transactions?',
      options: ['It\'s too slow', 'It might be monitored by hackers', 'It costs money', 'It doesn\'t work well'],
      correct: 1,
      explanation: 'Public Wi-Fi networks are often unsecured and can be monitored by hackers to steal your information.'
    },
    {
      question: 'You created one password for Facebook, Gmail, and Instagram. What\'s the risk?',
      options: ['No risk, easy to remember', 'If one gets hacked, all accounts are exposed', 'Easy to hack', 'Hackers won\'t care'],
      correct: 1,
      explanation: 'Reusing the same password across different accounts means if one is compromised, attackers can access them all.'
    },
    {
      question: 'What does "https://" at the beginning of a URL indicate?',
      options: ['The connection is secure', 'The website is hypertext', 'The website is popular', 'The website has videos'],
      correct: 0,
      explanation: 'HTTPS indicates a secure, encrypted connection between your browser and the website.'
    },
    {
      question: 'How often should you back up important data?',
      options: ['Never', 'Once a year', 'Regularly (weekly or monthly)', 'Only when you remember'],
      correct: 2,
      explanation: 'Regular backups protect your data from loss due to hardware failure, ransomware, or other issues.'
    },
    {
      question: 'What is two-factor authentication (2FA)?',
      options: ['Using two passwords', 'An extra security step beyond passwords', 'Having two email accounts', 'Logging in twice'],
      correct: 1,
      explanation: '2FA adds an extra layer of security by requiring a second form of verification beyond your password.'
    },
    {
      question: 'Which social media privacy setting is safest?',
      options: ['Public for all posts', 'No privacy settings needed', 'Public profile, private posts', 'Private/Friends only'],
      correct: 3,
      explanation: 'Private/Friends only settings give you maximum control over who sees your personal information.'
    },
    {
      question: 'What is the primary purpose of a firewall?',
      options: ['To prevent unauthorized access to a network', 'To speedup internet connection', 'To store user data', 'To create strong passwords'],
      correct: 0,
      explanation: 'A firewall acts as a barrier between a trusted internal network and untrusted external networks, controlling incoming and outgoing network traffic.'
    },
    {
      question: 'What is encryption?',
      options: ['Making text bold', 'Converting information into code to prevent unauthorized access', 'Hiding files', 'Deleting information'],
      correct: 1,
      explanation: 'Encryption converts information into code to prevent unauthorized access, ensuring only authorized parties can read it.'
    },
    {
      question: 'What is a zero-day vulnerability?',
      options: ['A vulnerability known for zero days', 'A type of malware', 'A security flaw unknown to the software vendor', 'A harmless software bug'],
      correct: 2,
      explanation: 'A zero-day vulnerability is a security flaw unknown to the software vendor, making it particularly dangerous.'
    },
    {
      question: 'What is phishing?',
      options: ['A fishing hobby', 'Fraudulent attempt to obtain sensitive information by disguising as trustworthy entity', 'A type of malware', 'A programming technique'],
      correct: 1,
      explanation: 'Phishing involves fraudulent attempts to obtain sensitive information by disguising as a trustworthy entity.'
    },
    {
      question: 'What is ransomware?',
      options: ['Software that demands payment to restore access to your computer', 'A type of antivirus', 'Free software', 'A backup tool'],
      correct: 0,
      explanation: 'Ransomware is malicious software that blocks access to your computer or data until you pay a ransom.'
    },
    {
      question: 'What is a DDoS attack?',
      options: ['A backup method', 'A type of encryption', 'A security protocol', 'Distributed Denial of Service attack that overwhelms a system'],
      correct: 3,
      explanation: 'A DDoS attack overwhelms a system with traffic, making it unavailable to legitimate users.'
    },
    {
      question: 'What is multi-factor authentication?',
      options: ['Using multiple passwords', 'Authentication using two or more verification methods', 'Having multiple accounts', 'A type of firewall'],
      correct: 1,
      explanation: 'Multi-factor authentication requires two or more verification methods for enhanced security.'
    },
    {
      question: 'What is the principle of least privilege?',
      options: ['Giving users minimal access levels needed', 'Making everyone an administrator', 'Sharing all passwords', 'No security restrictions'],
      correct: 0,
      explanation: 'The principle of least privilege means giving users only the access levels they absolutely need to perform their tasks.'
    },
    {
      question: 'What\'s the golden rule of cybersecurity?',
      options: ['Trust every link', 'Think before you click', 'Share everything', 'Hack back'],
      correct: 1,
      explanation: 'Always think before you click—most attacks begin with a malicious link or attachment, so pausing and verifying can protect you.'
    }
  ]
};

let currentQuizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let quizActive = false;
let currentLevelKey = 'Level 1 – Rookie Defender (5 Questions) ';
let unlockedLevels = ['Level 1 – Rookie Defender (5 Questions) '];

// Session storage for quiz progress (no localStorage dependency)
let quizSession = {
  unlockedLevels: ['Level 1 – Rookie Defender (5 Questions) '],
  currentLevel: 'Level 1 – Rookie Defender (5 Questions) '
};

function initializeQuizLevels() {
  currentLevelKey = quizSession.currentLevel;
  unlockedLevels = [...quizSession.unlockedLevels];
  updateLevelButtons();
  startQuiz(currentLevelKey);
}

function updateLevelButtons() {
  const levels = Object.keys(quizData);
  levels.forEach((level, idx) => {
    const btn = document.getElementById(`btn-level-${idx + 1}`);
    if (!btn) return;
    
    btn.disabled = !unlockedLevels.includes(level);
    btn.classList.toggle('active', level === currentLevelKey);
  });
  
  quizSession.unlockedLevels = [...unlockedLevels];
}

function selectLevel(levelKey) {
  if (!unlockedLevels.includes(levelKey)) return;
  quizActive = false;
  currentLevelKey = levelKey;
  quizSession.currentLevel = currentLevelKey;
  updateLevelButtons();
  startQuiz(currentLevelKey);
}

function startQuiz(levelKey) {
  if (quizActive) return;
  currentLevelKey = levelKey;
  const questionsForLevel = quizData[levelKey];
  
  if (!questionsForLevel || questionsForLevel.length === 0) {
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
      quizContainer.innerHTML = `<h3>No questions found for ${levelKey}. Please check quiz data.</h3>`;
    }
    return;
  }
  
  currentQuizQuestions = [...questionsForLevel];
  currentQuestionIndex = 0;
  score = 0;
  quizActive = true;
  
  const quizContainer = document.getElementById('quiz-container');
  if (quizContainer) {
    quizContainer.innerHTML = '';
    showQuestion();
  }
}

function showQuestion() {
  const quizContainer = document.getElementById('quiz-container');
  if (!quizContainer) return;
  
  const question = currentQuizQuestions[currentQuestionIndex];
  quizContainer.innerHTML = `
    <div class="quiz-question">
      <div class="level-indicator">Current Level: ${currentLevelKey}</div>
      <div class="question-counter">Question ${currentQuestionIndex + 1} of ${currentQuizQuestions.length}</div>
      <h3>${question.question}</h3>
      <div class="quiz-options">
        ${question.options.map((option, index) => 
          `<button class="quiz-option" style="color:black;" onclick="selectAnswer(${index})">${option}</button>`
        ).join('')}
      </div>
      <div class="quiz-progress">
        <div class="progress-bar" style="width: ${((currentQuestionIndex + 1) / currentQuizQuestions.length) * 100}%"></div>
      </div>
    </div>
  `;
}

function selectAnswer(selectedIndex) {
  const question = currentQuizQuestions[currentQuestionIndex];
  const options = document.querySelectorAll('.quiz-option');
  
  options.forEach(option => option.disabled = true);
  
  options[selectedIndex].classList.add(selectedIndex === question.correct ? 'correct' : 'incorrect');
  if (selectedIndex !== question.correct) {
    options[question.correct].classList.add('correct');
  }
  
  if (selectedIndex === question.correct) {
    score++;
  }
  
  const quizContainer = document.getElementById('quiz-container');
  if (quizContainer) {
    quizContainer.innerHTML += `
      <div class="quiz-explanation">
        <p><strong>Explanation:</strong> ${question.explanation}</p>
        <button onclick="nextQuestion()" class="next-btn">
          ${currentQuestionIndex < currentQuizQuestions.length - 1 ? 'Next Question' : 'See Results'}
        </button>
      </div>
    `;
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuizQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const quizContainer = document.getElementById('quiz-container');
  if (!quizContainer) return;
  
  const percentage = Math.round((score / currentQuizQuestions.length) * 100);
  const passThreshold = 50;
  const passedLevel = percentage >= passThreshold;
  
  let message = '';
  
  if (passedLevel) {
    message = `Congratulations! You passed ${currentLevelKey} with ${percentage}%. You can now proceed to the next level!`;
  } else {
    message = `You scored ${percentage}%. You need at least 50% to unlock the next level. Please try again.`;
  }
  
  const levelKeys = Object.keys(quizData);
  const currentLevelIndex = levelKeys.indexOf(currentLevelKey);
  const nextLevelKey = levelKeys[currentLevelIndex + 1];

  let actionButton = '';
  if (passedLevel && nextLevelKey) {
    if (!unlockedLevels.includes(nextLevelKey)) {
      unlockedLevels.push(nextLevelKey);
    }
    quizSession.unlockedLevels = [...unlockedLevels];
    actionButton = `<button onclick="advanceToNextLevel('${nextLevelKey}')" class="next-level-btn">Start ${nextLevelKey}</button>`;
  } else if (passedLevel && !nextLevelKey) {
    message = 'Congratulations! You have completed all levels of the Cyber Quiz! You are a true Web Guardian!';
    actionButton = `<button onclick="restartFromBeginning()" class="retake-btn">Restart Quiz from Level 1</button>`;
  } else {
    actionButton = `<button onclick="retakeQuiz()" class="retake-btn">Retake ${currentLevelKey}</button>`;
  }

  updateLevelButtons();

  quizContainer.innerHTML = `
    <div class="quiz-results">
      <h3>${message}</h3>
      <div class="score-display">
        <div class="score-circle">
          <span class="score-number">${percentage}%</span>
          <span class="score-text">${score}/${currentQuizQuestions.length}</span>
        </div>
      </div>
      <p>${passedLevel ? 'Well done!' : 'Keep studying!'}</p>
      <div class="result-actions">
        ${actionButton}
        <button onclick="shareResults(${percentage})" class="share-btn">Share Results</button>
      </div>
      <div class="security-tip">
        <h4>Security Tip:</h4>
        <p>${getRandomSecurityTip()}</p>
      </div>
    </div>
  `;

  quizActive = false;
}

function advanceToNextLevel(nextLevelKey) {
  quizActive = false;
  currentLevelKey = nextLevelKey;
  quizSession.currentLevel = currentLevelKey;
  updateLevelButtons();
  startQuiz(currentLevelKey);
}

function retakeQuiz() {
  quizActive = false;
  startQuiz(currentLevelKey);
}

function restartFromBeginning() {
  quizActive = false;
  currentLevelKey = 'Level 1 – Rookie Defender (5 Questions) ';
  unlockedLevels = ['Level 1 – Rookie Defender (5 Questions) '];
  quizSession = {
    unlockedLevels: ['Level 1 – Rookie Defender (5 Questions) '],
    currentLevel: 'Level 1 – Rookie Defender (5 Questions) '
  };
  updateLevelButtons();
  startQuiz(currentLevelKey);
}

function shareResults(percentage) {
  const text = `I scored ${percentage}% on the CyberSecure Quiz (${currentLevelKey})! Test your knowledge at #CyberSecure #WebGuardian`;

  if (navigator.share) {
    navigator.share({
      title: 'My Cybersecurity Quiz Results',
      text: text,
      url: window.location.href,
    });
  } else {
    navigator.clipboard.writeText(text).then(() => {
      alert('Results copied to clipboard! Share it on social media.');
    }).catch(err => {
      console.error('Could not copy text: ', err);
      alert('Failed to copy results. Please copy manually: ' + text);
    });
  }
}

function getRandomSecurityTip() {
  const tips = [
    'Use a unique password for every account - consider using a password manager.',
    'Enable two-factor authentication wherever possible for extra security.',
    'Keep your software and operating system updated to patch security vulnerabilities.',
    'Be suspicious of unexpected emails, even if they appear to be from trusted sources.',
    'Regularly backup your important data in case of ransomware attacks.',
    'Use secure Wi-Fi networks and avoid public Wi-Fi for sensitive activities.',
    'Monitor your bank and credit card statements regularly for unauthorized transactions.',
    'Think before you post - information shared online can be used against you.',
  ];
  
  return tips[Math.floor(Math.random() * tips.length)];
}

function addInteractiveEffects() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
      this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}