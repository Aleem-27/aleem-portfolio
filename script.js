(function() {
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#" || targetId === "") return;
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          e.preventDefault();
          targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    const contactSection = document.getElementById('contact');
    const heroContactBtn = document.getElementById('heroContactBtn');
    const contactNavBtn = document.getElementById('contactNavBtn');
    const closeContactBtn = document.getElementById('closeContactBtn');
    
    function showContact() {
      if (contactSection) {
        contactSection.style.display = 'block';
        setTimeout(() => {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 80);
      }
    }
    function hideContact() {
      if (contactSection) contactSection.style.display = 'none';
    }
    
    if (heroContactBtn) {
      heroContactBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showContact();
      });
    }
    if (contactNavBtn) {
      contactNavBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showContact();
      });
    }
    if (closeContactBtn) {
      closeContactBtn.addEventListener('click', function() {
        hideContact();
      });
    }
    if (contactSection) contactSection.style.display = 'none';
    
    const heroH1 = document.querySelector('.hero-left h1');
    if (heroH1 && !heroH1.hasAttribute('data-animated')) {
      heroH1.style.animation = 'fadeUp 0.7s ease-out';
    }

    const projectCards = document.querySelectorAll('.project-card, .info-card, .skill-tag');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0px)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    
    projectCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.4s ease';
      observer.observe(card);
    });
    
    const skillSpans = document.querySelectorAll('.skill-tag');
    skillSpans.forEach(tag => {
      tag.style.opacity = '0';
      tag.style.transform = 'translateY(12px)';
      tag.style.transition = 'opacity 0.4s ease, transform 0.3s ease';
      observer.observe(tag);
    });
    
    const btns = document.querySelectorAll('.btn');
    btns.forEach(btn => {
      btn.addEventListener('mouseenter', (e) => {
        btn.style.transform = 'translateY(-2px)';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0px)';
      });
    });
 
    const contactDiv = document.querySelector('.contact-info');
    if(contactDiv) {
      contactDiv.addEventListener('dblclick', (e) => {
        const emailSpan = document.querySelector('.contact-info p i.fa-envelope')?.parentElement;
        if(emailSpan) {
          const emailText = emailSpan.innerText.replace('✉️ ', '').replace(' ', '').trim();
          if(emailText.includes('@')) {
            navigator.clipboard.writeText(emailText).then(() => {
              const toastMsg = document.createElement('div');
              toastMsg.innerText = '📧 Email copied!';
              toastMsg.style.position = 'fixed';
              toastMsg.style.bottom = '20px';
              toastMsg.style.left = '50%';
              toastMsg.style.transform = 'translateX(-50%)';
              toastMsg.style.backgroundColor = '#1f2a48';
              toastMsg.style.color = 'white';
              toastMsg.style.padding = '10px 20px';
              toastMsg.style.borderRadius = '30px';
              toastMsg.style.zIndex = '999';
              toastMsg.style.fontSize = '0.9rem';
              document.body.appendChild(toastMsg);
              setTimeout(()=> toastMsg.remove(), 2000);
            });
          }
        }
      });
    }
  })();