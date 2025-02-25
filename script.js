document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add active class to nav links on scroll - IMPROVED VERSION
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 150; // Added offset for better detection
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      // Improved section detection logic
      if (scrollPosition >= sectionTop && scrollPosition <= (sectionTop + sectionHeight)) {
        current = section.getAttribute('id');
      }
    });
    
    // Apply active class only to the current section's link
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
  
  // Add sticky navigation functionality
  const navbar = document.querySelector('nav') || document.querySelector('.navbar') || document.querySelector('header');
  let navbarHeight = navbar ? navbar.offsetHeight : 0;
  let navbarOffset = navbar ? navbar.offsetTop : 0;
  
  function makeNavbarSticky() {
    if (!navbar) return;
    
    if (window.pageYOffset > navbarOffset) {
      navbar.classList.add('sticky');
      navbar.style.position = 'fixed';
      navbar.style.top = '0';
      navbar.style.left = '0';
      navbar.style.width = '100%';
      navbar.style.zIndex = '1000';
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      navbar.style.transition = 'all 0.3s ease';
      document.body.style.paddingTop = navbarHeight + 'px';
    } else {
      navbar.classList.remove('sticky');
      navbar.style.position = '';
      navbar.style.top = '';
      navbar.style.left = '';
      navbar.style.width = '';
      navbar.style.zIndex = '';
      navbar.style.boxShadow = '';
      document.body.style.paddingTop = '0';
    }
  }
  
  // Listen for scroll events
  window.addEventListener('scroll', makeNavbarSticky);
  // Initialize on page load
  makeNavbarSticky();
  
  // Improve section spacing SIGNIFICANTLY
  function adjustSectionSpacing() {
    // Get all sections and add generous spacing
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      // Add significantly more space between sections
      section.style.marginBottom = '5rem';  // Increased from 2rem
      section.style.paddingTop = '4rem';    // Increased from 2rem
      section.style.paddingBottom = '4rem'; // Increased from 2rem
    });
    
    // Additional spacing for specific elements
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.style.marginBottom = '5rem';
    }
    
    // Add spacing between header and first section
    const header = document.querySelector('header.hero');
    if (header) {
      header.style.marginBottom = '5rem';
      header.style.paddingTop = '3rem';
      header.style.paddingBottom = '3rem';
    }
    
    // More breathing room in the grid layout
    const gridLayout = document.querySelector('.grid-layout');
    if (gridLayout) {
      gridLayout.style.gap = '3rem'; // Increased gap between main content and sidebar
    }
    
    // More space in research and project cards
    const cards = document.querySelectorAll('.research-card, .project-card');
    cards.forEach(card => {
      card.style.padding = '2rem';
      card.style.marginBottom = '1.5rem';
    });
    
    // Better spacing for contact section
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
      contactSection.style.marginTop = '5rem';
      contactSection.style.marginBottom = '5rem';
      
      const contactGrid = document.querySelector('.contact-grid');
      if (contactGrid) {
        contactGrid.style.gap = '3rem';
      }
    }
    
    // More space around page content
    const pageContent = document.querySelector('.page-content');
    if (pageContent) {
      pageContent.style.padding = '2rem 0 5rem 0';
    }
  }
  
  // Apply spacing adjustments
  adjustSectionSpacing();
  
  // Form submission handling
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    // Modern styling for form inputs
    const formInputs = contactForm.querySelectorAll('input[type="text"], input[type="email"], textarea');
    formInputs.forEach(input => {
      // Add modern styles
      input.style.padding = '12px 15px';
      input.style.border = '1px solid #ddd';
      input.style.borderRadius = '8px';
      input.style.width = '100%';
      input.style.fontSize = '16px';
      input.style.fontFamily = 'inherit';
      input.style.transition = 'all 0.3s ease';
      input.style.marginBottom = '15px';
      input.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
      
      // Focus effects
      input.addEventListener('focus', () => {
        input.style.borderColor = '#4d90fe';
        input.style.boxShadow = '0 0 0 3px rgba(77, 144, 254, 0.2)';
        input.style.outline = 'none';
      });
      
      input.addEventListener('blur', () => {
        input.style.borderColor = '#ddd';
        input.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
      });
    });
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Here you would typically handle the form submission with AJAX
      // For now, just show a success message
      const formElements = contactForm.elements;
      for (let i = 0; i < formElements.length; i++) {
        formElements[i].disabled = true;
      }
      
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
      contactForm.appendChild(successMessage);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        contactForm.reset();
        for (let i = 0; i < formElements.length; i++) {
          formElements[i].disabled = false;
        }
        successMessage.remove();
      }, 3000);
    });
  }
  
  // Blob animation
  const blobs = document.querySelectorAll('.blob');
  let isScrolling = false;
  let scrollTimeout;
  let animationFrameId;
  
  // Initial positions
  const initialPositions = Array.from(blobs).map(blob => {
    const rect = blob.getBoundingClientRect();
    return {
      top: parseInt(window.getComputedStyle(blob).top),
      left: parseInt(window.getComputedStyle(blob).left)
    };
  });
  
  // Function to animate blobs
  function animateBlobs() {
    blobs.forEach((blob, index) => {
      if (!isScrolling) {
        const randomX = Math.sin(Date.now() / 2000 + index) * 15;
        const randomY = Math.cos(Date.now() / 2000 + index) * 15;
        
        blob.style.transform = `translate(${randomX}px, ${randomY}px)`;
      }
    });
    
    animationFrameId = requestAnimationFrame(animateBlobs);
  }
  
  // Start animation
  animateBlobs();
  
  // Handle scroll events
  window.addEventListener('scroll', function() {
    isScrolling = true;
    
    // Update blob positions based on scroll
    const scrollY = window.scrollY;
    
    blobs.forEach((blob, index) => {
      const speed = 0.05 + (index * 0.02); // Different parallax speeds
      const initialPos = initialPositions[index];
      
      const yOffset = scrollY * speed;
      
      // Apply parallax effect
      blob.style.transform = `translate(0, ${yOffset}px)`;
    });
    
    // Clear previous timeout
    clearTimeout(scrollTimeout);
    
    // Set new timeout
    scrollTimeout = setTimeout(function() {
      isScrolling = false;
    }, 100);
  });
}); 