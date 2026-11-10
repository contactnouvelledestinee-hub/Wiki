/* Les Hauts Faits de Nouvelle Destinée : catalogue et dessins des insignes (SVG).
   Même famille que les Sceaux de formation : médaillon bleu nuit, anneaux de couleur, motif au centre. */
;(function () {
  'use strict'
  const NUIT = '#1d1638'

  const CATALOGUE = [
    { id: 'fondateur', nom: 'Fondateur', cat: 'distinction', condition: 'A participé à la création de Nouvelle Destinée.' },
    { id: 'etoile-3', nom: 'Étoile, échelon III', cat: 'distinction', condition: 'Un impact marquant sur Nouvelle Destinée.' },
    { id: 'etoile-2', nom: 'Étoile, échelon II', cat: 'distinction', condition: 'Un impact sur toute la communauté francophone des Royaumes de Feu.' },
    { id: 'etoile-1', nom: 'Étoile, échelon I', cat: 'distinction', condition: 'Un impact sur la communauté internationale de la saga.' },
    { id: 'conseil', nom: 'Siège au Conseil', cat: 'distinction', condition: 'A siégé au Conseil d’Administration. Acquis à vie.' },
    { id: 'gardien', nom: 'Gardien du feu', cat: 'distinction', condition: 'A tenu la structure dans un moment difficile.' },
    { id: 'formateur', nom: 'Formateur principal', cat: 'formation', condition: 'A conçu les formations de Nouvelle Destinée.' },
    { id: 'eclair-noir', nom: 'Éclair noir', cat: 'formation', condition: 'A validé la formation de modération du MOS.' },
    { id: 'referent', nom: 'Référent de pôle', cat: 'formation', condition: 'Est référent d’un pôle.' },
    { id: 'anciennete-1', nom: 'Ancienneté, 6 mois', cat: 'succes', condition: '6 mois dans l’équipe.' },
    { id: 'anciennete-2', nom: 'Ancienneté, 1 an', cat: 'succes', condition: '1 an dans l’équipe.' },
    { id: 'anciennete-3', nom: 'Ancienneté, 2 ans', cat: 'succes', condition: '2 ans dans l’équipe.' },
    { id: 'pilier', nom: 'Pilier', cat: 'succes', condition: 'Un travail remarquable sur la durée.' },
    { id: 'plume', nom: 'Plume d’or', cat: 'succes', condition: 'Un gros travail de rédaction ou d’illustration pour le wiki.' },
    { id: 'affilie', nom: 'Affilié', cat: 'partenariat', condition: 'Structure affiliée à Nouvelle Destinée.' },
    { id: 'collaboratif', nom: 'Partenaire collaboratif', cat: 'partenariat', condition: 'Mène des projets communs avec Nouvelle Destinée.' },
    { id: 'artiste', nom: 'Artiste partenaire', cat: 'partenariat', condition: 'Illustre pour la structure.' },
  ]
  const CATEGORIES = { distinction: 'Distinctions', formation: 'Insignes de formation', succes: 'Succès', partenariat: 'Partenariats' }

  // Médaillon de base, comme les Sceaux : disque nuit, anneau de couleur, filet et perles selon le rang
  function medaillon(c, o) {
    o = o || {}
    let s = `<circle cx="32" cy="32" r="30" fill="${NUIT}" stroke="${c}" stroke-width="2.4"/>`
    if (o.filet) s += `<circle cx="32" cy="32" r="25" fill="none" stroke="${c}" stroke-width="1"/>`
    if (o.perles) s += Array.from({ length: 24 }, (_, i) => { const a = (i / 24) * Math.PI * 2; return `<circle cx="${(32 + 28 * Math.cos(a)).toFixed(1)}" cy="${(32 + 28 * Math.sin(a)).toFixed(1)}" r=".9" fill="${c}"/>` }).join('')
    return s
  }
  const etoilePts = (cx, cy, R, r, b) => Array.from({ length: b * 2 }, (_, i) => { const a = -Math.PI / 2 + (i * Math.PI) / b; const q = i % 2 ? r : R; return `${(cx + q * Math.cos(a)).toFixed(2)},${(cy + q * Math.sin(a)).toFixed(2)}` }).join(' ')
  const lettre = (t, c, y, taille) => `<text x="32" y="${y}" text-anchor="middle" font-family="Spectral, Georgia, serif" font-weight="600" font-size="${taille}" fill="${c}">${t}</text>`
  const trait = (c, l) => `fill="none" stroke="${c}" stroke-width="${l || 1.6}" stroke-linecap="round" stroke-linejoin="round"`

  const DESSINS = {
    // Étoile : or ; l'échelon se lit aux anneaux, comme les Sceaux (III : anneau, II : filet, I : filet et perles)
    etoile(e) {
      const c = '#e9b84f'
      return `${medaillon(c, { filet: e <= 2, perles: e === 1 })}<polygon points="${etoilePts(32, 28, 12, 5, 5)}" fill="${c}"/>${lettre(['', 'I', 'II', 'III'][e], c, 47, 9)}`
    },
    // Fondateur : la première pierre, posée
    fondateur() {
      const c = '#e08a4c'
      return `${medaillon(c, { filet: true })}<path d="M19 26l13-6 13 6v12l-13 6-13-6z" ${trait(c)}/><path d="M19 26l13 6 13-6M32 32v12" ${trait(c, 1.1)}/>`
    },
    // Siège au Conseil (Conseil d'Administration) : trois anneaux entrelacés, violet profond
    conseil() {
      const c = '#9b6fd6'
      return `${medaillon(c, { filet: true })}<g ${trait(c)}><circle cx="26.5" cy="27" r="7"/><circle cx="37.5" cy="27" r="7"/><circle cx="32" cy="36.5" r="7"/></g>`
    },
    // Gardien du feu : une flamme
    gardien() {
      const c = '#e2733c'
      return `${medaillon(c)}<path d="M32 15c4 6 9 9 9 17a9 9 0 0 1-18 0c0-4 2-7 4-9 0 3 1 5 3 6-1-5 0-9 2-14z" fill="${c}"/>`
    },
    // Formateur principal : un livre ouvert, jade
    formateur() {
      const c = '#44cf98'
      return `${medaillon(c, { filet: true })}<path d="M32 25c-4-2.5-8.5-3-12-2.5v15c3.5-.5 8 0 12 2.5 4-2.5 8.5-3 12-2.5v-15c-3.5-.5-8 0-12 2.5zM32 25v15" ${trait(c)}/>`
    },
    // Éclair noir : un éclair noir cerné de turquoise, l'anneau du MOS
    'eclair-noir'() {
      const c = '#2fc3b4'
      return `${medaillon(c)}<path d="M35 13l-11 21h8l-5 17 15-24h-9l6-14z" fill="#07080d" stroke="${c}" stroke-width="1.4" stroke-linejoin="round"/>`
    },
    // Référent de pôle : un écu à la couleur du pôle
    referent(o) {
      const c = (o && o.couleur) || '#e9b84f'
      return `${medaillon(c)}<path d="M32 16l12 4v10c0 8-5.5 13.5-12 17-6.5-3.5-12-9-12-17V20z" fill="${c}"/>`
    },
    // Ancienneté : un sablier ; cuivre, argent puis or
    anciennete(p) {
      const c = ['', '#e08a4c', '#c8cde2', '#e9b84f'][p]
      return `${medaillon(c, { filet: p >= 2, perles: p === 3 })}<path d="M24 17h16M24 45h16M26 17c0 8 12 8 12 14s-12 6-12 14M38 17c0 8-12 8-12 14s12 6 12 14" ${trait(c)}/>`
    },
    // Pilier : une colonne
    pilier() {
      const c = '#c8cde2'
      return `${medaillon(c)}<path d="M22 19h20M24 23h16M24 41h16M22 45h20M27 23v18M32 23v18M37 23v18" ${trait(c)}/>`
    },
    // Plume d'or
    plume() {
      const c = '#e9b84f'
      return `${medaillon(c, { filet: true })}<path d="M42 16c-10 3-16 11-18 21l-2 8 3-5c8-1 13-6 16-13-3 1-5 1-7 0 3-1 6-4 8-11z" fill="${c}"/>`
    },
    // Affilié : deux maillons de chaîne, bleu
    affilie() {
      const c = '#6fa8dc'
      return `${medaillon(c, { filet: true })}<g ${trait(c, 2)}><rect x="15" y="25" width="20" height="13" rx="6.5" transform="rotate(-30 25 31.5)"/><rect x="29" y="26" width="20" height="13" rx="6.5" transform="rotate(-30 39 32.5)"/></g>`
    },
    // Partenaire collaboratif : deux flèches qui tournent ensemble, vert sauge
    collaboratif() {
      const c = '#8fbf7a'
      return `${medaillon(c)}<path d="M20 28a12 12 0 0 1 21-6M44 36a12 12 0 0 1-21 6" ${trait(c, 2)}/><path d="M42 16v7h-7M22 48v-7h7" ${trait(c, 2)}/>`
    },
    // Artiste partenaire : un pinceau, rose poudré de la COM
    artiste() {
      const c = '#e39cc2'
      return `${medaillon(c)}<path d="M41 17L29 33" ${trait(c, 2.4)}/><path d="M29 33c-3-1-6 1-6 4 0 3-2 5-4 6 6 1 12-1 12-6 0-2-1-3-2-4z" fill="${c}"/>`
    },
  }

  function svg(idInsigne, o) {
    o = o || {}
    let corps
    const m = /^(etoile|anciennete)-(\d)$/.exec(idInsigne)
    if (m) corps = DESSINS[m[1]](+m[2])
    else if (DESSINS[idInsigne]) corps = DESSINS[idInsigne](o)
    else return ''
    return `<svg class="insigne-svg" viewBox="0 0 64 64" role="img" aria-hidden="true">${corps}</svg>`
  }
  window.ND_INSIGNES = { CATALOGUE, CATEGORIES, svg, infos: (id) => CATALOGUE.find((x) => x.id === id) }
})()
