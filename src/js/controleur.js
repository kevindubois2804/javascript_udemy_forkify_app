import * as modele from './modele.js';
import recetteVue from './vues/recetteVue.js';
import rechercheVue from './vues/rechercheVue.js';
import resultatsVue from './vues/resultatsVue.js';
import favorisVue from './vues/favorisVue.js';
import paginationVue from './vues/paginationVue.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const controleurRecette = async function () {
  try {
    // on recupere l'id présent dans le hash de l'url
    const id = window.location.hash.slice(1);

    // petite protection dans le cas où pas de id dans le hash
    if (!id) return;

    // on affiche un icone de chargement pendant que le fetch se fait
    recetteVue.afficherIconeDeChargement();

    // on met à jour la vue des resultats pour mettre en surbrillance le résultat sélectionné
    resultatsVue.modifierVue(modele.recupererResultatsRechercheParPage());
    favorisVue.modifierVue(modele.etat.favoris);

    // on vient populer le tableau etat.recette
    await modele.chargerRecette(id);

    // On affiche maintenant la recette
    recetteVue.afficherVue(modele.etat.recette);
  } catch (erreur) {
    recetteVue.afficherErreurs();
  }
};

const controleurResultatsRecherche = async function () {
  try {
    resultatsVue.afficherIconeDeChargement();

    // on récupère la requete tapée dans la barre de recherche
    const requete = rechercheVue.recupererRequete();

    // protection dans le cas où il n'y aurait pas de requete
    if (!requete) return;

    // on charge les résultats dans le tableau etat.recherche.resultats
    await modele.chargerResultatsRecherche(requete);

    console.log(modele.etat.recherche.resultats);

    // on affiche les résultats
    resultatsVue.afficherVue(modele.recupererResultatsRechercheParPage());

    // on affiche le rendu initial des boutons de pagination
    paginationVue.afficherVue(modele.etat.recherche);
  } catch (erreur) {
    console.log(erreur);
  }
};

const controleurPagination = function (allerALaPage) {
  // on affiche les nouveaux résultats après avoir changé de page
  resultatsVue.afficherVue(
    modele.recupererResultatsRechercheParPage(allerALaPage)
  );

  // on affiche le rendu des nouveaux boutons de pagination après avoir changé de page
  paginationVue.afficherVue(modele.etat.recherche);
};

const controleurPortions = function (nouvellesPortions) {
  // met à jour les portions d'une recette dans l'objet etat
  modele.mettreAJourLesPortions(nouvellesPortions);

  // met à jour la vue recette
  // recetteVue.afficherVue(modele.etat.recette);
  recetteVue.modifierVue(modele.etat.recette);
};

const controleurFavoris = function () {
  // contrôle de l'ajout ou de la suppression d'un favori
  if (!modele.etat.recette.favori) modele.ajouterFavori(modele.etat.recette);
  else modele.supprimerFavori(modele.etat.recette.id);

  // on met à jour la vue des recettes avec le bouton de favori marqué ou non
  recetteVue.modifierVue(modele.etat.recette);

  // on affiche le listing des favoris
  favorisVue.afficherVue(modele.etat.favoris);
};

const init = function () {
  recetteVue.affichageALecouteDuHashEtDuChargementDePage(controleurRecette);
  recetteVue.affichageALecouteDuCliqueDesBoutonsDeModifDesPortions(
    controleurPortions
  );
  recetteVue.affichageALecouteDeLaMiseEnFavoriDuneRecette(controleurFavoris);

  rechercheVue.affichageALecouteDeLaRecherche(controleurResultatsRecherche);
  paginationVue.affichageALecouteDuCliqueDesBoutonsDePagination(
    controleurPagination
  );
};

init();

// on fait une écoute au changement de hash à la fin de l'url et aussi à la chargement de la page
