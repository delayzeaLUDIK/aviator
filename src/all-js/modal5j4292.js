    // PRELOADER
    window.addEventListener('load', () => {
        setTimeout(() => {
          const p = document.getElementById('preloader');
          p.classList.add('hide');
          p.setAttribute('aria-hidden', 'true');
          p.style.opacity = '0';
          p.style.visibility = 'hidden';
        }, 900);
      });
  
      // MODAL logic
      const row = document.getElementById('gamesRow');
      const modal = document.getElementById('gameModal');
      const modalImg = document.getElementById('modalImg');
      const modalTitle = document.getElementById('modalTitle');
      const modalDesc = document.getElementById('modalDesc');
      const playBtn = document.getElementById('playBtn');
      const modalClose = document.getElementById('modalClose');
  
      // game metadata
      const games = {
        mines: {
          img: 'victory-card/mines.png',
          title: 'Mines',
          desc: 'Игра в стиле сапёра. Открывай ячейки и избегай ловушек!',
          href: 'mines.html'
        },
        reel: {
          img: 'victory-card/spinreel.png',
          title: 'Spin Reel',
          desc: 'Крути барабан и выигрывай!',
          href: 'spinREEL.html'
        },
        automate: {
          img: 'victory-card/666.png',
          title: '666',
          desc: 'Крутите барабан и получите число от 000 до 999.',
          href: 'automate.html'
        }
      };
  
      // open modal
      row.addEventListener('click', (e) => {
        const card = e.target.closest('.game-card.wrap');
        if (!card) return;
        const key = card.getAttribute('data-game');
        if (!key || !games[key]) return;
        const g = games[key];
        modalImg.src = g.img;
        modalTitle.textContent = g.title;
        modalDesc.textContent = g.desc;
        playBtn.onclick = () => { location.href = g.href; };
        openModal();
      });
  
      function openModal() {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
      function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
  
      modalClose.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  