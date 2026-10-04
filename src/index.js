import AppContainer from './js/Controllers/App/index.js';
import GameControlsController from './js/Controllers/GameControls/index.js';

const initApp = () => {
  AppContainer.init();

  GameControlsController.init();
};

initApp();
