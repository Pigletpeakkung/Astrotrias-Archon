import { CosmicInterface } from './cosmic-interface-class.js';

document.addEventListener('DOMContentLoaded', () => {
  const cosmicUI = new CosmicInterface();

  // Example particle config (customize as needed)
  const particleConfig = {
    particles: {
      number: {
        value: cosmicUI.getOptimalParticleCount(),
      },
      color: {
        value: '#7c3aed',
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: 3,
      },
      move: {
        enable: true,
        speed: 1,
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#7c3aed',
        opacity: 0.4,
        width: 1,
      },
    },
  };

  cosmicUI.initializeParticles(particleConfig);
  cosmicUI.initializeDimensionalPortal();
  cosmicUI.initializeStellarTimeline();
  cosmicUI.initializeCosmicSkills();
  cosmicUI.initializeDimensionalCards();
  cosmicUI.enhanceQuantumNavigation();
});
