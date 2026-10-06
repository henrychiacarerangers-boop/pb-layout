document.addEventListener('DOMContentLoaded', function () {
  const viewport = document.getElementById('plusTestimonialsTrack');
  const track = viewport?.querySelector('.plus-testimonials-grid');
  const cards = track ? Array.from(track.querySelectorAll('.plus-testimonial-card')) : [];
  const dotsContainer = document.querySelector('[data-plus-testimonial-dots]');
  const previousButton = document.querySelector('[data-plus-testimonial-prev]');
  const nextButton = document.querySelector('[data-plus-testimonial-next]');

  if (!viewport || !track || !dotsContainer || !previousButton || !nextButton || cards.length === 0) {
    return;
  }

  let pageStarts = [];

  function getStepSize() {
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return cards[0].getBoundingClientRect().width + gap;
  }

  function getVisibleCount() {
    return Math.max(1, Math.round(viewport.clientWidth / getStepSize()));
  }

  function getCurrentPage() {
    if (pageStarts.length < 2) {
      return 0;
    }
    const currentCard = Math.round(viewport.scrollLeft / getStepSize());
    return pageStarts.reduce((closest, startIndex, index) => (
      Math.abs(startIndex - currentCard) < Math.abs(pageStarts[closest] - currentCard) ? index : closest
    ), 0);
  }

  function scrollToCard(index) {
    viewport.scrollTo({ left: index * getStepSize(), behavior: 'smooth' });
  }

  function updateControls() {
    const currentPage = getCurrentPage();
    previousButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage >= pageStarts.length - 1;
    dotsContainer.querySelectorAll('.plus-testimonial-dot').forEach((dot, index) => {
      if (index === currentPage) {
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.removeAttribute('aria-current');
      }
    });
  }

  function buildPagination() {
    const cardsPerPage = getVisibleCount();
    const pageCount = Math.ceil(cards.length / cardsPerPage);
    pageStarts = Array.from({ length: pageCount }, (_, index) => index * cardsPerPage);
    dotsContainer.replaceChildren(...pageStarts.map((startIndex, pageIndex) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'plus-testimonial-dot';
      dot.setAttribute('aria-label', `Show testimonial page ${pageIndex + 1}`);
      dot.addEventListener('click', () => scrollToCard(startIndex));
      return dot;
    }));
    updateControls();
  }

  previousButton.addEventListener('click', () => {
    scrollToCard(pageStarts[Math.max(0, getCurrentPage() - 1)]);
  });
  nextButton.addEventListener('click', () => {
    scrollToCard(pageStarts[Math.min(pageStarts.length - 1, getCurrentPage() + 1)]);
  });
  viewport.addEventListener('scroll', updateControls, { passive: true });
  viewport.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      previousButton.click();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextButton.click();
    }
  });

  let resizeFrame;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(buildPagination);
  });

  buildPagination();
});