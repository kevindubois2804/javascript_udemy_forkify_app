import { TIMEOUT_SECONDS } from './config';

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const recupererJSON = async function (url) {
  try {
    const reponse = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
    // on convertit la réponse au format json
    const donnees = await reponse.json();

    if (!reponse.ok) throw new Error(`${donnees.message} (${reponse.status})`);

    return donnees;
  } catch (erreur) {
    throw erreur;
  }
};

export function renommerLesProprietesDunObject(element, clefs) {
  function helper(element) {
    if (!element || typeof element !== 'object') return element;
    if (Array.isArray(element)) return element.map(helper);

    return Object.fromEntries(
      Object.entries(element).map(([k, v]) => {
        return [clefs[k] || k, helper(v)];
      })
    );
  }
  return helper(element);
}
