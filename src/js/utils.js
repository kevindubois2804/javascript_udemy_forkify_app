// fonction qui renomme les propriétés d'un object de façon récursive. Le paramètre Clefs est un object contenant le noms des nouveaux attributs
// const clefs = {
//   quantity: 'quantite',
//   unit: 'unite',
// };
// export function renommerLesProprietesDunObject(element) {
//   if (!element || typeof element !== 'object') return element;
//   if (Array.isArray(element))
//     return element.map(renommerLesProprietesDunObject);
//   return Object.fromEntries(
//     Object.entries(element).map(([k, v]) => {
//       console.log(clefs[k]);
//       return [clefs[k] || k, renommerLesProprietesDunObject(v)];
//     })
//   );
// }

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
