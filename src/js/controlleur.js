import * as model from './model.js';
import recetteVue from './vues/recetteVue.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlleurRecette = async function () {
  try {
    // on recupere l'id présent dans le hash de l'url
    const id = window.location.hash.slice(1);

    // petite protection dans le cas où pas de id dans le hash
    if (!id) return;

    // on affiche un icone de chargement pendant que le fetchs e fait
    recetteVue.afficherIconeDeChargement();

    // on vient populer le tableau state.recipe
    await model.chargerRecette(id);

    recetteVue.afficherVue(model.state.recette);

    // On affiche maintenant le bout de code html de la recette
  } catch (erreur) {
    recetteVue.afficherErreurs();
  }
};

const init = function () {
  recetteVue.affichageEnLienAvecLesActionsUtilisateur(controlleurRecette);
};

init();

// on fait une écoute au changement de hash à la fin de l'url et aussi à la chargement de la page
