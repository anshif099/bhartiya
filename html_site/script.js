/* ==========================================================================
   BHARTIYA CONVERGE - Pure Vanilla JS Controller
   Handles 3D Page Flip, Real-time Drag, Wheel Scroll & Slider Lock
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  let currentPageIndex = 0;
  let isTurning = false;
  let dragProgress = 0;
  let isSliderUnlocked = false;
  let isSliderDragging = false;
  let sliderStartX = 0;

  const totalPages = 5;
  const pages = document.querySelectorAll('.flip-page');
  const sliderKnob = document.getElementById('sliderKnob');
  const sliderContainer = document.getElementById('sliderContainer');
  const slideText = document.getElementById('slideText');

  // Sidebar Tabs mapping
  const tabIds = ['bhartiya', 'about', 'speakers', 'event'];

  // ─── 1. PAGE FLIP ENGINE ─────────────────────────────────────────
  function goToPage(targetIndex) {
    if (isTurning || targetIndex === currentPageIndex || targetIndex < 0 || targetIndex >= totalPages) return;
    isTurning = true;

    const isForward = targetIndex > currentPageIndex;
    const activePage = pages[currentPageIndex];
    const targetPage = pages[targetIndex];

    // Show target page
    targetPage.classList.add('active');
    targetPage.style.transform = isForward ? 'rotateY(0deg)' : 'rotateY(-180deg)';

    activePage.classList.add('turning');

    requestAnimationFrame(() => {
      activePage.style.transform = isForward ? 'rotateY(-180deg)' : 'rotateY(0deg)';
    });

    setTimeout(() => {
      activePage.classList.remove('active', 'turning');
      activePage.style.transform = '';
      currentPageIndex = targetIndex;
      isTurning = false;
      updateSidebarActiveTab();
    }, 2200);
  }

  function updateSidebarActiveTab() {
    document.querySelectorAll('.bp-tab').forEach((tab) => {
      const pageNum = parseInt(tab.getAttribute('data-page'), 10);
      if (pageNum === currentPageIndex) {
        tab.classList.add('bp-tab--active');
      } else {
        tab.classList.remove('bp-tab--active');
      }
    });
  }

  // Bind Sidebar Tab Clicks across all pages
  document.querySelectorAll('.bp-tab').forEach((tab) => {
    tab.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetPageNum = parseInt(tab.getAttribute('data-page'), 10);
      goToPage(targetPageNum);
    });
  });

  // Bind Back Buttons
  document.querySelectorAll('.bp-back-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToPage(0);
    });
  });

  // ─── 2. WHEEL SCROLL FLIP ──────────────────────────────────────────
  let lastWheelTime = 0;
  window.addEventListener('wheel', (e) => {
    const now = Date.now();
    if (now - lastWheelTime < 1200 || isTurning) return;

    if (e.deltaY > 30) {
      if (currentPageIndex < totalPages - 1) {
        lastWheelTime = now;
        goToPage(currentPageIndex + 1);
      }
    } else if (e.deltaY < -30) {
      if (currentPageIndex > 0) {
        lastWheelTime = now;
        goToPage(currentPageIndex - 1);
      }
    }
  }, { passive: true });

  // ─── 3. PAGE 1 SLIDER DRAG LOGIC ──────────────────────────────────
  if (sliderKnob && sliderContainer) {
    function updateKnobPosition(progress) {
      const trackWidth = sliderContainer.clientWidth || 240;
      const knobWidth = 58;
      const maxDrag = Math.max(1, trackWidth - knobWidth - 12);
      const translateX = progress * maxDrag;
      sliderKnob.style.transform = `translateX(${translateX}px)`;
    }

    function handleStart(clientX) {
      isSliderDragging = true;
      const trackWidth = sliderContainer.clientWidth || 240;
      const knobWidth = 58;
      const maxDrag = Math.max(1, trackWidth - knobWidth - 12);
      sliderStartX = clientX - dragProgress * maxDrag;
    }

    function handleMove(clientX) {
      if (!isSliderDragging) return;
      const trackWidth = sliderContainer.clientWidth || 240;
      const knobWidth = 58;
      const maxDrag = Math.max(1, trackWidth - knobWidth - 12);
      const deltaX = clientX - sliderStartX;
      dragProgress = Math.max(0, Math.min(1, deltaX / maxDrag));
      updateKnobPosition(dragProgress);
    }

    function handleEnd() {
      if (!isSliderDragging) return;
      isSliderDragging = false;
      if (dragProgress > 0.45) {
        dragProgress = 1;
        isSliderUnlocked = true;
        updateKnobPosition(1);
        if (slideText) slideText.textContent = 'Welcome to Converge';
        setTimeout(() => {
          goToPage(1);
        }, 300);
      } else {
        dragProgress = 0;
        isSliderUnlocked = false;
        updateKnobPosition(0);
      }
    }

    // Mouse Events
    sliderKnob.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      handleStart(e.clientX);
    });

    window.addEventListener('mousemove', (e) => handleMove(e.clientX));
    window.addEventListener('mouseup', handleEnd);

    // Touch Events
    sliderKnob.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      handleStart(e.touches[0].clientX);
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (isSliderDragging) {
        handleMove(e.touches[0].clientX);
      }
    }, { passive: false });

    window.addEventListener('touchend', handleEnd);

    // Track click fallback
    sliderContainer.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!isSliderUnlocked) {
        dragProgress = 1;
        isSliderUnlocked = true;
        updateKnobPosition(1);
        setTimeout(() => goToPage(1), 300);
      }
    });
  }
});
