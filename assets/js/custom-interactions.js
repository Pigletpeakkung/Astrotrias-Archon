/**
 * Custom Astrotrias Interactions
 * Add your custom functionality here
 */

// Wait for quantum engine to be ready
document.addEventListener('quantum:initialized', (e) => {
  console.log('🚀 Quantum Engine Ready!', e.detail);
  
  const engine = window.AstrotriasEngine;
  
  // Custom theme toggle with sound effect
  const customThemeToggle = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    engine.setCosmicTheme(newTheme, true);
    
    // Add custom notification
    engine.showQuantumNotification(
      `Switched to ${newTheme} dimension! ✨`, 
      'info'
    );
  };
  
  // Add custom keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl + Shift + D for dimensional shift
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
      e.preventDefault();
      engine.activateDimensionalShift();
      engine.showQuantumNotification('Dimensional shift activated! 🌀', 'success');
    }
    
    // Ctrl + Shift + C for cosmic mode
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      engine.activateCosmicMode();
    }
  });
  
  // Custom card interactions
  const enhanceCards = () => {
    const cards = document.querySelectorAll('.dimensional-card');
    cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        engine.showQuantumNotification(
          `Exploring dimension ${index + 1}... 🚀`, 
          'info'
        );
      });
    });
  };
  
  // Initialize custom enhancements
  enhanceCards();
  
  // Auto-demo mode (remove in production)
  if (window.location.search.includes('demo=true')) {
    setTimeout(() => engine.activateDimensionalShift(), 3000);
    setTimeout(() => customThemeToggle(), 6000);
    setTimeout(() => engine.activateCosmicMode(), 9000);
  }
});

// Custom cosmic event handlers
document.addEventListener('theme:changed', (e) => {
  console.log('🎨 Theme changed:', e.detail.theme);
  
  // Custom theme change effects
  if (e.detail.theme === 'light') {
    console.log('☀️ Light mode activated');
  } else {
    console.log('🌙 Dark mode activated');
  }
});

document.addEventListener('dimensional:shift', (e) => {
  console.log('🌀 Dimensional shift detected:', e.detail);
});

document.addEventListener('card:activated', (e) => {
  console.log('🃏 Card activated:', e.detail.card);
});

// Add to global scope for console access
window.customInteractions = {
  triggerShift: () => window.AstrotriasEngine?.activateDimensionalShift(),
  toggleTheme: () => {
    const engine = window.AstrotriasEngine;
    const current = document.documentElement.getAttribute('data-theme');
    engine?.setCosmicTheme(current === 'dark' ? 'light' : 'dark', true);
  },
  cosmicMode: () => window.AstrotriasEngine?.activateCosmicMode(),
  showNotification: (msg, type = 'info') => {
    window.AstrotriasEngine?.showQuantumNotification(msg, type);
  }
};

console.log('🎮 Custom interactions loaded! Try: customInteractions.triggerShift()');
