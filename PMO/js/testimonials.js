document.addEventListener('DOMContentLoaded', function () {
    const viewport = document.getElementById('pmoTestimonialsTrack');
    const track = viewport?.querySelector('.pmo-testimonials-grid');
    const cards = track ? Array.from(track.querySelectorAll('.pmo-testimonial')) : [];
    const dotsContainer = document.querySelector('[data-testimonial-dots]');
    const previousButton = document.querySelector('[data-testimonial-prev]');
    const nextButton = document.querySelector('[data-testimonial-next]');

    if (!viewport || !track || !dotsContainer || !previousButton || !nextButton || cards.length === 0) {
        return;
    }

    let pageStarts = [];

    function getStepSize() {
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        return cards[0].getBoundingClientRect().width + gap;
    }

    function getVisibleCount() {
        return Math.max(1, Math.round((viewport.clientWidth + (getStepSize() - cards[0].getBoundingClientRect().width)) / getStepSize()));
    }

    function buildPagination() {
        const cardsPerPage = getVisibleCount();
        const pageCount = Math.ceil(cards.length / cardsPerPage);
        pageStarts = Array.from({ length: pageCount }, (_, pageIndex) => pageIndex * cardsPerPage);
        dotsContainer.replaceChildren(...pageStarts.map((startIndex, pageIndex) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'pmo-testimonial-dot';
            dot.setAttribute('aria-label', `Show testimonial page ${pageIndex + 1}`);
            dot.addEventListener('click', () => scrollToCard(startIndex));
            return dot;
        }));
        updateControls();
    }

    function getCurrentPage() {
        const step = getStepSize();
        const currentCard = Math.round(viewport.scrollLeft / step);
        return pageStarts.reduce((closest, startIndex, index) => (
            Math.abs(startIndex - currentCard) < Math.abs(pageStarts[closest] - currentCard) ? index : closest
        ), 0);
    }

    function scrollToCard(index) {
        viewport.scrollTo({ left: index * getStepSize(), behavior: 'smooth' });
    }

    function updateControls() {
        const currentPage = getCurrentPage();
        const lastPage = Math.max(0, pageStarts.length - 1);
        previousButton.disabled = currentPage === 0;
        nextButton.disabled = currentPage === lastPage;

        dotsContainer.querySelectorAll('.pmo-testimonial-dot').forEach((dot, index) => {
            if (index === currentPage) {
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.removeAttribute('aria-current');
            }
        });
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