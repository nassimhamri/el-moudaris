console.log("=== SCRIPT DÉMARRÉ ===");

// Fonction utilitaire pour sélectionner des éléments en sécurité
function safeQuerySelector(selector) {
  try {
    return document.querySelector(selector);
  } catch (e) {
    console.error(`Erreur lors de la sélection de ${selector}:`, e);
    return null;
  }
}

function safeQuerySelectorAll(selector) {
  try {
    return document.querySelectorAll(selector);
  } catch (e) {
    console.error(`Erreur lors de la sélection de ${selector}:`, e);
    return [];
  }
}

(function loadNavigation() {
  console.log("1. Tentative de chargement de la navigation...");

  const placeholder = document.querySelector('#nav-placeholder');
  if (!placeholder) {
    console.log("❌ Nav placeholder non trouvé");
    return;
  }

  // Charger la navigation avec un chemin absolu GitHub Pages
const navPath = "https://nassimhamri.github.io/el-moudaris/nav.html";

fetch(navPath)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.text();
  })
  .then(html => {
    placeholder.innerHTML = html;
    console.log("✅ Navigation chargée");

    setTimeout(initHamburgerMenu, 100);
  })
  .catch(err => {
    console.error('❌ Erreur chargement nav:', err);
    placeholder.innerHTML = `
      <nav style="background: #f8f9fa; padding: 10px; text-align: center;">
        <strong>Navigation temporairement indisponible</strong>
      </nav>`;
  });

})();


// ============================================
// MENU HAMBURGER - VERSION SÉCURISÉE
// ============================================
function initHamburgerMenu() {
  console.log("2. Initialisation du menu hamburger...");
  
  const btn = safeQuerySelector('#hamburger-btn');
  const mobileMenu = safeQuerySelector('#mobile-menu');

  if (!btn) {
    console.log("❌ Bouton hamburger non trouvé");
    return;
  }
  
  if (!mobileMenu) {
    console.log("❌ Menu mobile non trouvé");
    return;
  }

  // Supprimer les anciens listeners pour éviter les doublons
  btn.removeEventListener('click', toggleMenu);
  btn.addEventListener('click', toggleMenu);
  
  console.log("✅ Menu hamburger initialisé");

  function toggleMenu() {
    mobileMenu.classList.toggle('active');
    btn.classList.toggle('open');
  }

  // Gérer le redimensionnement
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      mobileMenu.classList.remove('active');
      btn.classList.remove('open');
    }
  });
}

// ============================================
// ANIMATIONS FADE-IN-UP
// ============================================
function initAnimations() {
  console.log("3. Initialisation des animations...");
  
  const fadeElements = safeQuerySelectorAll('.fade-in-up');
  console.log(`   Éléments fade-in-up trouvés: ${fadeElements.length}`);
  
  if (fadeElements.length === 0) {
    console.log("❌ Aucun élément à animer");
    return;
  }

  // Intersection Observer pour les animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        console.log(`✅ Animation déclenchée pour:`, entry.target.className);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => observer.observe(el));
  console.log("✅ Observer des animations activé");
}

/* ============================== 
   JAVASCRIPT POUR LA SECTION "NOS ATOUTS"
   ============================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================== 
    // ANIMATION D'APPARITION PROGRESSIVE DES CARTES
    // ============================== 
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observation des cartes pour l'animation d'apparition
    document.querySelectorAll('.advantage-card').forEach(card => {
        observer.observe(card);
    });

    // ============================== 
    // EFFET DE PARALLAXE SUR LES PARTICULES
    // ============================== 
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            const speed = 0.5 + index * 0.1;
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ============================== 
    // ANIMATION DES ICÔNES AU SURVOL
    // ============================== 
    
    document.querySelectorAll('.advantage-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.advantage-icon');
            icon.style.animation = 'bounce 0.6s ease-in-out';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.advantage-icon');
            icon.style.animation = '';
        });
    });

    // ============================== 
    // EFFET DE PULSATION SUR LE BOUTON CTA
    // ============================== 
    
    const ctaButton = document.querySelector('.btn-cta');
    if (ctaButton) {
        // Pulsation périodique pour attirer l'attention
        setInterval(() => {
            ctaButton.style.transform = 'scale(1.05)';
            setTimeout(() => {
                ctaButton.style.transform = 'scale(1)';
            }, 200);
        }, 10000); // Toutes les 10 secondes
    }

    // ============================== 
    // AMÉLIORATION DES PERFORMANCES
    // ============================== 
    
    // Throttle pour l'événement scroll
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            const speed = 0.3 + index * 0.05;
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);

    // ============================== 
    // GESTION DU FOCUS POUR L'ACCESSIBILITÉ
    // ============================== 
    
    document.querySelectorAll('.advantage-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('focus', () => {
            card.style.transform = 'translateY(-5px) scale(1.01)';
            card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.12)';
        });
        
        card.addEventListener('blur', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });

    // ============================== 
    // DÉTECTION MOBILE POUR OPTIMISER LES ANIMATIONS
    // ============================== 
    
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Désactiver certaines animations sur mobile pour de meilleures performances
        document.querySelectorAll('.particle').forEach(particle => {
            particle.style.display = 'none';
        });
        
        // Simplifier les animations de survol sur mobile
        document.querySelectorAll('.advantage-card').forEach(card => {
            card.addEventListener('touchstart', () => {
                card.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', () => {
                card.style.transform = '';
            });
        });
    }

    // ============================== 
    // STATISTIQUES DE PERFORMANCE (OPTIONNEL)
    // ============================== 
    
    // Mesurer le temps de chargement des animations
    const startTime = performance.now();
    
    window.addEventListener('load', () => {
        const loadTime = performance.now() - startTime;
        console.log(`Section "Nos atouts" chargée en ${loadTime.toFixed(2)}ms`);
    });

    // ============================== 
    // PRÉCHARGEMENT DES RESSOURCES
    // ============================== 
    
    // Précharger les polices si nécessaire
    if ('fonts' in document) {
        document.fonts.load('600 1.4rem Poppins').then(() => {
            console.log('Police Poppins 600 chargée');
        });
    }
});

// ============================== 
// FONCTIONS UTILITAIRES
// ============================== 

// Fonction pour animer un élément avec une transition fluide
function animateElement(element, properties, duration = 300) {
    element.style.transition = `all ${duration}ms ease`;
    Object.keys(properties).forEach(prop => {
        element.style[prop] = properties[prop];
    });
}

// Fonction pour créer un effet de ripple au clic
function createRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Ajouter l'effet ripple au bouton CTA
document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.querySelector('.btn-cta');
    if (ctaButton) {
        ctaButton.style.position = 'relative';
        ctaButton.style.overflow = 'hidden';
        ctaButton.addEventListener('click', createRippleEffect);
    }
});

// Style CSS pour l'animation ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);


// ============================================
// SWIPER TÉMOIGNAGES
// ============================================
function initSwiper() {
  console.log("4. Initialisation de Swiper...");
  
  const swiperContainer = safeQuerySelector('.testimonial-swiper');
  if (!swiperContainer) {
    console.log("❌ Container Swiper non trouvé");
    return;
  }

  // Vérifier si Swiper est disponible
  if (typeof Swiper === 'undefined') {
    console.log("❌ Swiper library non chargée");
    // Fallback: affichage simple en grille
    swiperContainer.style.display = 'grid';
    swiperContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    swiperContainer.style.gap = '20px';
    return;
  }

  try {
    const swiper = new Swiper('.testimonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
    
    console.log("✅ Swiper initialisé avec succès");
  } catch (error) {
    console.error("❌ Erreur initialisation Swiper:", error);
  }
}

// ============================================
// COMPTEURS STATISTIQUES
// ============================================
function initCounters() {
  console.log("5. Initialisation des compteurs...");
  
  const counters = safeQuerySelectorAll('.stat-number');
  console.log(`   Compteurs trouvés: ${counters.length}`);
  
  if (counters.length === 0) return;

  const formatValue = (value, counter) => {
    if (counter.dataset.format === 'thousand') {
      return Number(value).toLocaleString('fr-FR');
    }
    return value;
  };

  const animateCount = counter => {
    const target = +counter.dataset.target;
    const suffix = counter.dataset.suffix || '';
    let current = 0;
    const step = Math.max(1, Math.floor(target / 100));

    const update = () => {
      current += step;
      if (current >= target) current = target;
      counter.textContent = formatValue(current, counter) + suffix;
      if (current < target) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(animateCount);
        observer.disconnect();
        console.log("✅ Animation des compteurs déclenchée");
      }
    });
  }, { threshold: 0.4 });

  const statsSection = safeQuerySelector('#stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

// ============================================
// FAQ ACCORDION
// ============================================
function initFAQ() {
  console.log("6. Initialisation FAQ...");
  
  const accItems = safeQuerySelectorAll('.accordion-item');
  console.log(`   Éléments FAQ trouvés: ${accItems.length}`);
  
  accItems.forEach((item, index) => {
    const button = item.querySelector('.accordion-button');
    if (button) {
      button.addEventListener('click', () => {
        item.classList.toggle('active');
        accItems.forEach(el => {
          if (el !== item) el.classList.remove('active');
        });
      });
    }
  });
  
  if (accItems.length > 0) {
    console.log("✅ FAQ initialisée");
  }
}

// ============================================
// ONGLETS TARIFAIRES
// ============================================
function initTabs() {
  console.log("7. Initialisation des onglets...");
  
  const buttons = safeQuerySelectorAll('.tab-btn');
  const panes = safeQuerySelectorAll('.tab-pane');
  
  console.log(`   Boutons: ${buttons.length}, Panneaux: ${panes.length}`);

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-tab');
      panes.forEach(pane => {
        pane.classList.toggle('active', pane.id === target);
      });
    });
  });
  
  if (buttons.length > 0) {
    console.log("✅ Onglets initialisés");
  }
}

// ============================================
// FOOTER PROJECTION
// ============================================
function initFooter() {
  console.log("8. Chargement du footer...");
  
  const container = safeQuerySelector('#footer-placeholder');
  if (!container) {
    console.log("❌ Footer placeholder non trouvé");
    return;
  }

  fetch('https://nassimhamri.github.io/el-moudaris/pages/footer.html')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      container.innerHTML = html;
      console.log("✅ Footer chargé");
    })
    .catch(err => {
      console.error('❌ Erreur chargement footer:', err);
      container.innerHTML = `
        <footer style="background: #333; color: white; padding: 20px; text-align: center;">
          <p>Footer temporairement indisponible</p>
        </footer>`;
    });
}

// ============================================
// INITIALISATION GLOBALE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  console.log("=== DOM CHARGÉ - INITIALISATION ===");
  
  // Initialiser tout avec des délais pour éviter les conflits
  setTimeout(initAnimations, 100);
  setTimeout(initCounters, 200);
  setTimeout(initSwiper, 300);
  setTimeout(initFAQ, 400);
  setTimeout(initTabs, 500);
  setTimeout(initFooter, 600);
  
  console.log("=== INITIALISATION TERMINÉE ===");
});

// Fallback au cas où DOMContentLoaded a déjà été déclenché
if (document.readyState === 'loading') {
  // DOM pas encore chargé, l'event listener ci-dessus fonctionnera
} else {
  // DOM déjà chargé, exécuter immédiatement
  console.log("DOM déjà chargé, exécution immédiate");
  setTimeout(() => {
    initAnimations();
    initCounters();
    initSwiper();
    initFAQ();
    initTabs();
    initFooter();
  }, 100);
}
