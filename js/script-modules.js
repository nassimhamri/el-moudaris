 
  (() => {
    let progress = { unlockedCourses: [1], unlockedMemo: {} };
      const questionBank = {
        1: [
          { q: '1. Quelle est la matière étudiée ?', audio: '/medias/modules/croyance/quiz/1/q1-1.mp3', choices: ['A. La biographie du Prophète','B. La croyance authentique','C. La jurisprudence islamique'], a: 1 },
          { q: "2. Comment s'appelle l'invitée surprise ?", audio: '/medias/modules/croyance/quiz/1/q1-2.mp3', choices: ['A. Basirah','B. Nourī','C. Siraj'], a: 0 },
          { q: '3. Pourquoi Allah nous a créés ?', audio: '/medias/modules/croyance/quiz/1/q1-3.mp3', choices: ['A. Pour manger et boire','B. Pour jouer','C. Pour L’adorer'], a: 2 },
          { q: '4. Qui Allah a-t-Il envoyé pour nous montrer comment L’adorer ?', audio: '/medias/modules/croyance/quiz/1/q1-4.mp3', choices: ['A. Notre Abī','B. Notre Professeur','C. Le Prophète Mohammed  ﷺ'], a: 2 },
          { q: '5. Combien y aura-t-il de questions dans la tombe ?', audio: '/medias/modules/croyance/quiz/1/q1-5.mp3', choices: ['A. Une question','B. Trois questions','C. Cinq questions'], a: 1 },
          { q: "6. J'agrée Allah comme Seigneur, l’islam comme religion et le Prophète Mohammed ﷺ comme Prophète.", audio: '/medias/modules/croyance/quiz/1/q1-6.mp3', choices: ['A. Après la prière','B. En sortant de la maison','C. Le matin et le soir'], a: 2 }
        ],
        2: [
          { q: '1. Où se déroule le cours ?', audio: '/medias/modules/croyance/quiz/2/q2-1.mp3', choices: ['A. Dans une maison','B. Dans une école','C. Dans une mosquée'], a: 2 },
          { q: '2. Quel est le sujet du jour ?', audio: '/medias/modules/croyance/quiz/2/q2-2.mp3', choices: ["A. La Sunnah prophétique",'B. Le noble Coran','C. Les mathématiques'], a: 1 },
          { q: '3. Quel est ton livre ?', audio: '/medias/modules/croyance/quiz/2/q2-3.mp3', choices: ["A. L'Évangile",'B. La Torah','C. Le Noble Coran'], a: 2 },
          { q: '4. Sur qui le Noble Coran a-t-il été révélé ?', audio: '/medias/modules/croyance/quiz/2/q2-4.mp3', choices: ["A. Le prophète Mohammed ﷺ",'B. Le prophète Mousā','C. Le prophète Ibrāhīm'], a: 0 },
          { q: "5. Par l'intermédiaire de quel ange le Prophète ﷺ reçut-il la révélation ?", audio: '/medias/modules/croyance/quiz/2/q2-5.mp3', choices: ["A. L'ange Mikhaïl","B. L'ange Djibrīl","C. L'ange de la mort"], a: 1 },
          { q: '6. Est-ce possible de modifier le texte du Coran ?', audio: '/medias/modules/croyance/quiz/2/q2-6.mp3', choices: ['A. Oui','B. Non'], a: 1 },
          { q: '7. Depuis à peu près combien de temps le Noble Coran a-t-il été révélé ?', audio: '/medias/modules/croyance/quiz/2/q2-7.mp3', choices: ['A. 1200 ans','B. 1300 ans','C. 1400 ans'], a: 2 },
          { q: '8. Combien y a-t-il de sourates dans le Noble Coran ?', audio: '/medias/modules/croyance/quiz/2/q2-8.mp3', choices: ['A. 113 sourates','B. 114 sourates','C. 115 sourates'], a: 1 },
          { q: '9. Quelle est la première et la dernière sourate du Coran ?', audio: '/medias/modules/croyance/quiz/2/q2-9.mp3', choices: ['A. Sourate El-Fātiha et Sourate El-Ikhlās','B. Sourate El-Fātiha et Sourate El-Falaq','C. Sourate El-Fātiha et Sourate An-Nās'], a: 2 }
        ],
        3: [
          { q: "1. De quoi parle-t-on aujourd'hui ?", audio: '/medias/modules/croyance/quiz/3/q3-1.mp3', choices: ["A. De l'adoration",'B. De la prière','C. Du Tawhīd'], a: 2 },
          { q: '2. Quel est le sens du terme « adorer » dans le verset du Coran ?', audio: '/medias/modules/croyance/quiz/3/q3-2.mp3', choices: ["A. L'aimer",'B. Espérer le Paradis',"C. L'unifier, le rendre unique"], a: 2 },
          { q: "3. Comment appelle-t-on la religion d'Ibrāhīm ?", audio: '/medias/modules/croyance/quiz/3/q3-3.mp3', choices: ['A. Ibrāhimiyya','B. Salhāniyya',"Al-Hanīfiyya, la voie de l'unicité"], a: 2 },
          { q: "4. Quelle est la plus grosse injustice que l'être humain puisse commettre envers Allah ?", audio: '/medias/modules/croyance/quiz/3/q3-4.mp3', choices: ['A. Faire un péché','B. Oublier la prière','C. Lui donner un associé (le shirk)'], a: 2 },
          { q: "5. Quelle est la parole de l'unicité ?", audio: '/medias/modules/croyance/quiz/3/q3-5.mp3', choices: ['A. Lā ilāha illallah','B. Lā hawla wa lā quwwata illā billah','C. Subhānallāh'], a: 0 },
          { q: "6. Quel est le sens de la parole de l'unicité ?", audio: '/medias/modules/croyance/quiz/3/q3-6.mp3', choices: ["A. Nul ne mérite d'être adoré si ce n'est Allah",'B. Allah est le seul Seigneur','C. Allah est le seul pourvoyeur'], a: 0 }
        ],
        4: [
          { q: "1. Où ce déroule le cours d'aujourd'hui ?", audio: '/medias/modules/croyance/quiz/4/q4-1.mp3', choices: ['A. Dans un parc','B. Dans un cirque','C. Dans la cour de récréation'], a: 0 },
          { q: '2. Où est Allah ?', audio: '/medias/modules/croyance/quiz/4/q4-2.mp3', choices: ['A. Nous ne savons pas','B. Partout','C. Au-dessus des cieux sur son Trône'], a: 2 },
          { q: "3. Dans l'histoire, qui s'est plaint au Messager d'Allah ﷺ ?", audio: '/medias/modules/croyance/quiz/4/q4-3.mp3', choices: ['A. Une servante','B. Un compagnons','C. Un Juif'], a: 0 },
          { q: "4. Pourquoi le Messager d'Allah ﷺ a-t-il demandé d'affranchir cette servante ?", audio: '/medias/modules/croyance/quiz/4/q4-4.mp3', choices: ['A. Car elle était croyante','B. Car elle était mécréante','C. Car elle était âgée'], a: 0 },
          { q: "5. Peut-on savoir comment Allah s'est établi sur son Trône ?", audio: '/medias/modules/croyance/quiz/4/q4-5.mp3', choices: ['A. Oui','B. Non'], a: 1 },
          { q: "6. Lorsque le musulman parle de croyance, sur quelles preuves s'appuie-t-il ?", audio: '/medias/modules/croyance/quiz/4/q4-6.mp3', choices: ['A. Les pensées intellectuelles et les histoires anciennes',"B. L'Histoire contemporaine et la Philosophie",'C. Le Coran et la Sounnah'], a: 2 },
          { q: "7. Est-ce qu'interroger sur l'établissement d'Allah est une innovation (Bid'a) ?", audio: '/medias/modules/croyance/quiz/4/q4-7.mp3', choices: ['A. Vrai','B. Faux'], a: 0 },
          { q: "8. Qu'est-ce que l'innovation religieuse (Bid'a) ?", audio: '/medias/modules/croyance/quiz/4/q4-8.mp3', choices: ["A. C'est une chose venant du prophète Mohammed ﷺ ","B. C'est une chose venant d'un savant","C. C'est une chose qui n'a pas été rapportée par le prophète Mohammed ﷺ"], a: 2 },
          { q: "9. La religion d'Allah est-t-elle complète ?", audio: '/medias/modules/croyance/quiz/4/q4-9.mp3', choices: ['A. Vrai','B. Faux'], a: 0 },
          { q: "10. Quel geste accomplit le musulman lorsqu'il invoque Allah ?", audio: '/medias/modules/croyance/quiz/4/q4-10.mp3', choices: ['A. Il lève la tête vers le ciel ','B. Il lève les mains vers le ciel','C. Il regarde vers le sol'], a: 1 }
        ]
      };

    const zone = document.querySelector('.ic-course-zone');
    const tpl  = document.getElementById('ic-course-template').innerHTML;
    const vTabs = [...document.querySelectorAll('.ic-v-tab')];

    function setupHorizontal(courseEl) {
      const tabs = [...courseEl.querySelectorAll('.ic-h-tab')];
      const panels = [...courseEl.querySelectorAll('.ic-panel')];
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          if (tab.disabled) return;
          courseEl.querySelectorAll('audio').forEach(a => { a.pause(); a.currentTime = 0; });
          tabs.forEach(t => t.classList.remove('ic-active'));
          panels.forEach(p => p.classList.remove('ic-active'));
          tab.classList.add('ic-active');
          courseEl.querySelector(`.ic-panel[data-tab="${tab.dataset.tab}"]`)
                  .classList.add('ic-active');
          if (tab.dataset.tab === 'memo') {
            initPdfViewer(courseEl);
          }
        });
      });
      tabs[0].click();
    }

    function setupVertical() {
      vTabs.forEach((btn, idx) => {
        const n = idx + 1;
        if (!progress.unlockedCourses.includes(n)) {
          btn.disabled = true; btn.classList.add('ic-locked');
        }
        btn.addEventListener('click', () => {
          if (btn.disabled) return;
          document.querySelectorAll('.ic-course audio').forEach(a => {
            a.pause(); a.currentTime = 0;
          });
          vTabs.forEach(b => b.classList.remove('ic-active'));
          document.querySelectorAll('.ic-course').forEach(c => c.classList.remove('ic-active'));
          btn.classList.add('ic-active');
          loadCourse(n);
          document.querySelector(`.ic-course[data-course="${n}"]`)
                  .classList.add('ic-active');
        });
      });
      vTabs[0].click();
    }

    function loadCourse(i) {
      if (zone.querySelector(`.ic-course[data-course="${i}"]`)) return;
      zone.insertAdjacentHTML('beforeend', tpl.replace(/{{i}}/g, i));
      const el = zone.querySelector(`.ic-course[data-course="${i}"]`);
      setupHorizontal(el);
      setupAudio(el);
      setupAudioControls(el);
      setupQuiz(el, i);
      setupNextCourseUnlock(el, i);
    }

    function setupAudio(courseEl) {
      courseEl.querySelector('.ic-unlock').addEventListener('click', () => {
        const q = courseEl.querySelector('[data-tab="quiz"]');
        q.disabled = false; q.click();
      });
    }

    function setupAudioControls(courseEl) {
      const audioEl = courseEl.querySelector('.ic-audiomemo');
      const ctr = courseEl.querySelector('.ic-audiomemo-extra-controls');
      ctr.querySelector('.ic-play').addEventListener('click',  () => audioEl.play());
      ctr.querySelector('.ic-pause').addEventListener('click', () => audioEl.pause());
      ctr.querySelector('.ic-restart').addEventListener('click',() => {
        audioEl.currentTime = 0; audioEl.play();
      });
    }

    function setupQuiz(courseEl, idx) {
      const data = questionBank[idx] || [];
      const qTab = courseEl.querySelector('[data-tab="quiz"]');
      const memoTab = courseEl.querySelector('[data-tab="memo"]');
      const bar = courseEl.querySelector('.ic-bar');
      const box = courseEl.querySelector('.ic-quiz-box');
      let current=0, score=0, selected=null;

      const updateBar = () => {
        bar.style.width = `${((current+1)/data.length)*100}%`;
      };

      function render() {
        box.innerHTML = '';
        const { q,audio,choices,a } = data[current];
        box.insertAdjacentHTML('beforeend', `
          <audio controls preload="auto" autoplay src="${audio}"></audio>
          <div class="buttononglet">
            <button class="ic-btn ic-repeat-question">⟲ Répéter</button>
            <button class="ic-btn ic-play">▶ Écouter la question</button>
          </div>
          <p>${q}</p>
        `);
        const wrap = document.createElement('div'); wrap.className = 'choices';
        choices.forEach((ch,i) => {
          const btn = document.createElement('button');
          btn.className = 'ic-answer-btn'; btn.textContent = ch;
          btn.addEventListener('click',() => {
            wrap.querySelectorAll('button')
                .forEach(b=>b.classList.remove('ic-selected'));
            btn.classList.add('ic-selected'); selected = i;
          });
          wrap.appendChild(btn);
        });
        box.appendChild(wrap);

        const nav = document.createElement('div');
        nav.style.marginTop='1rem';
        const btn = document.createElement('button');
        btn.className='ic-btn';
        if (current < data.length-1) {
          btn.textContent='Valider la réponse';
          btn.addEventListener('click',() => {
            if (selected===a) score++;
            current++; selected=null; updateBar(); render();
          });
        } else {
          btn.textContent='Obtenir le score final';
          btn.addEventListener('click',() => {
            if (selected===a) score++;
            box.innerHTML=`<p>Score: ${score}/${data.length}</p>`;
            if (score >= data.length/2) {
              box.insertAdjacentHTML('beforeend',
                `<p class="congrats-style">Bien joué 🎉 ! Tu peux débloquer tes ressources 🎁.</p>`
              );
              const u=document.createElement('button');
              u.className='ic-btn'; u.textContent='Débloquer Ressources';
              u.addEventListener('click',() => {
                memoTab.disabled=false; u.disabled=true;
                courseEl.dispatchEvent(new CustomEvent('coursePassed'));
              });
              box.appendChild(u);
            } else {
              box.insertAdjacentHTML('beforeend',
                `<p class="congrats-style">
                   Presque ! Réessaie pour débloquer tes ressources.
                 </p>`
              );
              const r=document.createElement('button');
              r.className='ic-btn'; r.textContent='Recommencer';
              r.addEventListener('click',() => {
                current=0; score=0; updateBar(); render();
              });
              box.appendChild(r);
            }
          });
        }
        nav.appendChild(btn); box.appendChild(nav); updateBar();
      }

      qTab.addEventListener('click', () => {
        current=0; score=0; updateBar(); render();
      });
    }

    function setupNextCourseUnlock(courseEl, idx) {
      const nextBtn = courseEl.querySelector('.ic-next-course');
      if (idx === 4) {
        nextBtn.style.display = 'none';
        const memoPanel = courseEl.querySelector('.ic-panel[data-tab="memo"]');
        memoPanel.insertAdjacentHTML('beforeend',
          '<p style="margin-top:20px; font-size:30px;">' +
          'Félicitation 🎉 !! Tu as achevé notre module de présentation du cursus sur la Croyance !</p>'
        );
        return;
      }
      const tab = vTabs[idx];
      courseEl.addEventListener('coursePassed', () => { nextBtn.disabled = false; });
      nextBtn.addEventListener('click', () => {
        tab.disabled = false; tab.classList.remove('ic-locked'); tab.click();
      });
    }

    // Initialisation PDF.js pour chaque memo
    function initPdfViewer(courseEl) {
      const viewer = courseEl.querySelector('.pdf-viewer');
      if (viewer.dataset.initialized) return;
      viewer.dataset.initialized = true;

      const url = viewer.dataset.pdfUrl;
      const canvas = viewer.querySelector('.pdf-canvas');
      const ctx = canvas.getContext('2d');
      let pdfDoc = null, pageNum = 1;

      pdfjsLib.getDocument(url).promise.then(doc => {
        pdfDoc = doc;
        renderPage(pageNum);
      });

      function renderPage(num) {
        pdfDoc.getPage(num).then(page => {
          const viewport = page.getViewport({ scale: 1.2 });
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          page.render({ canvasContext: ctx, viewport: viewport });
        });
      }

      viewer.querySelector('.pdf-prev').addEventListener('click', () => {
        if (pageNum <= 1) return;
        pageNum--;
        renderPage(pageNum);
      });
      viewer.querySelector('.pdf-next').addEventListener('click', () => {
        if (pageNum >= pdfDoc.numPages) return;
        pageNum++;
        renderPage(pageNum);
      });
    }

    // Gestion boutons play/pause/restart audio globalement
    document.getElementById('ic-wrapper').addEventListener('click', e => {
      const active = document.querySelector('.ic-course.ic-active');
      if (!active) return;
      const panel = active.querySelector('.ic-panel.ic-active');
      if (!panel) return;
      const audioEl = panel.querySelector('audio');
      if (!audioEl) return;
      if (e.target.matches('.ic-play')) audioEl.play();
      if (e.target.matches('.ic-pause')) audioEl.pause();
      if (e.target.matches('.ic-restart') || e.target.matches('.ic-repeat-question')) {
        audioEl.currentTime = 0; audioEl.play();
      }
    });

    setupVertical();
  })();