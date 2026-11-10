/* ==========================================================================
   Wiki Nouvelle Destinée — version statique (V1)
   Aucun compte, aucune base de données, aucun tableau de bord.
   Le contenu vient de js/donnees.js ; ce fichier ne fait que l'afficher.
   Les classes CSS sont celles du wiki complet (css/charte.css et css/wiki.css).
   ========================================================================== */
;(function () {
  'use strict'

  const D = window.ND_DONNEES || { pages: {}, credits: [], panneau: [] }
  // Images intégrées (version « un seul fichier ») ; sinon le chemin normal
  const U = (chemin) => (window.ND_IMAGES && window.ND_IMAGES[chemin]) || chemin

  /* ---------------------------------------------------------------------- */
  /* Structure du wiki                                                       */
  /* ---------------------------------------------------------------------- */
  const I = (n) => 'img/illustrations/' + n
  const SECTIONS = [
    { id: 'accueil', titre: 'Accueil', icone: 'etoile', surTitre: 'La communauté', intro: 'La présentation du wiki, les actualités de la communauté, le règlement et notre Hub.',
      banniere: I('banniere-hcf'), credit: 'Tortipouss', rubriques: [
      { id: 'presentation', titre: 'Présentation', icone: 'oeil', surTitre: 'Le wiki', chapo: 'La page d’accueil et la façon dont le wiki est organisé.', visuel: I('bibliothecaire-lanterne'), creditVisuel: 'Hesterli' },
      { id: 'actus', titre: 'Actualités', icone: 'horloge', surTitre: 'Les news', tri: 'desc', chapo: 'Les nouvelles de la communauté et de la saga.', visuel: I('messager-hibou'), creditVisuel: 'Biohazardia' },
      { id: 'reglement', titre: 'Règlement', icone: 'balance', surTitre: 'À lire par tous', chapo: 'Les règles du wiki et de la communauté.', visuel: I('montagne-fendue'), creditVisuel: 'Scholastic' },
      { id: 'hub', titre: 'Notre Hub', icone: 'personnes', surTitre: 'La communauté', chapo: 'Le serveur Discord, nos réseaux et comment nous rejoindre.', visuel: I('mer-recif'), creditVisuel: 'FrostieGreen' },
      { id: 'legal', titre: 'Informations légales', icone: 'parchemin', surTitre: 'Mentions, CGU, confidentialité', chapo: 'Les mentions légales, les conditions d’utilisation, la politique de confidentialité et la gestion des cookies.', visuel: I('bibliotheque-glace-nuit'), creditVisuel: 'Lucithen' },
      { id: 'credits', titre: 'Crédits', icone: 'pinceau', surTitre: 'Les artistes du wiki', chapo: 'Les artistes dont les œuvres illustrent le wiki : qui ils sont, ce qu’ils ont fait, où les suivre.', special: 'credits' },
    ] },
    { id: 'lrdf', titre: 'C’est quoi LRDF ?', icone: 'oeil', surTitre: 'Pour commencer', intro: 'La saga dont tout part, pour qui n’en a jamais lu une ligne.',
      banniere: I('dragonnets'), credit: 'Alizebe', rubriques: [
      { id: 'origine', titre: 'Origine', icone: 'plume', surTitre: 'D’où ça vient', chapo: 'Qui a écrit la saga, comment elle est construite, et le chemin des livres de 2012 à aujourd’hui.', visuel: I('bibliotheque-glace-nuit'), creditVisuel: 'Lucithen' },
      { id: 'resume', titre: 'Résumé de l’univers', icone: 'carte', surTitre: 'Sans révélation majeure', chapo: 'Le monde, ses continents et ce que racontent les cycles, sans gâcher la lecture.', visuel: I('clan-ciel-nuages'), creditVisuel: 'Joy Ang' },
    ] },
    { id: 'bibliotheque', titre: 'Bibliothèque', icone: 'livre', surTitre: 'Les livres', intro: 'Les livres de la saga : les romans, les bandes dessinées, les Légendes et les nouvelles.',
      banniere: I('bibliotheque-glace-nuit'), credit: 'Lucithen', arbre: 'non', rubriques: [
      { id: 'tomes', titre: 'Les tomes', icone: 'livre', surTitre: 'Les romans, cycle par cycle', affichage: 'livres', arbre: 'non', groupes: ['Cycle 1', 'Cycle 2', 'Cycle 3', 'Cycle 4'],
        groupesInfo: { 'Cycle 1': 'Tomes 1 à 5 · La Prophétie des Dragonnets', 'Cycle 2': 'Tomes 6 à 10 · La Montagne de Jade', 'Cycle 3': 'Tomes 11 à 15 · Le Continent perdu', 'Cycle 4': 'Tome 16 · En cours' },
        chapo: 'Chaque livre, son point de départ et ce qu’il apporte au monde, sans révélation sur l’intrigue.' },
      { id: 'bd', titre: 'Les bandes dessinées', icone: 'etoile', surTitre: 'En images', affichage: 'livres', arbre: 'non', groupes: ['Adaptations des romans', 'Légendes'],
        groupesInfo: { 'Adaptations des romans': 'Scénario de Tui T. Sutherland · adaptation de Barry Deutsch · dessin de Mike Holmes', 'Légendes': 'Dessin de Jake Parker' },
        chapo: 'Les romans adaptés en bande dessinée, tome par tome.' },
      { id: 'hors-serie', titre: 'Hors-série', icone: 'parchemin', surTitre: 'Légendes et nouvelles', affichage: 'livres', arbre: 'non', groupes: ['Légendes', 'Winglets'],
        groupesInfo: { 'Légendes': 'Romans indépendants, hors des cycles', 'Winglets': 'Nouvelles sur des personnages secondaires' },
        chapo: 'Les Légendes, romans à part, et les Winglets, nouvelles qui suivent des personnages secondaires.' },
    ] },
    { id: 'contribuer', titre: 'Nous rejoindre', icone: 'plume', surTitre: 'L’équipe', intro: 'Nouvelle Destinée est animée par des bénévoles. Voici les postes ouverts et comment postuler.',
      banniere: I('canyon-nuit'), credit: 'Nightrizer', rubriques: [
      { id: 'recrutement', titre: 'Recrutement', icone: 'personnes', surTitre: 'Postes ouverts', chapo: 'Les postes ouverts dans chaque pôle, l’âge demandé et comment postuler.', visuel: I('envol-karst'), creditVisuel: 'Nightrizer' },
    ] },
  ]
  const RUBRIQUES = {}
  SECTIONS.forEach((s) => s.rubriques.forEach((r) => (RUBRIQUES[r.id] = Object.assign(r, { section: s }))))

  const TEINTES = ['lavande', 'mauve', 'ardoise', 'sauge', 'ambre', 'cuivre']
  const TEINTE_SECTION = { accueil: 'ambre', lrdf: 'lavande', bibliotheque: 'mauve', contribuer: 'sauge' }
  const teinteDe = (id) => `var(--t-${TEINTE_SECTION[id] || 'lavande'})`
  const teinteCarte = (i) => `var(--t-${TEINTES[i % TEINTES.length]})`
  const CLANS = { ciel: 'Ailes du Ciel', sable: 'Ailes de Sable', boue: 'Ailes de Boue', pluie: 'Ailes de Pluie', mer: 'Ailes de Mer', ailesnuit: 'Ailes de Nuit', glace: 'Ailes de Glace', feuille: 'Ailes de Feuille', soie: 'Ailes de Soie', guepe: 'Ailes de Guêpe', nymphe: 'Ailes de Nymphe' }
  const ROMAINS = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX']
  const DISCORD = 'https://discord.gg/nouvelledestinee'

  /* ---------------------------------------------------------------------- */
  /* Données                                                                 */
  /* ---------------------------------------------------------------------- */
  const PAGES = new Map(Object.entries(D.pages).map(([id, p]) => [id, Object.assign({ id }, p)]))
  const S = { ouvert: null, arbreOuvert: new Set(), rechercheInitiale: '' }

  /* ---------------------------------------------------------------------- */
  /* Utilitaires                                                             */
  /* ---------------------------------------------------------------------- */
  const $ = (sel, el) => (el || document).querySelector(sel)
  const $$ = (sel, el) => Array.from((el || document).querySelectorAll(sel))
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
  const ico = (nom, cls) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${cls ? ` class="${cls}"` : ''}>${(window.ICONES || {})[nom] || (window.ICONES || {}).parchemin || ''}</svg>`
  const slug = (s) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/œ/g, 'oe').replace(/æ/g, 'ae').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'page'
  const dateFr = (iso) => { try { return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) } catch (e) { return '' } }
  const pluriel = (n, mot, motPl) => `${n} ${n > 1 ? motPl || mot + 's' : mot}`
  const lienSur = (u) => (/^https?:\/\/[^\s"'<>]+$/i.test(String(u || '').trim()) ? String(u).trim() : '')
  const blason = (cle) => (CLANS[cle] ? U(`img/clans/${cle}.webp`) : null)
  const memoire = { lire: (k) => { try { return localStorage.getItem(k) } catch (e) { return null } }, ecrire: (k, v) => { try { localStorage.setItem(k, v) } catch (e) {} } }

  // Illustrations : chemin d'une image du site (img/illustrations/nom) ou fichier complet (img/actus/x.gif)
  const REMPLACEES = { plume: 'montagne-fendue', baignade: 'mer-recif', 'lecture-glace': 'bibliotheque-glace-nuit', 'bibliotheque-sable': 'bibliothecaire-lanterne', sablier: 'clan-ciel', 'fils-vision': 'clan-nuit', taverne: 'canyon-nuit', 'soleil-rouge': 'clan-ciel-nuages', magnolias: 'clan-pluie' }
  const remplacee = (v) => { const m = /^img\/illustrations\/(.+)$/.exec(v || ''); return m && REMPLACEES[m[1]] ? I(REMPLACEES[m[1]]) : v }
  const imgSrc = (v, l) => (!v ? null : /\.(gif|png|jpe?g|webp)$/i.test(v) ? U(v) : U(`${remplacee(v)}-${l || 1600}.webp`))
  const absolue = (u) => (/^data:/.test(u) ? u : new URL(u, document.baseURI).href)
  const ILLUSTRATIONS = [
    [I('banniere-hcf'), 'Bannière HCF (falaise et soleil)', 'left 30%'], [I('dragonnets'), 'Les dragonnets'], [I('envol-karst'), 'Envol au-dessus des pitons'],
    [I('canyon-nuit'), 'Ailes étoilées sur le canyon'], [I('royaume-nuit'), 'Le couple royal et le palais'], [I('messager-hibou'), 'Le messager au hibou'],
    [I('bibliotheque-glace-nuit'), 'Leçon à la bibliothèque'], [I('bibliothecaire-lanterne'), 'La bibliothécaire à la lanterne', 'center 15%'],
    [I('clan-ciel-nuages'), 'Péril et Scarlet dans les nuages (tome 8)'], [I('montagne-fendue'), 'La Montagne de Jade (bande-annonce)'],
    [I('mer-recif'), 'Le récif', 'center 18%'], [I('tendresse-ciel'), 'Le parent et le dragonnet', 'center 18%'],
    [I('feuille-portrait'), 'Dans les sous-bois', 'center 20%'], [I('sable-tendresse'), 'Tendresse dans les sables', 'center 12%'],
  ].map(([id, nom, pos]) => ({ id, nom, pos }))
  const posImg = (v) => { v = remplacee(v); const x = ILLUSTRATIONS.find((i) => i.id === v); return (x && x.pos) || '50% 50%' }
  const posDe = (v) => (v ? `; --pos: ${posImg(v)}` : '')
  const opos = (v) => (v ? ` style="object-position: ${posImg(v)}"` : '')

  /* ---------------------------------------------------------------------- */
  /* Crédits des artistes                                                    */
  /* ---------------------------------------------------------------------- */
  const VERIFS = {
    signature: ['Signé sur l’œuvre', 'Le nom de l’artiste est lisible sur l’illustration.'],
    retrouvee: ['Œuvre retrouvée', 'L’œuvre est publiée sur le profil de l’artiste.'],
    equipe: ['Indiqué par l’ETHER', 'Information donnée par la Direction du wiki.'],
    officiel: ['Œuvre officielle', 'Crédit des éditions officielles de la saga.'],
    'a-confirmer': ['À confirmer', 'Piste sérieuse, pas encore confirmée par l’artiste.'],
  }
  const OEUVRES_SPECIALES = {
    logo: { nom: 'Logo de Nouvelle Destinée', src: 'img/logo.png' },
    couvertures: { nom: 'Couvertures des romans', src: 'img/couvertures/tome-1.webp' },
    'couvertures-bd': { nom: 'Bandes dessinées', src: 'img/couvertures/bd-1.webp' },
    blasons: { nom: 'Blasons des clans en vitrail', src: 'img/clans/ciel.webp' },
  }
  const contributeurs = () => (D.credits || []).filter((c) => c.visible !== false).slice().sort((a, b) => (a.ordre || 0) - (b.ordre || 0) || String(a.nom).localeCompare(b.nom, 'fr'))
  const cleOeuvre = (v) => String(v || '').replace(/^img\/illustrations\//, '')
  const auteurDe = (oid) => contributeurs().find((k) => (k.oeuvres || []).includes(cleOeuvre(oid)))
  const nomCredit = (c) => { const t = String(c || '').trim(); if (!t) return ''; const x = contributeurs().find((k) => k.nom === t || (k.alias || []).includes(t)); return x ? x.nom : t }
  const srcOeuvre = (oid) => { const k = cleOeuvre(oid); if (OEUVRES_SPECIALES[k]) return U(OEUVRES_SPECIALES[k].src); return ILLUSTRATIONS.some((i) => i.id === I(k)) ? imgSrc(I(k), 800) : '' }
  const nomOeuvre = (oid) => { const k = cleOeuvre(oid); if (OEUVRES_SPECIALES[k]) return OEUVRES_SPECIALES[k].nom; const i = ILLUSTRATIONS.find((x) => x.id === I(k)); return i ? i.nom : k }
  const nomAuteur = (img, c) => { const a = img && /^img\/illustrations\//.test(img) ? auteurDe(remplacee(img)) : null; return a ? a.nom : c ? nomCredit(c) : '' }
  const credit = (c, img) => { const n = nomAuteur(img, c); return n ? `<a class="credit-illu" href="#r-credits" title="Voir les crédits">Illustration : ${esc(n)}</a>` : '' }
  // Illustrations affichées sur le site dont l'artiste n'est pas encore identifié
  function imagesUtilisees() {
    const v = new Set()
    SECTIONS.forEach((s) => { v.add(s.banniere); s.rubriques.forEach((r) => r.visuel && v.add(remplacee(r.visuel))) })
    v.add(D.accueil && D.accueil.banniere)
    PAGES.forEach((p) => ['banniere', 'visuel'].forEach((k) => p[k] && /^img\/illustrations\//.test(p[k]) && v.add(remplacee(p[k]))))
    return Array.from(v).filter(Boolean)
  }
  const aIdentifier = () => imagesUtilisees().map(cleOeuvre).filter((k) => !auteurDe(k))

  /* ---------------------------------------------------------------------- */
  /* Rendu du texte (format maison proche du Markdown)                       */
  /* ---------------------------------------------------------------------- */
  function enLigne(s) {
    const codes = []
    s = s.replace(/`([^`]+)`/g, (m, c) => { codes.push(c); return `\u0000${codes.length - 1}\u0000` })
    // [[id|texte]] : lien vers une page du wiki ; si la page n'est pas dans cette version, le texte reste sans lien
    s = s.replace(/\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g, (m, id, txt) => {
      const p = PAGES.get(id)
      const libelle = txt || (p ? p.titre : id)
      return p ? `<a href="${lienPage(id)}">${libelle}</a>` : libelle
    })
    s = s.replace(/\[([^\]]+)\]\((#[a-z0-9-]+|https?:\/\/[^\s)]+)\)/g, (m, txt, url) => `<a href="${url}"${url[0] !== '#' ? ' rel="noopener" target="_blank"' : ''}>${txt}</a>`)
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    s = s.replace(/(^|[^*])\*([^*\s][^*]*?)\*(?!\*)/g, '$1<em>$2</em>')
    s = s.replace(/\u0000(\d+)\u0000/g, (m, i) => `<code>${codes[+i]}</code>`)
    return s
  }
  function cellules(ligne) {
    const out = []
    let cur = '', dans = 0, code = false
    const t = ligne.trim().replace(/^\|/, '').replace(/\|$/, '')
    for (let i = 0; i < t.length; i++) {
      const c = t[i]
      if (c === '`') code = !code
      if (!code && t.startsWith('[[', i)) dans++
      if (!code && t.startsWith(']]', i) && dans) dans--
      if (c === '|' && !dans && !code) { out.push(cur.trim()); cur = '' } else cur += c
    }
    out.push(cur.trim())
    return out
  }
  function rendreTexte(src, opts) {
    opts = opts || {}
    const lignes = String(src || '').replace(/\r/g, '').split('\n')
    const toc = []
    const ids = new Set()
    const ancre = (t) => { let b = 'h-' + slug(t), id = b, n = 2; while (ids.has(id)) id = b + '-' + n++; ids.add(id); return id }
    let i = 0, premierPara = true, nbH2 = 0
    function bloc(fin) {
      const out = []
      while (i < lignes.length) {
        const l = lignes[i]
        if (fin && l.trim() === ':::') { i++; return out.join('') }
        if (!l.trim()) { i++; continue }
        let m
        if ((m = l.match(/^:::(encadre|retenir|sanction|info|spoiler)\s*(.*)$/))) {
          i++
          const interieur = bloc(true)
          const SPECIAUX = { retenir: ['coche', 'À retenir'], sanction: ['balance', 'Sanction'], info: ['oeil', 'Bon à savoir'] }
          if (SPECIAUX[m[1]]) out.push(`<aside class="bloc-encadre e-gravure encadre-${m[1]}"><strong>${ico(SPECIAUX[m[1]][0])} ${enLigne(esc(m[2] || SPECIAUX[m[1]][1]))}</strong>${interieur}</aside>`)
          else if (m[1] === 'encadre') out.push(`<aside class="bloc-encadre e-gravure">${m[2] ? `<strong>${enLigne(esc(m[2]))}</strong>` : ''}${interieur}</aside>`)
          // m[1] === 'spoiler' : cette version ne publie aucun passage qui dévoile l'intrigue
          continue
        }
        if ((m = l.match(/^(#{1,4})\s+(.+)$/))) {
          const niv = Math.max(2, m[1].length)
          let t = m[2].trim()
          if (niv === 2 && opts.numerote && !fin) { nbH2++; t = `${ROMAINS[nbH2] || nbH2}. ${t}` }
          const id = ancre(t)
          if (niv === 4) { out.push(`<h4 id="${id}">${enLigne(esc(t))}</h4>`); i++; continue }
          if (!fin) toc.push({ niv, t, id })
          out.push(`<h${niv} id="${id}">${enLigne(esc(t))}</h${niv}>`)
          i++
          continue
        }
        if (/^-{3,}\s*$/.test(l)) { out.push('<hr>'); i++; continue }
        if (/^\s*\|/.test(l)) {
          const rangs = []
          while (i < lignes.length && /^\s*\|/.test(lignes[i])) rangs.push(lignes[i++])
          const tete = cellules(rangs[0])
          const corps = rangs.slice(1).filter((r) => !/^\s*\|?\s*:?-{2,}/.test(r))
          out.push(`<div class="tableau-defile"><table><thead><tr>${tete.map((c) => `<th>${enLigne(esc(c))}</th>`).join('')}</tr></thead><tbody>${corps.map((r) => `<tr>${cellules(r).map((c) => `<td>${enLigne(esc(c))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`)
          continue
        }
        if (/^\s*[-*]\s+/.test(l)) {
          const items = []
          while (i < lignes.length && /^\s*[-*]\s+/.test(lignes[i])) items.push(lignes[i++].replace(/^\s*[-*]\s+/, ''))
          out.push(`<ul>${items.map((t) => `<li>${enLigne(esc(t))}</li>`).join('')}</ul>`)
          continue
        }
        if (/^\s*\d+[.)]\s+/.test(l)) {
          const items = []
          while (i < lignes.length && /^\s*\d+[.)]\s+/.test(lignes[i])) items.push(lignes[i++].replace(/^\s*\d+[.)]\s+/, ''))
          out.push(`<ol>${items.map((t) => `<li>${enLigne(esc(t))}</li>`).join('')}</ol>`)
          continue
        }
        if (/^>\s?/.test(l)) {
          const items = []
          while (i < lignes.length && /^>\s?/.test(lignes[i])) items.push(lignes[i++].replace(/^>\s?/, ''))
          out.push(`<blockquote class="bloc-citation"><p>${enLigne(esc(items.join(' ')))}</p></blockquote>`)
          continue
        }
        const para = []
        while (i < lignes.length && lignes[i].trim() && !/^(#{1,4}\s|::|\s*\||\s*[-*]\s+|\s*\d+[.)]\s+|>|-{3,}\s*$)/.test(lignes[i])) para.push(lignes[i++].trim())
        if (!para.length) { out.push(`<p>${enLigne(esc(l))}</p>`); i++; continue }
        const p = `<p>${enLigne(esc(para.join(' ')))}</p>`
        if (!fin && premierPara && opts.lettrine) { out.push(`<div class="lettrine">${p}</div>`); premierPara = false } else { out.push(p); if (!fin) premierPara = false }
      }
      return out.join('')
    }
    return { html: bloc(false), toc }
  }
  const texteBrut = (src) => String(src || '').replace(/:::\w*[^\n]*/g, ' ').replace(/\[\[[a-z0-9-]+\|([^\]]+)\]\]/g, '$1').replace(/[#*>|`[\]]/g, ' ').replace(/\s+/g, ' ').trim()

  /* ---------------------------------------------------------------------- */
  /* Liens, pages, rubriques                                                 */
  /* ---------------------------------------------------------------------- */
  const lienPage = (id) => (id === 'accueil' ? '#accueil' : '#p-' + id)
  function pagesDe(rubrique) {
    const sens = RUBRIQUES[rubrique] && RUBRIQUES[rubrique].tri === 'desc' ? -1 : 1
    return Array.from(PAGES.values()).filter((p) => p.rubrique === rubrique).sort((a, b) => sens * ((a.ordre || 0) - (b.ordre || 0)) || String(a.titre).localeCompare(b.titre, 'fr'))
  }
  const lienRub = (rid) => { if (RUBRIQUES[rid] && RUBRIQUES[rid].special) return '#r-' + rid; const ps = pagesDe(rid); return ps.length === 1 ? '#p-' + ps[0].id : '#r-' + rid }
  const compterRubrique = (id) => (RUBRIQUES[id] && RUBRIQUES[id].special === 'credits' ? contributeurs().length : pagesDe(id).length)
  function grouper(pages, rub) {
    const ordre = (rub && rub.groupes) || []
    const g = new Map()
    pages.forEach((p) => { const k = p.groupe || ''; if (!g.has(k)) g.set(k, []); g.get(k).push(p) })
    return Array.from(g.entries()).sort((a, b) => {
      if (a[0] === '') return 1
      if (b[0] === '') return -1
      const ia = ordre.indexOf(a[0]), ib = ordre.indexOf(b[0])
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a[0].localeCompare(b[0], 'fr')
    })
  }
  function ariane(items) {
    items = items.filter((it) => it.t && it.h !== '#s-accueil')
    return `<ol class="ariane"><li><a href="#accueil">Accueil</a></li>${items.map((it, i) => (i === items.length - 1 ? `<li aria-current="page">${esc(it.t)}</li>` : `<li><a href="${it.h}">${esc(it.t)}</a></li>`)).join('')}</ol>`
  }

  /* ---------------------------------------------------------------------- */
  /* Routage                                                                 */
  /* ---------------------------------------------------------------------- */
  function routeCourante() {
    const h = decodeURIComponent((location.hash || '').slice(1))
    if (!h || h === 'accueil') return { vue: 'accueil' }
    if (h === 'recherche') return { vue: 'recherche' }
    let m
    if ((m = h.match(/^s-([a-z0-9-]+)$/))) return { vue: 'section', id: m[1] }
    if ((m = h.match(/^r-([a-z0-9-]+)$/))) return { vue: 'rubrique', id: m[1] }
    if ((m = h.match(/^p-([a-z0-9-]+)$/))) return { vue: 'page', id: m[1] }
    if (/^h-/.test(h)) return { vue: 'ancre' }
    return { vue: 'introuvable' }
  }
  function sectionCourante() {
    const r = routeCourante()
    if (r.vue === 'section') return r.id
    if (r.vue === 'rubrique') return RUBRIQUES[r.id] && RUBRIQUES[r.id].section.id
    if (r.vue === 'page') { const p = PAGES.get(r.id); return p && RUBRIQUES[p.rubrique] && RUBRIQUES[p.rubrique].section.id }
    if (r.vue === 'accueil') return 'accueil'
    return null
  }

  /* ---------------------------------------------------------------------- */
  /* En-tête et pied de page                                                 */
  /* ---------------------------------------------------------------------- */
  function rendreCadre() {
    const actuelle = sectionCourante()
    const theme = document.documentElement.dataset.theme
    $('#entete').innerHTML = `
      <div class="conteneur entete-ligne">
        <a class="marque" href="#accueil" aria-label="Accueil Nouvelle Destinée"><img src="${U('img/logo-petit.png')}" alt="" width="46" height="32"><span class="marque-texte"><small>HCF</small><span>Nouvelle Destinée</span></span></a>
        <button class="outil burger" aria-label="Menu" aria-expanded="${S.ouvert === 'mobile'}" data-action="burger">${ico('menu')}</button>
        <nav class="nav-principale${S.ouvert === 'mobile' ? ' ouverte' : ''}" aria-label="Rubriques">
          ${SECTIONS.map((s) => `
            <div class="nav-item">
              <button class="nav-bouton" aria-expanded="${S.ouvert === s.id || S.ouvert === 'mobile'}" data-menu="${s.id}"${actuelle === s.id ? ' aria-current="true"' : ''}>${ico(s.icone)}${esc(s.titre)}${ico('chevron', 'chevron')}</button>
              ${S.ouvert === s.id || S.ouvert === 'mobile' ? `<div class="mega" role="menu">
                <a class="mega-tete avec-image" href="#s-${s.id}" role="menuitem" style="--img: url('${absolue(imgSrc(s.banniere, 800))}')${posDe(s.banniere)}"><span class="mega-tete-texte"><small>${ico(s.icone)} La partie</small><strong>${esc(s.titre)}</strong><span class="mega-intro">${esc(s.intro)}</span><span class="mega-voir">Vue d’ensemble ${ico('fleche')}</span></span></a>
                <div class="mega-sep">Les rubriques</div>
                ${s.rubriques.map((r) => `<a href="${lienRub(r.id)}" role="menuitem"><span class="ico-tuile">${ico(r.icone)}</span><span><strong>${esc(r.titre)}</strong><small>${esc(r.surTitre || '')}</small></span><span class="compteur">${compterRubrique(r.id)}</span></a>`).join('')}
              </div>` : ''}
            </div>`).join('')}
        </nav>
        <div class="outils">
          <a class="outil" href="#recherche" aria-label="Rechercher" title="Rechercher">${ico('loupe')}</a>
          <button class="outil" data-action="theme" aria-label="${theme === 'sombre' ? 'Passer au thème clair' : 'Passer au thème sombre'}" title="Changer de thème">${ico(theme === 'sombre' ? 'lune' : 'soleil')}</button>
          <a class="btn-mini btn-compte" href="${DISCORD}" target="_blank" rel="noopener">${ico('personnes')} Rejoindre le Discord</a>
        </div>
      </div>`
    $('#pied').innerHTML = `
      <div class="conteneur">
        <div class="pied-haut"><img src="${U('img/logo-petit.png')}" alt="" width="80" height="56"><div><strong>HCF Nouvelle Destinée</strong><em>L’univers des Royaumes de Feu, prolongé par ses lecteurs.</em></div></div>
        <div class="pied-colonnes">
          ${SECTIONS.map((s) => `<div><h2>${ico(s.icone)} ${esc(s.titre)}</h2><ul>${s.rubriques.map((r) => `<li><a href="${lienRub(r.id)}">${esc(r.titre)} <span class="compteur">${compterRubrique(r.id)}</span></a></li>`).join('')}</ul></div>`).join('')}
        </div>
        <p class="pied-mentions">Projet de fans, sans but lucratif. <em>Les Royaumes de Feu</em> (<em>Wings of Fire</em>) sont l’œuvre de Tui T. Sutherland ; la communauté n’est affiliée ni à l’autrice ni à ses éditeurs. Les clans, personnages et récits cités appartiennent à leurs auteurs ; les couvertures reproduites restent la propriété de leurs ayants droit.</p>
        <nav class="pied-legal" aria-label="Informations légales">
          <a href="#p-mentions-legales">Mentions légales</a><a href="#p-cgu">Conditions générales d’utilisation</a><a href="#p-confidentialite">Politique de confidentialité</a><a href="#r-credits">Crédits</a>
        </nav>
        <div class="pied-bas"><span>© 2026 HCF Nouvelle Destinée</span><span>Projet associatif</span><span>${pluriel(PAGES.size, 'page publiée', 'pages publiées')}</span></div>
      </div>`
  }

  /* ---------------------------------------------------------------------- */
  /* Arbres de navigation                                                    */
  /* ---------------------------------------------------------------------- */
  const avecArbre = (x, section) => { const a = x.arbre || (section ? section.arbre : 'oui') || 'oui'; return a !== 'non' }
  function brancheRub(r, rubActive, pageActive) {
    const ps = r.special ? [] : pagesDe(r.id)
    const actif = r.id === rubActive
    if (ps.length <= 1) return `<li class="arbre-rub seule${actif ? ' actif' : ''}"><a href="${lienRub(r.id)}"${actif && (!pageActive || ps.length === 1) ? ' aria-current="page"' : ''}>${ico(r.icone)}<span>${esc(r.titre)}</span></a></li>`
    const ouvert = actif || S.arbreOuvert.has(r.id)
    const groupes = grouper(ps, r)
    const lignes = groupes.map(([g, gp]) => `${g && groupes.length > 1 ? `<li class="arbre-groupe">${esc(g)}</li>` : ''}${gp.map((x) => `<li><a href="#p-${x.id}"${x.id === pageActive ? ' aria-current="page"' : ''}>${esc(x.titre)}</a></li>`).join('')}`).join('')
    return `<li class="arbre-rub${actif ? ' actif' : ''}"><details data-arbre="${r.id}"${ouvert ? ' open' : ''}><summary><a href="#r-${r.id}"${actif && !pageActive ? ' aria-current="page"' : ''}>${ico(r.icone)}<span>${esc(r.titre)}</span></a><span class="compteur">${ps.length}</span><span class="chevron" aria-hidden="true"></span></summary><ul>${lignes}</ul></details></li>`
  }
  function arbreSection(section, rubActive, pageActive) {
    return `<details class="arbre-boite" data-arbre-boite${window.innerWidth > 1080 ? ' open' : ''}><summary class="arbre-mobile">${ico('liste')} Dans « ${esc(section.titre)} »</summary>
      <nav class="arbre" aria-label="Pages de ${esc(section.titre)}">
        <a class="arbre-racine" href="#s-${section.id}"${!rubActive ? ' aria-current="page"' : ''}>${ico(section.icone)}<strong>${esc(section.titre)}</strong></a>
        <ul>${section.rubriques.map((r) => brancheRub(r, rubActive, pageActive)).join('')}</ul>
      </nav></details>`
  }
  function arbreWiki() {
    return `<details class="arbre-boite" data-arbre-boite${window.innerWidth > 1080 ? ' open' : ''}><summary class="arbre-mobile">${ico('liste')} Parcourir le wiki</summary>
      <nav class="arbre arbre-wiki" aria-label="Tout le wiki">
        <div class="arbre-racine"><strong>Parcourir le wiki</strong></div>
        <ul>${SECTIONS.map((sc) => {
          const ouvert = sc.id === 'accueil' ? !S.arbreOuvert.has('!s-accueil') : S.arbreOuvert.has('s-' + sc.id)
          return `<li class="arbre-partie"><details data-arbre="s-${sc.id}"${ouvert ? ' open' : ''}><summary><a href="#s-${sc.id}">${ico(sc.icone)}<span>${esc(sc.titre)}</span></a><span class="chevron" aria-hidden="true"></span></summary>
            <ul>${sc.rubriques.map((r) => brancheRub(r, null, null)).join('')}</ul></details></li>`
        }).join('')}</ul>
      </nav></details>`
  }
  function sousNav(section, actif) {
    return `<nav class="sous-nav" aria-label="Sections : ${esc(section.titre)}"><div class="conteneur">
      <a class="racine" href="#s-${section.id}"${actif === null ? ' aria-current="page"' : ''}>${ico(section.icone)} ${esc(section.titre)}</a>
      ${section.rubriques.map((r) => `<a href="#r-${r.id}"${actif === r.id ? ' aria-current="page"' : ''}>${ico(r.icone)} ${esc(r.titre)}<span class="compteur">${compterRubrique(r.id)}</span></a>`).join('')}
    </div></nav>`
  }

  /* ---------------------------------------------------------------------- */
  /* Livres : couvertures et fiches                                          */
  /* ---------------------------------------------------------------------- */
  const srcCouv = (p) => (p.type === 'tome' ? U(`img/couvertures/${p.id}.webp`) : null)
  function couverture(p) {
    const num = p.tome && p.tome.numero
    const libNum = typeof num === 'number' ? `Tome ${ROMAINS[num] || num}` : num === 'L1' || num === 'L2' ? 'Légende' : num === 'HS' ? 'Hors-série' : ''
    const b = blason(p.clan)
    const dessin = `<div class="livre-dessin"><span class="livre-cadre"></span><span class="livre-num">${esc(libNum)}</span>
        ${b ? `<img class="livre-blason" src="${b}" alt="">` : `<span class="livre-blason sans-blason">${ico('livre')}</span>`}
        <span class="livre-titre">${esc(p.titre)}</span><span class="livre-auteur">Tui T. Sutherland</span></div>`
    const src = srcCouv(p)
    return `<div class="livre" style="--teinte: ${p.clan ? `var(--${p.clan}-vitrail)` : 'var(--or)'}">
      <span class="livre-pages"></span>
      <div class="livre-couv">${src ? `<img class="photo" src="${src}" alt="Couverture : ${esc(p.titre)}" loading="lazy">` : dessin}</div>
    </div>`
  }
  /* Fiches des éditions françaises (Gallimard Jeunesse) : ISBN, pages, date, lien officiel */
  const GALLIMARD = 'https://www.gallimard-jeunesse.fr/'
  const LIVRES = {
    'tome-1': ['9782070661831', 400, '8 janvier 2015', 'les-royaumes-de-feu-1'], 'tome-2': ['9782070661848', 384, '8 janvier 2015', 'les-royaumes-de-feu-2'],
    'tome-3': ['9782070661855', 416, '3 septembre 2015', 'les-royaumes-de-feu-3'], 'tome-4': ['9782070661862', 400, '7 janvier 2016', 'les-royaumes-de-feu-4'],
    'tome-5': ['9782070661879', 432, '8 septembre 2016', 'les-royaumes-de-feu-5'], 'tome-6': ['9782075077170', 400, '2 février 2017', 'les-royaumes-de-feu-6'],
    'tome-7': ['9782075083027', 384, '14 septembre 2017', 'les-royaumes-de-feu-7'], 'tome-8': ['9782075083072', 368, '5 avril 2018', 'les-royaumes-de-feu-8'],
    'tome-9': ['9782075093569', 379, '6 septembre 2018', 'les-royaumes-de-feu-9'], 'tome-10': ['9782075117036', 528, '23 mai 2019', 'les-royaumes-de-feu-10'],
    'tome-11': ['9782075130349', 400, '3 janvier 2020', 'les-royaumes-de-feu-11'], 'tome-12': ['9782075139335', 352, '3 septembre 2020', 'les-royaumes-de-feu-12'],
    'tome-13': ['9782075150460', 368, '1er avril 2021', 'les-royaumes-de-feu-13'], 'tome-14': ['9782075156080', 400, '3 février 2022', 'les-royaumes-de-feu-14'],
    'tome-15': ['9782075174404', 448, '2 février 2023', 'les-royaumes-de-feu-15'], 'tome-16': ['9782075244282', 432, '15 octobre 2026', 'les-royaumes-de-feu-16'],
    'bd-1': ['9782075132404', 224, '5 septembre 2019', 'les-royaumes-de-feu-1'], 'bd-2': ['9782075132459', 224, '5 septembre 2019', 'les-royaumes-de-feu-2'],
    'bd-3': ['9782075138970', 224, '18 juin 2020', 'les-royaumes-de-feu-3'], 'bd-4': ['9782075152549', 224, '3 juin 2021', 'les-royaumes-de-feu-4'],
    'bd-5': ['9782075165808', 224, '26 mai 2022', 'les-royaumes-de-feu-5'], 'bd-6': ['9782075185073', 224, '15 juin 2023', 'les-royaumes-de-feu-6'],
    'bd-7': ['9782075204453', 224, '13 juin 2024', 'les-royaumes-de-feu-7'], 'bd-8': ['9782075221061', 224, '5 juin 2025', 'les-royaumes-de-feu-8'],
    'bd-9': ['9782075237857', 240, '7 mai 2026', 'les-royaumes-de-feu-9'], 'bd-spectral': ['9782075236270', 256, '27 août 2026', 'les-royaumes-de-feu-en-bande-dessinee-spectral'],
    spectral: ['9782075130394', 464, '6 octobre 2022', 'les-royaumes-de-feu-legendes'], 'tueurs-de-dragons': ['9782075174350', 560, '8 février 2024', 'les-royaumes-de-feu-legendes-tueurs-de-dragons'],
    destinees: ['9782075219686', 240, '27 février 2025', 'les-royaumes-de-feu-destinees'],
  }
  const DANS_RECUEIL = { 'winglet-prisonniers': 'destinees', 'winglet-assassin': 'destinees', 'winglet-deserteur': 'destinees', 'winglet-fuyard': 'destinees' }
  const CYCLES = { 'Cycle 1': 'Cycle 1, tomes 1 à 5', 'Cycle 2': 'Cycle 2, tomes 6 à 10', 'Cycle 3': 'Cycle 3, tomes 11 à 15', 'Cycle 4': 'Cycle 4, à partir du tome 16' }
  const isbnLisible = (s) => (/^97[89]207\d{7}$/.test(s) ? `${s.slice(0, 3)}-${s[3]}-${s.slice(4, 6)}-${s.slice(6, 12)}-${s[12]}` : s)
  function lienGallimard(p) {
    const id = p && (LIVRES[p.id] ? p.id : DANS_RECUEIL[p.id])
    const f = id && LIVRES[id]
    if (!f) return null
    return { url: `${GALLIMARD}${f[0]}/${f[3]}.html`, recueil: id !== p.id ? PAGES.get(id) || { titre: 'Destinées' } : null }
  }
  function cartoucheLivre(p) {
    const brut = (p.cartouche || []).filter((c) => c && (c.k || c.v))
    const f = p.type === 'tome' && LIVRES[p.id]
    if (!f) return brut
    const val = (k) => ((brut.find((c) => c.k === k) || {}).v || '').trim()
    const pris = ['Titre original', 'Parution originale', 'Parution (États-Unis)', 'Parution française', 'Édition française', 'Éditeur', 'Traduction', 'Pages', 'ISBN', 'Cycle', 'Narration', 'Narrateur']
    const annee = (val('Parution (États-Unis)').match(/\d{4}/) || [])[0]
    const us = val('Parution originale') || (annee ? `${annee}, Scholastic` : '')
    const cycle = val('Cycle')
    const narr = (val('Narrateur') || val('Narration')).replace(/\s*\(([^)]+)\)\s*$/, ', $1')
    return [
      { k: 'Titre original', v: val('Titre original') }, { k: 'Parution originale', v: us },
      { k: 'Édition française', v: `Gallimard Jeunesse, ${f[2]}` }, { k: 'Traduction', v: val('Traduction') || 'Vanessa Rubio-Barreau' },
      { k: 'Pages', v: `${f[1]} pages` }, { k: 'ISBN', v: isbnLisible(f[0]) }, { k: 'Cycle', v: CYCLES[cycle] || cycle }, { k: 'Narrateur', v: narr },
    ].concat(brut.filter((c) => !pris.includes(c.k))).filter((c) => c.v)
  }
  const titreLivre = (p) => (p.tome && typeof p.tome.numero === 'number' ? `${p.rubrique === 'bd' ? 'BD' : 'Tome'} ${p.tome.numero}. ${p.titre}` : p.titre)
  function carteLivre(p) {
    const orig = (p.cartouche || []).find((c) => c.k === 'Titre original')
    return `<a class="livre-lien" href="#p-${p.id}">${couverture(p)}<span class="genre">${esc(p.genre || 'Roman')}</span><h3>${esc(titreLivre(p))}</h3>${orig ? `<em>${esc(orig.v)}</em>` : ''}</a>`
  }

  /* ---------------------------------------------------------------------- */
  /* Visuels des cartes                                                      */
  /* ---------------------------------------------------------------------- */
  const NOMS_CLANS = { ciel: /Ailes? du Ciel/g, sable: /Ailes? de Sable/g, boue: /Ailes? de Boue/g, pluie: /Ailes? de Pluie/g, mer: /Ailes? de Mer/g, ailesnuit: /Ailes? de Nuit/g, glace: /Ailes? de Glace/g, feuille: /Ailes? de Feuille/g, soie: /Ailes? de Soie/g, guepe: /Ailes? de Guêpe/g, nymphe: /Ailes? de Nymphe/g }
  function clansCites(p, max) {
    const txt = [p.titre, p.chapo, p.corps].join(' ')
    return Object.entries(NOMS_CLANS).map(([k, re]) => [k, (txt.match(re) || []).length]).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]).slice(0, max || 3).map(([k]) => k)
  }
  function visuelDe(p) {
    if (p.banniere) return { type: 'image', src: imgSrc(p.banniere, 800), pos: posImg(p.banniere) }
    if (p.type === 'tome' && srcCouv(p)) return { type: 'couv', src: srcCouv(p) }
    if (p.clan && blason(p.clan)) return { type: 'blasons', clans: [p.clan] }
    const c = clansCites(p, 3)
    return c.length ? { type: 'blasons', clans: c } : null
  }
  const pileBlasons = (clans, cls) => `<span class="pile-blasons ${cls || ''} n${clans.length}">${clans.map((k) => `<img src="${blason(k)}" alt="" loading="lazy">`).join('')}</span>`
  function bandeau(v, icone) {
    if (!v) return `<span class="bandeau-carte ecailles">${ico(icone)}</span>`
    if (v.type === 'image') return `<span class="image-carte" style="background-image:url('${v.src}'); background-position: ${v.pos || '50% 50%'}"></span>`
    if (v.type === 'couv') return `<span class="bandeau-carte visuel-couv"><img src="${v.src}" alt="" loading="lazy"></span>`
    if (v.type === 'couvs') return `<span class="bandeau-carte visuel-couvs">${v.srcs.map((x) => `<img src="${x}" alt="" loading="lazy">`).join('')}</span>`
    return `<span class="bandeau-carte visuel-blasons">${pileBlasons(v.clans)}</span>`
  }
  function visuelsRubrique(rid) {
    const ps = pagesDe(rid)
    const couvs = ps.map((p) => (p.type === 'tome' ? srcCouv(p) : null)).filter(Boolean)
    if (couvs.length) return { type: 'couvs', srcs: couvs.slice(0, 3) }
    const clans = []
    ps.forEach((p) => (p.clan ? [p.clan] : clansCites(p, 2)).forEach((k) => { if (!clans.includes(k)) clans.push(k) }))
    if (clans.length) return { type: 'blasons', clans: clans.slice(0, 3) }
    const avecBan = ps.find((p) => p.banniere)
    return avecBan ? { type: 'image', src: imgSrc(avecBan.banniere, 800), pos: posImg(avecBan.banniere) } : null
  }
  function heroVisuel(v, icone) {
    if (!v) return `<div class="hero-ico">${ico(icone)}</div>`
    if (v.type === 'image') return `<div class="hero-carte"><img src="${v.src}" alt="" style="object-position: ${v.pos || '50% 50%'}"></div>`
    if (v.type === 'couvs') return `<div class="hero-eventail">${v.srcs.map((x) => `<img src="${x}" alt="">`).join('')}</div>`
    if (v.type === 'blasons') return `<div class="hero-blasons">${pileBlasons(v.clans, 'grande')}</div>`
    return `<div class="hero-ico">${ico(icone)}</div>`
  }
  function heroIntro(banniere, creditBan) {
    if (!banniere) return null
    return { cls: ' hero-illu dispo-droite', style: ` style="--banniere: url('${absolue(imgSrc(banniere))}')${posDe(banniere)}"`, credit: credit(creditBan, banniere) }
  }
  function carteArticle(p, i) {
    const rub = RUBRIQUES[p.rubrique]
    return `<a class="carte teintee" href="${lienPage(p.id)}" style="--t: ${teinteCarte(i || 0)}">
      ${bandeau(visuelDe(p), p.icone || (rub ? rub.icone : 'parchemin'))}
      ${p.surTitre ? `<span class="surtitre">${esc(p.surTitre)}</span>` : ''}
      <h3>${esc(p.titre)}</h3>
      ${p.chapo ? `<p>${esc(p.chapo)}</p>` : ''}
      <span class="pied-carte"><span>${esc((p.etiquettes && p.etiquettes[0]) || (rub ? rub.titre : ''))}</span>${ico('fleche')}</span>
    </a>`
  }
  function grille(pages, rub) {
    if (rub && rub.id === 'actus') return panneauActus(pages, { complet: true })
    if (rub && rub.affichage === 'livres') return `<div class="grille-livres">${pages.map(carteLivre).join('')}</div>`
    return `<div class="grille-cartes">${pages.map((p, i) => carteArticle(p, i)).join('')}</div>`
  }

  /* ---------------------------------------------------------------------- */
  /* Panneau des actualités                                                  */
  /* ---------------------------------------------------------------------- */
  const CIRE_ACTU = { annonce: '#8c2832', evenement: '#2f6b4f', sortie: '#2c4a7a', collaboration: '#6b3f8c', concours: '#9a6a14', 'mise-a-jour': '#4f5560', rp: '#7a3d1f' }
  const cireDe = (t) => CIRE_ACTU[slug(t || '')] || '#8c2832'
  function quandActu(p) {
    let jour = ''
    if (p.dateActu) { try { jour = new Date(p.dateActu + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) } catch (e) { jour = p.dateActu } }
    else if (p.publieLe) jour = dateFr(p.publieLe)
    const heure = p.heureActu ? p.heureActu.replace(':', ' h ').replace(/ h 00$/, ' h') : ''
    return (jour ? (p.dateActu ? 'Le ' : '') + jour : '') + (heure ? (jour ? ', à ' : 'À ') + heure : '')
  }
  const cleActu = (p) => (p.dateActu ? p.dateActu + 'T' + (p.heureActu || '00:00') : String(p.publieLe || ''))
  function ordreActus(actus) {
    const parDate = actus.slice().sort((a, b) => cleActu(b).localeCompare(cleActu(a)))
    const ordre = D.panneau || []
    if (!ordre.length) return parDate
    const rang = new Map(ordre.map((id, i) => [id, i]))
    return parDate.filter((p) => !rang.has(p.id)).concat(parDate.filter((p) => rang.has(p.id)).sort((a, b) => rang.get(a.id) - rang.get(b.id)))
  }
  function afficheActu(p, une) {
    const src = p.banniere || ''
    const img = src ? imgSrc(src, p.formatActu === 'banniere' ? 1600 : 800) : ''
    const fmt = img && p.formatActu === 'banniere' ? 'banniere' : 'image'
    const tags = (p.etiquettes || []).filter((t) => t && t !== 'Actualité')
    const q = quandActu(p)
    return `<a class="affiche${une ? ' affiche-une' : ''}${img ? ' fmt-' + fmt : ' sans-img'}" href="#p-${esc(p.id)}" style="--cire: ${cireDe(p.typeActu)}; --k-titre: 1; --k-texte: 1">
      <span class="affiche-feuille">
        ${une ? '<span class="proclamation">❦ Proclamation ❦</span>' : ''}
        ${img ? `<span class="affiche-img"><img src="${img}"${opos(src)} alt="" loading="lazy">${p.credit ? `<small>${esc(nomCredit(p.credit))}</small>` : ''}</span>` : ''}
        <span class="affiche-texte">
          ${p.typeActu ? `<span class="affiche-type">${esc(p.typeActu)}</span>` : ''}
          <h3>${esc(p.titre || 'Sans titre')}</h3>
          ${q ? `<span class="affiche-date">${esc(q)}</span>` : ''}
          ${p.chapo ? `<p>${esc(p.chapo)}</p>` : ''}
          ${tags.length ? `<span class="affiche-tags">${tags.map((t) => `<span>${esc(t)}</span>`).join('')}</span>` : ''}
          <span class="affiche-lire">Lire la suite ${ico('fleche')}</span>
        </span>
      </span>
      <span class="sceau" aria-hidden="true"><span>ND</span></span>
    </a>`
  }
  function panneauActus(actus, opts) {
    opts = opts || {}
    const tri = ordreActus(actus)
    const liste = opts.complet ? tri : tri.slice(0, 7)
    return `<section class="panneau-affichage${opts.complet ? ' panneau-complet' : ''}">
      ${opts.complet ? '' : '<header class="panneau-tete"><span class="surtitre">Les nouvelles de la communauté</span><h2><span>Le tableau des proclamations</span></h2></header>'}
      <div class="panneau-mur">${liste.length ? liste.map((p, i) => afficheActu(p, i === 0)).join('') : '<p class="panneau-vide">Rien d’affiché pour l’instant.</p>'}</div>
      ${!opts.complet && actus.length ? `<a class="panneau-suite" href="#r-actus">Toutes les proclamations ${ico('fleche')}</a>` : ''}
    </section>`
  }

  /* ---------------------------------------------------------------------- */
  /* Crédits                                                                 */
  /* ---------------------------------------------------------------------- */
  const domaineLien = (u) => { try { return new URL(u).hostname.replace(/^www\./, '') } catch (e) { return '' } }
  function avatarCredit(c, grand) {
    const o = (c.oeuvres || [])[0]
    const src = srcOeuvre(o)
    const ini = String(c.nom || '?').split(/\s+/).map((m) => m[0]).join('').slice(0, 2).toUpperCase()
    return `<span class="cr-avatar${grand ? ' grand' : ''}${c.groupe === 'officiel' ? ' officiel' : ''}">${src ? `<img src="${esc(src)}" alt="" loading="lazy"${o && !OEUVRES_SPECIALES[o] ? opos(I(o)) : ''}>` : `<span>${esc(ini)}</span>`}</span>`
  }
  function carteCredit(c) {
    const v = VERIFS[c.verif] || VERIFS['a-confirmer']
    const oeuvres = (c.oeuvres || []).filter((o) => srcOeuvre(o))
    const liens = (c.liens || []).filter((l) => lienSur(l.u))
    return `<article class="carte-credit${c.groupe === 'officiel' ? ' officiel' : ''}" id="credit-${esc(c.id)}">
      <header class="cr-tete">${avatarCredit(c, true)}<div><h3>${esc(c.nom)}</h3>${c.nomComplet ? `<p class="cr-nom">${esc(c.nomComplet)}</p>` : ''}
        <p class="cr-roles">${(c.roles || []).map((r) => `<span>${esc(r)}</span>`).join('')}</p></div></header>
      ${c.presentation ? `<p class="cr-presentation">${enLigne(esc(c.presentation))}</p>` : ''}
      ${liens.length ? `<ul class="cr-liens">${liens.map((l) => `<li><a href="${esc(lienSur(l.u))}" target="_blank" rel="noopener noreferrer">${ico('lien')}<span><strong>${esc(l.t || domaineLien(l.u))}</strong><small>${esc(domaineLien(l.u))}</small></span></a></li>`).join('')}</ul>` : c.groupe === 'artiste' ? `<p class="cr-sans-lien">${ico('loupe')} Pas encore de lien vers ses pages.</p>` : ''}
      ${oeuvres.length ? `<div class="cr-oeuvres">${oeuvres.map((o) => `<figure title="${esc(nomOeuvre(o))}"><img src="${esc(srcOeuvre(o))}" alt="${esc(nomOeuvre(o))}" loading="lazy"${OEUVRES_SPECIALES[o] ? '' : opos(I(o))}><figcaption>${esc(nomOeuvre(o))}</figcaption></figure>`).join('')}</div>` : ''}
      <footer class="cr-verif v-${esc(c.verif || 'a-confirmer')}" title="${esc(v[1])}">${ico(c.verif === 'a-confirmer' ? 'horloge' : 'coche')} <strong>${esc(v[0])}</strong>${c.preuve ? ` · ${esc(c.preuve)}` : ''}</footer>
    </article>`
  }
  function vueCredits(r) {
    const cs = contributeurs()
    const artistes = cs.filter((c) => c.groupe !== 'officiel'), officiels = cs.filter((c) => c.groupe === 'officiel')
    const inconnues = aIdentifier()
    return `${sousNav(r.section, r.id)}
      <section class="hero"><div class="conteneur">${ariane([{ t: r.section.titre, h: '#s-' + r.section.id }, { t: r.titre }])}
        <div class="hero-grille"><div class="hero-ico">${ico(r.icone)}</div><div><div class="surtitre">${esc(r.surTitre)}</div><h1>${esc(r.titre)}</h1><p class="chapo">${esc(r.chapo)}</p></div></div>
      </div></section>
      <div class="conteneur avec-arbre">${arbreSection(r.section, r.id, null)}<div class="contenu-rub page-credits">
        <p class="cr-intro">Les illustrations du wiki sont l’œuvre d’artistes, fans de la saga ou illustrateurs officiels. Chaque image est créditée ici, avec un lien vers les pages de son artiste quand on les connaît. Nous n’indiquons que ce que nous avons pu vérifier.</p>
        <div class="groupe-titre"><div class="groupe-tete"><h2>Les artistes</h2><span>${pluriel(artistes.length, 'artiste')}</span></div></div>
        <div class="grille-credits">${artistes.map(carteCredit).join('')}</div>
        ${officiels.length ? `<div class="groupe-titre"><div class="groupe-tete"><h2>La saga officielle</h2><span class="sous">Romans, couvertures, cartes et bandes dessinées</span></div></div><div class="grille-credits">${officiels.map(carteCredit).join('')}</div>` : ''}
        ${inconnues.length ? `<div class="groupe-titre"><div class="groupe-tete"><h2>Œuvres en attente de crédit</h2><span>${pluriel(inconnues.length, 'œuvre')}</span></div></div>
          <p class="meta cr-appel">Nous n’avons pas encore retrouvé l’artiste de ces images. Tu le connais ? Préviens l’équipe sur le <strong>Discord</strong> : son nom et un lien vers ses pages suffisent.</p>
          <div class="grille-inconnues">${inconnues.map((k) => `<figure><img src="${esc(srcOeuvre(k))}" alt="" loading="lazy"${opos(I(k))}><figcaption><strong>${esc(nomOeuvre(k))}</strong><small>Aucune signature visible ; source pas encore retrouvée.</small></figcaption></figure>`).join('')}</div>` : ''}
        <p class="meta" style="margin-top:28px">Tu es l’artiste d’une de ces œuvres et tu veux corriger ton crédit ou la retirer du wiki ? Écris à l’équipe sur le Discord : c’est fait sans discussion.</p>
      </div></div>`
  }
  function bandeCredits() {
    const artistes = contributeurs().filter((c) => c.groupe !== 'officiel')
    if (!artistes.length) return ''
    return `<section class="bande-credits">
      <header><span class="surtitre">Crédits</span><h2>Les artistes du wiki</h2><p>Le wiki est illustré grâce à leur talent. Découvre leurs pages et leurs autres œuvres.</p></header>
      <ul class="cr-defile">${artistes.map((c) => `<li><a href="#r-credits" title="${esc(c.nom)}">${avatarCredit(c)}<span>${esc(c.nom)}</span><small>${esc((c.roles || []).join(', '))}</small></a></li>`).join('')}</ul>
      <a class="btn btn-or" href="#r-credits">${ico('pinceau')} Voir tous les crédits</a>
    </section>`
  }

  /* ---------------------------------------------------------------------- */
  /* Vues                                                                    */
  /* ---------------------------------------------------------------------- */
  const BLOCS_COTE = ['hub', 'reglement']
  const BLOCS_BANDE = ['actus', 'panneau', 'credits']
  function blocAccueil(nom) {
    if (nom === 'actus' || nom === 'panneau') return panneauActus(pagesDe('actus'))
    if (nom === 'credits') return bandeCredits()
    if (nom === 'hub') {
      const h = PAGES.get('nouvelle-destinee')
      const lignes = ((h && h.cartouche) || []).filter((c) => c.k && c.v)
      return `<aside class="carte-cote carte-hub"><span class="surtitre">La communauté</span><h3>${esc(h ? h.titre : 'Notre Hub')}</h3>
        ${h && h.chapo ? `<p>${esc(h.chapo)}</p>` : ''}
        ${lignes.length ? `<dl>${lignes.map((c) => `<dt>${esc(c.k)}</dt><dd>${esc(c.v)}</dd>`).join('')}</dl>` : ''}
        <a class="btn btn-or" href="${DISCORD}" target="_blank" rel="noopener" style="width:100%;text-align:center">Rejoindre le Discord</a>
        <small>discord.gg/nouvelledestinee</small>
        ${h ? `<a class="lien-cote" href="#p-${h.id}">Tout sur le Hub →</a>` : ''}</aside>`
    }
    if (nom === 'reglement') {
      const r = PAGES.get('reglement-wiki')
      if (!r) return ''
      const titres = rendreTexte(r.corps).toc.filter((t) => t.niv === 2)
      return `<aside class="carte-cote"><span class="surtitre">À lire par tous</span><h3>Le règlement</h3>
        <ol class="regles-cote">${titres.map((t) => `<li>${esc(t.t)}</li>`).join('')}</ol>
        <a class="lien-cote" href="#p-${r.id}">Lire le règlement complet →</a></aside>`
    }
    return ''
  }
  function vueAccueil() {
    const p = PAGES.get('accueil') || { titre: 'Bienvenue sur le wiki', corps: '' }
    const ban = D.accueil || {}
    const principal = [], cote = [], bandes = []
    let tampon = []
    const vider = () => { if (tampon.join('').trim()) principal.push(`<div class="corps accueil-corps">${rendreTexte(tampon.join('\n')).html}</div>`); tampon = [] }
    String(p.corps || '').replace(/\r/g, '').split('\n').forEach((l) => {
      const m = l.trim().match(/^\{\{([a-z-]+)\}\}$/)
      if (!m) return tampon.push(l)
      vider()
      ;(BLOCS_BANDE.includes(m[1]) ? bandes : BLOCS_COTE.includes(m[1]) ? cote : principal).push(blocAccueil(m[1]))
    })
    vider()
    if (!/^\s*\{\{credits\}\}\s*$/m.test(String(p.corps || ''))) bandes.push(blocAccueil('credits'))
    return `
      <section class="accueil-tete avec-banniere" style="--banniere: url('${absolue(imgSrc(ban.banniere))}')${posDe(ban.banniere)}"><div class="conteneur">
        <img class="logo" src="${U('img/logo.png')}" alt="Nouvelle Destinée" width="300" height="207">
        <div>
          <div class="surtitre">HCF Nouvelle Destinée · le wiki</div>
          <h1>${esc(p.titre)}</h1>
          ${p.chapo ? `<p class="accroche">${esc(p.chapo)}</p>` : ''}
          <form class="accueil-recherche" data-form="recherche-accueil" role="search">${ico('loupe')}<input name="q" type="search" placeholder="Rechercher dans le wiki…" aria-label="Rechercher dans le wiki"><button class="btn btn-or" type="submit">Chercher</button></form>
        </div>
      </div>${credit(ban.credit, ban.banniere)}</section>
      <div class="conteneur accueil-grille avec-arbre-g${cote.length ? '' : ' sans-cote'}">
        <div class="col-arbre">${arbreWiki()}</div>
        <div class="accueil-principal">${principal.join('')}</div>
        ${cote.length ? `<div class="accueil-cote">${cote.join('')}</div>` : ''}
      </div>
      ${bandes.map((b) => `<div class="bande-accueil"><div class="conteneur">${b}</div></div>`).join('')}`
  }
  function vueSection(id) {
    const s = SECTIONS.find((x) => x.id === id)
    if (!s) return vueIntrouvable()
    const h = heroIntro(s.banniere, s.credit)
    const carte = (r, i) => {
      const v = r.visuel ? { type: 'image', src: imgSrc(r.visuel, 800), pos: posImg(r.visuel) } : r.special === 'credits' ? { type: 'image', src: imgSrc(I('dragonnets'), 800) } : visuelsRubrique(r.id)
      return `<a class="carte teintee" href="${lienRub(r.id)}" style="--t: ${teinteCarte(i)}">${bandeau(v, r.icone)}<span class="surtitre">${esc(r.surTitre || '')}</span><h3>${esc(r.titre)}</h3><p>${esc(r.chapo || '')}</p><span class="pied-carte"><span>${r.special ? 'Consulter' : pluriel(compterRubrique(r.id), 'page')}</span>${ico('fleche')}</span></a>`
    }
    const arbre = avecArbre(s)
    return `${sousNav(s, null)}
      <section class="hero${h.cls}"${h.style}><div class="conteneur">${ariane([{ t: s.titre }])}
        <div class="hero-grille"><div><div class="surtitre">${esc(s.surTitre)}</div><h1>${esc(s.titre)}</h1><p class="chapo">${esc(s.intro)}</p></div></div>
      </div>${h.credit}</section>
      <div class="conteneur${arbre ? ' avec-arbre' : ' sans-arbre'}">${arbre ? arbreSection(s, null, null) : ''}<div class="contenu-intro"><div class="grille-cartes">${s.rubriques.map(carte).join('')}</div></div></div>`
  }
  function vueRubrique(id) {
    const r = RUBRIQUES[id]
    if (!r) return vueIntrouvable()
    if (r.special === 'credits') return vueCredits(r)
    const pages = pagesDe(id)
    const groupes = grouper(pages, r)
    const avecGroupes = groupes.length > 1 || (groupes[0] && groupes[0][0])
    const h = heroIntro(r.visuel, r.creditVisuel)
    const arbre = avecArbre(r, r.section)
    return `${sousNav(r.section, id)}
      <section class="hero${h ? h.cls : ''}"${h ? h.style : ''}><div class="conteneur">${ariane([{ t: r.section.titre, h: '#s-' + r.section.id }, { t: r.titre }])}
        <div class="hero-grille">${h ? '' : heroVisuel(visuelsRubrique(id), r.icone)}<div><div class="surtitre">${esc(r.surTitre || '')}</div><h1>${esc(r.titre)}</h1><p class="chapo">${esc(r.chapo || '')}</p></div></div>
      </div>${h ? h.credit : ''}</section>
      <div class="conteneur${arbre ? ' avec-arbre' : ' sans-arbre'}">${arbre ? arbreSection(r.section, id, null) : ''}<div class="contenu-rub">
        ${!pages.length ? '<div class="vide">Aucune page publiée ici pour l’instant.</div>' : avecGroupes
          ? groupes.map(([g, ps]) => `<section class="groupe"><div class="groupe-titre"><div class="groupe-tete"><h2>${esc(g || 'Autres')}</h2><span>${r.affichage === 'livres' ? pluriel(ps.length, 'livre') : pluriel(ps.length, 'entrée')}</span>${r.groupesInfo && r.groupesInfo[g] ? `<span class="sous">${esc(r.groupesInfo[g])}</span>` : ''}</div></div>${grille(ps, r)}</section>`).join('')
          : grille(pages, r)}
      </div></div>`
  }
  /* « Voir aussi » : tome ↔ BD, et pages qui citent celle-ci */
  function relations(p) {
    const ids = []
    const ajout = (id) => { if (id && id !== p.id && PAGES.has(id) && !ids.includes(id)) ids.push(id) }
    let m
    if ((m = String(p.id).match(/^tome-(\d+)$/))) ajout('bd-' + m[1])
    if ((m = String(p.id).match(/^bd-(\d+)$/))) ajout('tome-' + m[1])
    ;({ spectral: ['bd-spectral'], 'bd-spectral': ['spectral'] }[p.id] || []).forEach(ajout)
    const re = new RegExp('\\[\\[' + p.id + '(\\||\\])')
    PAGES.forEach((x) => { if (ids.length < 6 && x.id !== 'accueil' && re.test(x.corps || '')) ajout(x.id) })
    return ids.slice(0, 6).map((id) => PAGES.get(id))
  }
  function voirAussi(p) {
    const liste = relations(p)
    if (!liste.length) return ''
    return `<section class="voir-aussi"><h2 class="titre-colonne">Voir aussi</h2><div class="grille-voir">${liste.map((x) => {
      const v = visuelDe(x), rub = RUBRIQUES[x.rubrique]
      const vis = v && v.type === 'couv' ? `<img class="va-couv" src="${v.src}" alt="">` : v && v.type === 'blasons' ? pileBlasons(v.clans.slice(0, 1)) : `<span class="va-ico">${ico(x.icone || (rub ? rub.icone : 'parchemin'))}</span>`
      return `<a class="va" href="#p-${x.id}">${vis}<span><small>${esc(rub ? rub.titre : '')}</small><strong>${esc(x.titre)}</strong></span></a>`
    }).join('')}</div></section>`
  }
  function vuePage(id) {
    if (id === 'accueil') return vueAccueil()
    const p = PAGES.get(id)
    if (!p) return vueIntrouvable()
    const rendu = rendreTexte(p.corps, { lettrine: p.lettrine, numerote: p.numerote })
    const rub = RUBRIQUES[p.rubrique]
    const freres = rub ? pagesDe(p.rubrique) : []
    const i = freres.findIndex((x) => x.id === p.id)
    const prec = i > 0 ? freres[i - 1] : null
    const suiv = i >= 0 && i < freres.length - 1 ? freres[i + 1] : null
    let visuel = ''
    if (p.type === 'tome') {
      const g = lienGallimard(p)
      visuel = g ? `<a class="livre-hero livre-gallimard" href="${esc(g.url)}" target="_blank" rel="noopener noreferrer" title="${g.recueil ? `Voir le recueil ${esc(g.recueil.titre)}` : 'Voir le livre'} sur le site de Gallimard Jeunesse (nouvel onglet)">${couverture(p)}<span class="livre-editeur">${ico('lien')} ${g.recueil ? `Voir le recueil ${esc(g.recueil.titre)}` : 'Voir le livre'} chez Gallimard Jeunesse</span></a>` : `<div class="livre-hero">${couverture(p)}</div>`
    } else if (!p.banniere) {
      const c = clansCites(p, 3)
      visuel = c.length ? `<div class="hero-blasons">${pileBlasons(c, 'grande')}</div>` : `<div class="hero-ico hero-ico-page">${ico(p.icone || (rub ? rub.icone : 'parchemin'))}</div>`
    }
    const etiquettes = (p.etiquettes || []).filter((e) => e && !/^rp$/i.test(e))
    const cartouche = cartoucheLivre(p)
    return `<article>
      <header class="hero${p.banniere ? ' hero-illu' : ''}"${p.banniere ? ` style="--banniere: url('${absolue(imgSrc(p.banniere))}')${posDe(p.banniere)}"` : ''}><div class="conteneur">
        ${ariane([{ t: rub ? rub.section.titre : '', h: rub ? '#s-' + rub.section.id : '#' }, { t: rub ? rub.titre : '', h: rub ? lienRub(rub.id) : '#' }, { t: p.titre }])}
        <div class="hero-grille hero-page">
          <div>
            ${p.surTitre ? `<div class="surtitre">${esc(p.surTitre)}</div>` : ''}
            <h1>${esc(p.titre || 'Sans titre')}</h1>
            ${p.chapo ? `<p class="chapo">${esc(p.chapo)}</p>` : ''}
            ${etiquettes.length ? `<div class="etiquettes">${etiquettes.map((e) => `<span class="etiquette${/^canon$/i.test(e) ? ' canon' : /^communauté$/i.test(e) ? ' communaute' : ''}">${esc(e)}</span>`).join('')}</div>` : ''}
          </div>
          <div class="visuel">${visuel}</div>
        </div>
      </div>${p.banniere ? credit(p.credit, p.banniere) : ''}</header>
      <div class="conteneur article-grille">
        <div class="col-arbre">${rub ? arbreSection(rub.section, rub.id, p.id) : ''}</div>
        <div class="corps${rendu.toc.filter((t) => t.niv === 2).length >= 5 ? ' long' : ''}">
          <div class="section d-1"><div class="colonne"><div class="bloc">${rendu.html || (p.rubrique === 'actus' && quandActu(p) ? `<p>Rendez-vous ${esc(quandActu(p).replace(/^Le /, 'le '))}.</p>` : '<p><em>Page en cours d’écriture.</em></p>')}</div></div></div>
          <div class="fin">Fin de la page</div>
          <div class="fin-ligne"><span class="meta">${p.publieLe ? 'Dernière mise à jour le ' + dateFr(p.publieLe) : ''}</span></div>
          ${voirAussi(p)}
          ${prec || suiv ? `<nav class="prec-suiv" aria-label="Pages voisines">${prec ? `<a href="#p-${prec.id}"><span class="surtitre">Précédent</span><strong>${esc(prec.titre)}</strong></a>` : '<span></span>'}${suiv ? `<a class="suiv" href="#p-${suiv.id}"><span class="surtitre">Suivant</span><strong>${esc(suiv.titre)}</strong></a>` : ''}</nav>` : ''}
        </div>
        <aside class="droite laterale">
          ${cartouche.length ? `<div class="panneau cartouche"><div class="cartouche-titre">${ico('etoile')} Cartouche</div><dl>${cartouche.map((c) => `<dt>${esc(c.k)}</dt><dd>${enLigne(esc(c.v))}</dd>`).join('')}</dl></div>` : ''}
          ${rendu.toc.length > 1 ? `<nav class="sommaire" aria-label="Sur cette page"><h2>Sur cette page</h2><ol>${rendu.toc.map((t) => `<li class="n${t.niv}"><button data-ancre="${t.id}">${esc(t.t)}</button></li>`).join('')}</ol></nav>` : ''}
        </aside>
      </div>
    </article>`
  }
  function vueRecherche() {
    return `<section class="hero"><div class="conteneur">${ariane([{ t: 'Recherche' }])}<h1>Rechercher</h1>
      <input id="champ-recherche" class="recherche-champ" type="search" placeholder="Un tome, une bande dessinée, l’autrice…" autocomplete="off" aria-label="Rechercher dans le wiki">
      <div class="resultats" id="resultats" aria-live="polite"></div></div></section><div style="height:60px"></div>`
  }
  function majRecherche() {
    const champ = $('#champ-recherche'), zone = $('#resultats')
    if (!champ || !zone) return
    const q = champ.value.trim()
    if (q.length < 2) { zone.innerHTML = '<p class="meta">Tape au moins deux lettres.</p>'; return }
    const norme = (s) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    const mots = norme(q).split(/\s+/).filter(Boolean)
    const res = []
    PAGES.forEach((p) => {
      const t = norme(p.titre), c = norme([p.chapo, p.surTitre, (p.cartouche || []).map((x) => x.k + ' ' + x.v).join(' '), texteBrut(p.corps)].join(' '))
      let score = 0
      for (const m of mots) { if (t.includes(m)) score += 10; else if (c.includes(m)) score += 1; else { score = -1; break } }
      if (score > 0) res.push({ p, score })
    })
    res.sort((a, b) => b.score - a.score)
    const surligner = (s) => { let h = esc(s); mots.forEach((m) => { if (m.length > 1) h = h.replace(new RegExp('(' + m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark>$1</mark>') }); return h }
    zone.innerHTML = res.length ? res.slice(0, 40).map(({ p }) => {
      const rub = RUBRIQUES[p.rubrique]
      return `<a class="resultat" href="${lienPage(p.id)}"><span class="surtitre">${esc(rub ? rub.titre : '')}</span><br><strong>${esc(p.titre)}</strong><p>${surligner(p.chapo || texteBrut(p.corps).slice(0, 160))}</p></a>`
    }).join('') : `<div class="vide">Aucun résultat pour « ${esc(q)} ».</div>`
  }
  const vueIntrouvable = () => '<div class="conteneur" style="padding:70px 0"><div class="vide">Cette page n’existe pas (ou plus). <a href="#accueil">Retour à l’accueil</a></div></div>'

  /* ---------------------------------------------------------------------- */
  /* Affichage                                                               */
  /* ---------------------------------------------------------------------- */
  let derniereRoute = null
  let observateur = null
  function brancherSommaire() {
    if (observateur) { observateur.disconnect(); observateur = null }
    const boutons = $$('.sommaire button[data-ancre]')
    if (!boutons.length || !('IntersectionObserver' in window)) return
    const cibles = boutons.map((b) => document.getElementById(b.dataset.ancre)).filter(Boolean)
    const visibles = new Set()
    observateur = new IntersectionObserver((entrees) => {
      entrees.forEach((e) => (e.isIntersecting ? visibles.add(e.target.id) : visibles.delete(e.target.id)))
      let actif = null
      for (const c of cibles) { if (visibles.has(c.id)) { actif = c.id; break } }
      if (!actif) { for (const c of cibles) if (c.getBoundingClientRect().top < 120) actif = c.id }
      if (!actif && cibles[0]) actif = cibles[0].id
      boutons.forEach((b) => b.classList.toggle('actif', b.dataset.ancre === actif))
    }, { rootMargin: '-80px 0px -55% 0px' })
    cibles.forEach((c) => observateur.observe(c))
  }
  function titreDocument(r) {
    const base = 'Wiki Nouvelle Destinée'
    if (r.vue === 'page') { const p = PAGES.get(r.id); return p ? `${p.titre} · ${base}` : base }
    if (r.vue === 'rubrique' && RUBRIQUES[r.id]) return `${RUBRIQUES[r.id].titre} · ${base}`
    if (r.vue === 'section') { const s = SECTIONS.find((x) => x.id === r.id); return s ? `${s.titre} · ${base}` : base }
    if (r.vue === 'recherche') return `Recherche · ${base}`
    return base
  }
  function rendre() {
    const r = routeCourante()
    if (r.vue === 'ancre') return
    const main = $('#contenu')
    let html
    try {
      if (r.vue === 'accueil') html = vueAccueil()
      else if (r.vue === 'section') html = vueSection(r.id)
      else if (r.vue === 'rubrique') html = vueRubrique(r.id)
      else if (r.vue === 'page') html = vuePage(r.id)
      else if (r.vue === 'recherche') html = vueRecherche()
      else html = vueIntrouvable()
    } catch (e) {
      console.error(e)
      html = `<div class="conteneur"><div class="alerte" style="margin:40px 0">Une erreur d’affichage est survenue : ${esc(e.message)}</div></div>`
    }
    main.innerHTML = html
    const sec = sectionCourante()
    main.style.setProperty('--t', teinteDe(sec))
    document.body.dataset.partie = sec || ''
    brancherSommaire()
    if (r.vue === 'recherche') { const c = $('#champ-recherche'); if (c) { if (S.rechercheInitiale) { c.value = S.rechercheInitiale; S.rechercheInitiale = ''; majRecherche() } c.focus() } }
    if (location.hash !== derniereRoute) { window.scrollTo(0, 0); derniereRoute = location.hash; document.title = titreDocument(r) }
  }

  /* ---------------------------------------------------------------------- */
  /* Thème et événements                                                     */
  /* ---------------------------------------------------------------------- */
  function appliquerTheme(t) { document.documentElement.dataset.theme = t === 'sombre' ? 'sombre' : 'clair' }
  window.addEventListener('hashchange', () => { S.ouvert = null; rendreCadre(); rendre() })
  document.addEventListener('click', (ev) => {
    const ancre = ev.target.closest('[data-ancre]')
    if (ancre) { const cible = document.getElementById(ancre.dataset.ancre); if (cible) cible.scrollIntoView({ behavior: 'smooth', block: 'start' }); return }
    const menu = ev.target.closest('[data-menu]')
    if (menu) { if (S.ouvert !== 'mobile') { S.ouvert = S.ouvert === menu.dataset.menu ? null : menu.dataset.menu; rendreCadre() } return }
    if (S.ouvert && S.ouvert !== 'mobile' && !ev.target.closest('.mega')) { S.ouvert = null; rendreCadre() }
    const b = ev.target.closest('[data-action]')
    if (!b) return
    if (b.dataset.action === 'theme') { const t = document.documentElement.dataset.theme === 'sombre' ? 'clair' : 'sombre'; appliquerTheme(t); memoire.ecrire('nd-theme', t); rendreCadre() }
    if (b.dataset.action === 'burger') { S.ouvert = S.ouvert === 'mobile' ? null : 'mobile'; rendreCadre() }
  })
  document.addEventListener('submit', (ev) => {
    const f = ev.target
    if (f.dataset.form === 'recherche-accueil') { ev.preventDefault(); S.rechercheInitiale = f.elements.q.value; location.hash = '#recherche' }
  })
  document.addEventListener('input', (ev) => { if (ev.target.id === 'champ-recherche') majRecherche() })
  document.addEventListener('toggle', (ev) => {
    const d = ev.target
    if (!d || !d.dataset || !d.dataset.arbre) return
    const k = d.dataset.arbre
    if (k === 's-accueil') { if (d.open) S.arbreOuvert.delete('!s-accueil'); else S.arbreOuvert.add('!s-accueil') } else if (d.open) S.arbreOuvert.add(k); else S.arbreOuvert.delete(k)
  }, true)
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && S.ouvert) { S.ouvert = null; rendreCadre() }
    if (ev.key === '/' && !/INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || '') && !ev.ctrlKey && !ev.metaKey) { ev.preventDefault(); location.hash = '#recherche' }
  })

  // Thème : le choix du visiteur, sinon celui de son appareil
  const themeChoisi = memoire.lire('nd-theme')
  appliquerTheme(themeChoisi || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'sombre' : 'clair'))
  rendreCadre()
  rendre()
})()
