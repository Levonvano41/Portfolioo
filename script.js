//sidebar animation
document.querySelectorAll("#Close-menu").forEach(function(element) {
    element.addEventListener("click", () =>{
        document.querySelector(".container").classList.toggle("show-menu")
    })
})

//debounce function
function debounce(func, wait, immediate) {
    let timeout
    return function(...args) {
        const context = this
        const later = function() {
            timeout = null
            if (!immediate) func.apply(context, args)
        }
        const callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}

// scroll animation
const target = document.querySelectorAll("[data-anime]")
const animationClass = "animate"

function animeScroll() {
    const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4)
    target.forEach(function(element) {
        if((windowTop) > element.offsetTop){
            element.classList.add(animationClass)
        } else {
            element.classList.remove(animationClass)
        }
    })
}

if(target.length) {
    window.addEventListener('scroll', debounce(function() {
        animeScroll()
    }, 10))
}

// Initialize EmailJS
emailjs.init("lKWAwaGVC83OQw8bp");

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Get form data
    const formData = {
        to_email: 'levonvano41@gmail.com',
        from_name: document.getElementById('user_name').value,
        from_email: document.getElementById('user_email').value,
        message: document.getElementById('Message').value
    };

    // Send email
    emailjs.send('service_3x6h3mw', 'template_nkogldc', formData)
        .then(function() {
            // Show success message with animation
            submitButton.textContent = 'Sent Successfully!';
            submitButton.style.backgroundColor = '#4CAF50';
            
            // Clear form
            document.getElementById('contact-form').reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
            }, 3000);
        })
        .catch(function(error) {
            // Show error message
            submitButton.textContent = 'Failed to Send';
            submitButton.style.backgroundColor = '#f44336';
            console.error('Failed to send email:', error);
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
            }, 3000);
        });
});

// Add hover animations to project cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'pulse 0.5s ease-in-out';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.animation = '';
    });
});

// Animate skills icons on hover
document.querySelectorAll('.conhecimento-header i').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.2) rotate(360deg)';
        icon.style.transition = 'transform 0.5s ease-in-out';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Popup functionality for projects
    function createPopup(projectData) {
        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        
        const popup = document.createElement('div');
        popup.className = 'popup';
        
        // Get the full description for the project
        const fullDescription = getProjectDescription(projectData.title);
        
        popup.innerHTML = `
            <div class="popup-header">
                <h2 class="popup-title">${projectData.title}</h2>
                <button class="popup-close">&times;</button>
            </div>
            <div class="popup-content">
                <img src="${projectData.image}" alt="${projectData.title}">
                <h3>${projectData.subtitle}</h3>
                <p>${fullDescription}</p>
            </div>
            <div class="popup-footer">
                <a href="${projectData.link}" target="_blank" class="popup-button primary">Visit Project</a>
            </div>
        `;
        
        overlay.appendChild(popup);
        document.body.appendChild(overlay);
        
        // Add event listeners
        const closeBtn = popup.querySelector('.popup-close');
        closeBtn.addEventListener('click', () => closePopup(overlay));
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closePopup(overlay);
            }
        });
        
        // Show popup with animation
        requestAnimationFrame(() => {
            overlay.classList.add('show');
            popup.classList.add('active');
        });
    }

    function getProjectDescription(title) {
        const descriptions = {
            'Zufta Tours & Travels': 'Zufta Travel and Tours is the Largest and most reliable tourism company in Pakistan with lots of satisfied clients and we have arranged almost over 500 tours successfully. We offer tour to Hunza Valley, Naltar Valley Swat, Naran Kaghan, Khunjrab Pass, Fairy Meadows, and many more incredible places around Pakistan. We arrange Family tours, Co-oporate tours, Group tours and Honeymoon tours for our valuable clients. With large numbers of fans, we became the largest tourism company in Pakistan. We also arrange tours for foreigners who came to Pakistan and Explore nature\'s beauty at it\'s best. So, pack your bags and visit your dream places in Pakistan.',
            'Splendor Homes': 'Splendor Homes LLC is a React-based real estate platform designed to provide a seamless experience for property exploration, listings management, and facilitating real estate transactions with ease.',
            'Space Travelers Hub': 'Space Travelers Hub displays a list of Rockets and Space Missions and allows you to book rockets and join selected space missions. This is a React and Redux website that displays a list of Rockets and Space Missions and allows you to book rockets and join selected space missions.',
            'Health fast': 'HealthFast is a comprehensive health management platform designed to streamline diagnostic testing, personalized health monitoring, and seamless coordination for individuals and their families. With a focus on convenience and accuracy, HealthFast offers rapid access to test results, in-home specimen collection, real-time tracking, expert consultations, and family health monitoring. The platform integrates directly with laboratory systems to ensure transparency and reliability throughout the diagnostic process. Empower yourself and your loved ones with HealthFast\'s efficient and reliable health management solutions.'
        };
        return descriptions[title] || projectData.description;
    }

    function createEducationPopup(educationData) {
        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        
        const popup = document.createElement('div');
        popup.className = 'popup education-popup';
        
        popup.innerHTML = `
            <div class="popup-header">
                <h2 class="popup-title">${educationData.title}</h2>
                <button class="popup-close">&times;</button>
            </div>
            <div class="popup-content">
                <img src="${educationData.image}" alt="${educationData.title}" class="education-popup-img">
                <div class="education-details">
                    <h3>${educationData.institution}</h3>
                    <p class="education-date">${educationData.date}</p>
                    <div class="education-description">
                        <p>${educationData.description}</p>
                    </div>
                </div>
            </div>
            <div class="popup-footer">
                <a href="${educationData.link}" target="_blank" class="popup-button primary">View Course</a>
            </div>
        `;
        
        overlay.appendChild(popup);
        document.body.appendChild(overlay);
        
        // Add event listeners
        const closeBtn = popup.querySelector('.popup-close');
        closeBtn.addEventListener('click', () => closePopup(overlay));
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closePopup(overlay);
            }
        });
        
        // Show popup with animation
        requestAnimationFrame(() => {
            overlay.classList.add('show');
            popup.classList.add('active');
        });
    }

    function closePopup(element) {
        const overlay = element.closest('.popup-overlay');
        const popup = overlay.querySelector('.popup');
        
        popup.classList.remove('active');
        popup.addEventListener('transitionend', () => {
            overlay.classList.remove('show');
            overlay.remove();
        }, { once: true });
    }

    // Initialize popup triggers for projects
    document.querySelectorAll('.card .ButtonSend').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = button.closest('.card');
            const projectData = {
                title: card.querySelector('h2').textContent,
                subtitle: card.querySelector('h3').textContent,
                description: card.querySelector('p').textContent,
                image: card.querySelector('.card-img-wrapper img').src,
                link: card.querySelector('.ButtonSend a').href
            };
            createPopup(projectData);
        });
    });

    // Initialize popup triggers for education cards
    document.querySelectorAll('.certificate-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const educationData = {
                title: card.querySelector('h3').textContent,
                institution: card.querySelector('p').textContent,
                date: card.querySelector('.date').textContent,
                image: card.querySelector('img').src,
                link: card.querySelector('a').href,
                description: getEducationDescription(card.querySelector('h3').textContent)
            };
            createEducationPopup(educationData);
        });
    });

    // Helper function to get detailed descriptions for education cards
    function getEducationDescription(title) {
        const descriptions = {
            'HTML & CSS Mastery': 'Comprehensive course covering modern HTML5 and CSS3 techniques, including responsive design, flexbox, grid layouts, and CSS animations. Learn to build beautiful, responsive websites from scratch.',
            'React Development': 'Advanced React.js course covering components, hooks, state management, routing, and best practices. Build modern, scalable web applications using the latest React features.',
            'JavaScript Advanced': 'In-depth JavaScript course covering ES6+, async programming, DOM manipulation, and modern JavaScript development practices. Master the core concepts of JavaScript programming.'
        };
        return descriptions[title] || 'Detailed course information available on the course page.';
    }
});