

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

// ============================================
// NAV PROJECTION - VERSION SÉCURISÉE
// ============================================
(function loadNavigation() {
  console.log("1. Tentative de chargement de la navigation...");
  
  const placeholder = safeQuerySelector('#nav-placeholder');
  if (!placeholder) {
    console.log("❌ Nav placeholder non trouvé");
    return;
  }

 fetch('https://nassimhamri.github.io/el-moudaris/pages/nav.html')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      placeholder.innerHTML = html;
      console.log("✅ Navigation chargée");
      
      // Attendre un peu avant d'initialiser le menu
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

  // Gestion hamburger
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

  // 📌 Gestion du sous-menu mobile "Programmes"
  const mobileDropBtn = safeQuerySelector('.mobile-dropbtn');
  const mobileDropdown = safeQuerySelector('.mobile-dropdown');

  if (mobileDropBtn && mobileDropdown) {
    mobileDropBtn.addEventListener('click', (e) => {
      e.preventDefault();
      mobileDropdown.classList.toggle('active'); // Active/désactive le sous-menu
    });
  }

}

// ============================================
// ANIMATIONS FADE-IN-UP
// ============================================
function initAnimations() {
  console.log("3. Initialisation des animations...");
  
  const fadeElements = safeQuerySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
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
    rootMargin: '0px 0px -75px 0px'
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

function initSwiper() {
  console.log("4. Initialisation de Swiper...");

  const swiperContainer = safeQuerySelector('.testimonial-swiper');
  if (!swiperContainer) {
    console.log("❌ Container Swiper non trouvé");
    return;
  }

  if (typeof Swiper === 'undefined') {
    console.log("❌ Swiper library non chargée");
    swiperContainer.style.display = 'grid';
    swiperContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    swiperContainer.style.gap = '20px';
    return;
  }

  try {
    const swiper = new Swiper('.testimonial-swiper', {
      // Nombre de slides visibles simultanément
      slidesPerView: 1,

      // Espace entre les slides
      spaceBetween: 30,

      // Centrer les slides
      centeredSlides: true,

      loop: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      
      // Pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      // Navigation
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // Autoplay (optionnel)
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },

      // Responsive breakpoints
      breakpoints: {
        // Mobile
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        // Tablette
        768: {
          slidesPerView: 1,
          spaceBetween: 25,
        },
        // Desktop
        1024: {
          slidesPerView: 1, // Même sur desktop, 1 seul témoignage
          spaceBetween: 30,
        }
      },
      on: {
        init: function () {
          // Ajout d'une classe visible aux slides actuels
          this.slides.forEach(slide => slide.classList.add('swiper-slide-visible'));
        },
        slideChangeTransitionStart: function () {
          // Enlever l'animation avant la transition
          this.slides.forEach(slide => slide.classList.remove('swiper-slide-visible'));
        },
        slideChangeTransitionEnd: function () {
          // Réafficher les slides visibles après la transition
          this.slides.forEach((slide, index) => {
            if (slide.classList.contains('swiper-slide-active') || 
                slide.classList.contains('swiper-slide-next') || 
                slide.classList.contains('swiper-slide-prev')) {
              slide.classList.add('swiper-slide-visible');
            }
          });
        }
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

//============================================
// ANNIMATION EFFET MARQUEUR
// ===========================================
function initMarkerAnimation() {
  const icons = document.querySelectorAll('.icon-highlight');

  if (icons.length === 0) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, 200); // petit délai
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  icons.forEach(icon => observer.observe(icon));
}

// Lancer après chargement
document.addEventListener('DOMContentLoaded', initMarkerAnimation);

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

/* PROGRAMME CORAN */
const circle = document.getElementById('mainCircle');
const steps = document.querySelectorAll('.step-item');

function drawConnections() {

    const circle = document.querySelector('.circle');
    const steps = document.querySelectorAll('.step');
    const timeline = document.querySelector('.timeline');

     // Stop si les éléments essentiels ne sont pas présents
  if (!circle || steps.length === 0 || !timeline) return;

    // Supprimer les anciennes lignes si on redessine
    document.querySelectorAll('.connection-line, .connection-dot, .circle-decoration').forEach(el => el.remove());

    const circleRect = circle.getBoundingClientRect();
    const centerX = circleRect.left + circleRect.width / 2 + window.scrollX;
    const centerY = circleRect.top + circleRect.height / 2 + window.scrollY;
    const radius = 180;

    
    // Créer les décorations autour du cercle principal
    const decorationColors = [
        '#00d4ff', '#4facfe', '#667eea', '#f093fb', '#ff6b9d'
    ];
    
    // Ajouter des points et traits décoratifs autour du cercle
    for (let i = 0; i < 20; i++) {
        const angle = (i * 18) * Math.PI / 180; // 18 degrés entre chaque élément
        const decorRadius = 110; // Rayon pour les décorations
        
        const decorX = centerX + decorRadius * Math.cos(angle);
        const decorY = centerY + decorRadius * Math.sin(angle);
        
        if (i % 4 === 0) {
            // Créer un point coloré
            const decorDot = document.createElement('div');
            decorDot.classList.add('circle-decoration');
            decorDot.style.position = 'absolute';
            decorDot.style.left = decorX + 'px';
            decorDot.style.top = decorY + 'px';
            decorDot.style.width = '8px';
            decorDot.style.height = '8px';
            decorDot.style.borderRadius = '50%';
            decorDot.style.background = decorationColors[Math.floor(i / 4) % decorationColors.length];
            decorDot.style.transform = 'translate(-50%, -50%)';
            decorDot.style.zIndex = '8';
            decorDot.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
            document.body.appendChild(decorDot);
        } else {
            // Créer un petit trait
            const decorLine = document.createElement('div');
            decorLine.classList.add('circle-decoration');
            decorLine.style.position = 'absolute';
            decorLine.style.left = decorX + 'px';
            decorLine.style.top = decorY + 'px';
            decorLine.style.width = '12px';
            decorLine.style.height = '2px';
            decorLine.style.background = decorationColors[Math.floor(i / 4) % decorationColors.length];
            decorLine.style.transform = `translate(-50%, -50%) rotate(${angle * 180 / Math.PI + 90}deg)`;
            decorLine.style.transformOrigin = 'center';
            decorLine.style.zIndex = '8';
            decorLine.style.opacity = '0.8';
            document.body.appendChild(decorLine);
        }
    }

    steps.forEach((step, index) => {
        const stepRect = step.getBoundingClientRect();
        const stepX = stepRect.left + window.scrollX;
        const stepY = stepRect.top + stepRect.height / 2 + window.scrollY;

        // Angle pour distribuer les points sur le cercle (côté droit)
        const totalSteps = steps.length;
        const angleSpread = 80; // Degrés total pour répartir les points
        const startAngle = -angleSpread / 2;
        const angle = (startAngle + (index * angleSpread / (totalSteps - 1))) * Math.PI / 180;

        // Coordonnées du point sur le cercle pointillé
        const pointX = centerX + radius * Math.cos(angle);
        const pointY = centerY + radius * Math.sin(angle);

        // Crée le point coloré
        const dot = document.createElement('div');
        dot.classList.add('connection-dot');
        dot.style.position = 'absolute';
        dot.style.left = pointX + 'px';
        dot.style.top = pointY + 'px';
        
        // Couleurs reprenant celles de l'image originale
        const colors = [
            'linear-gradient(135deg, #00d4ff, #1e90ff)',
            'linear-gradient(135deg, #4facfe, #00f2fe)', 
            'linear-gradient(135deg, #667eea, #764ba2)',
            'linear-gradient(135deg, #f093fb, #f5576c)',
            'linear-gradient(135deg, #ff6b9d, #c44569)'
        ];
        dot.style.background = colors[index];
        document.body.appendChild(dot);

        // Logique différente selon la position (haut, milieu, bas)
        if (index === 0) {
            // Trait le plus haut : vertical vers le haut puis horizontal
            const midY = stepY;
            
            // Ligne verticale du point vers le haut
            const line1 = document.createElement('div');
            line1.classList.add('connection-line');
            line1.style.position = 'absolute';
            line1.style.left = (pointX - 1) + 'px';
            line1.style.top = Math.min(pointY, midY) + 'px';
            line1.style.width = '2px';
            line1.style.height = Math.abs(midY - pointY) + 'px';
            document.body.appendChild(line1);

            // Ligne horizontale vers le bloc
            const line2 = document.createElement('div');
            line2.classList.add('connection-line');
            line2.style.position = 'absolute';
            line2.style.left = pointX + 'px';
            line2.style.top = (midY - 1) + 'px';
            line2.style.width = (stepX - pointX) + 'px';
            line2.style.height = '2px';
            document.body.appendChild(line2);
            
        } else if (index === steps.length - 1) {
            // Trait le plus bas : vertical vers le bas puis horizontal
            const midY = stepY;
            
            // Ligne verticale du point vers le bas
            const line1 = document.createElement('div');
            line1.classList.add('connection-line');
            line1.style.position = 'absolute';
            line1.style.left = (pointX - 1) + 'px';
            line1.style.top = Math.min(pointY, midY) + 'px';
            line1.style.width = '2px';
            line1.style.height = Math.abs(midY - pointY) + 'px';
            document.body.appendChild(line1);

            // Ligne horizontale vers le bloc
            const line2 = document.createElement('div');
            line2.classList.add('connection-line');
            line2.style.position = 'absolute';
            line2.style.left = pointX + 'px';
            line2.style.top = (midY - 1) + 'px';
            line2.style.width = (stepX - pointX) + 'px';
            line2.style.height = '2px';
            document.body.appendChild(line2);
            
        } else {
            // Traits du milieu : horizontal puis vertical
            const midX = stepX - 30;
            
            // Ligne horizontale du point du cercle vers le point intermédiaire
            const line1 = document.createElement('div');
            line1.classList.add('connection-line');
            line1.style.position = 'absolute';
            line1.style.left = Math.min(pointX, midX) + 'px';
            line1.style.top = (pointY - 1) + 'px';
            line1.style.width = Math.abs(midX - pointX) + 'px';
            line1.style.height = '2px';
            document.body.appendChild(line1);

            // Ligne verticale du point intermédiaire vers le bloc
            const line2 = document.createElement('div');
            line2.classList.add('connection-line');
            line2.style.position = 'absolute';
            line2.style.left = (midX - 1) + 'px';
            line2.style.top = Math.min(pointY, stepY) + 'px';
            line2.style.width = '2px';
            line2.style.height = Math.abs(stepY - pointY) + 'px';
            document.body.appendChild(line2);

            // Ligne horizontale finale du point intermédiaire vers le bloc
            const line3 = document.createElement('div');
            line3.classList.add('connection-line');
            line3.style.position = 'absolute';
            line3.style.left = midX + 'px';
            line3.style.top = (stepY - 1) + 'px';
            line3.style.width = (stepX - midX) + 'px';
            line3.style.height = '2px';
            document.body.appendChild(line3);
        }
    });
}

/*  PROGRAMME ARABE */
function drawConnectionsArabe(){
  const timeline  = document.querySelector('.timeline');
  const overlay   = document.querySelector('.connections');
  const pathSvg   = document.querySelector('.line svg');
  const path      = document.querySelector('.line path');
  const steps     = Array.from(document.querySelectorAll('.step'));

  //if (!timeline || !overlay || !pathSvg || !path) return;

  overlay.innerHTML = '';

  const vbW = 1200, vbH = 250;
  const svgRect = pathSvg.getBoundingClientRect();
  const parentRect = timeline.getBoundingClientRect();

  const domXtoSvg = (xDom) => ( (xDom - svgRect.left) * (vbW / svgRect.width) );
  const svgYtoDom = (ySvg) => ( svgRect.top + (ySvg * svgRect.height / vbH) - parentRect.top );

  function getYatX(path, xSvg){
    const total = path.getTotalLength();
    let start = 0, end = total, p;
    for(let i=0;i<25;i++){
      const mid = (start + end) / 2;
      p = path.getPointAtLength(mid);
      if (p.x < xSvg) start = mid; else end = mid;
    }
    return p.y;
  }

  steps.forEach(step=>{
    const tip = step.querySelector('.tip').getBoundingClientRect();
    const xDomCenter = tip.left + tip.width/2;
    const yDomStart  = step.classList.contains('top') ? tip.bottom : tip.top;

    const xSvg = domXtoSvg(xDomCenter);
    const ySvg = getYatX(path, xSvg);
    const yOnCurveDom = svgYtoDom(ySvg);

    const x = xDomCenter - parentRect.left;
    const y1 = yDomStart  - parentRect.top;
    const y2 = yOnCurveDom;

    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1', x);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', getComputedStyle(step).getPropertyValue('--g2').trim() || '#777');
    line.setAttribute('stroke-width', '3');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('stroke-dasharray', '2 7');
    line.setAttribute('opacity', '0.9');
    overlay.appendChild(line);

    const dot = document.createElementNS('http://www.w3.org/2000/svg','circle');
    dot.setAttribute('cx', x);
    dot.setAttribute('cy', y2);
    dot.setAttribute('r', '8');
    dot.setAttribute('fill', getComputedStyle(step).getPropertyValue('--g2').trim() || '#777');
    dot.setAttribute('stroke', 'white');
    dot.setAttribute('stroke-width', '3');
    overlay.appendChild(dot);
  });
}

window.addEventListener('load',  drawConnectionsArabe);
window.addEventListener('resize', drawConnectionsArabe);

// Appel initial après chargement
window.addEventListener('load', () => {
    setTimeout(drawConnections, 200);
});

// Redessiner si la fenêtre change (responsive)
window.addEventListener('resize', () => {
    setTimeout(drawConnections, 200);
});

// Redessiner pendant le scroll pour maintenir les positions
window.addEventListener('scroll', () => {
    drawConnections();
});
