import { ImCross, ImRadioUnchecked } from 'react-icons/im'; // icones fitxes
import { BsPerson, BsRobot } from 'react-icons/bs'; // icones jugador

export const 
	BUIT = 0, 
	X = 1, 
	O = 2, 
	HUMA = 0, 
	IA = 1,
	EMPAT = 3;

const 
	MAX = Infinity, 
	PROF_MAX = -1, 		// desactiva poda per profunditat
	EMPATA = 0;

// Google Material Icons
export const icoJugadors = [ <BsPerson />, <BsRobot />, ];
export const icoFitxa = [ "", <ImCross class="icoFitxa" />, <ImRadioUnchecked class="icoFitxa" /> ];

/*
 * calcPuntuacio(): actualitza la puntuació de la columna, fila o diagonal amb el moviment del jugador actual
 */
export const calcPuntuacio = (p, row, col, jugador) => {
	let puntuacio = [...p];

	// puntuacio[0, 1, 2] (columnes):
	puntuacio[col] += 10**jugador;
	// puntuacio[3, 4, 5] (files):
	puntuacio[row+3] += 10**jugador;
	// puntuacio[6] (diagonal ↘︎):
	if (col === row) puntuacio[6] += 10**jugador;
	// puntuacio[7] (diagonal ↗︎):
	const key = `${row}${col}`;
	if (key === "02" || key === "11" || key === "20")
	  puntuacio[7] += 10**jugador;
  
	return puntuacio;
}

/*
 * hihaGualnyador(): calcula si hi ha un guanyador amb l'últim moviment
 */
export const hihaGuanyador = puntuacio => {
	for (let linia in puntuacio) {
		if (puntuacio[linia] === 30) return { jugador: X, linia: linia };
		else if (puntuacio[linia] === 300) return { jugador: O, linia: linia } ;
	}
	return false;
};

/*
 * hihaTirades(): calcula si queden tirades possibles
 */
export const hihaTirades = tauler => tauler.flat().includes(BUIT);

/* ===========================================
 * UTILS per algoritme minimax de millorTirada
 * =========================================== */

// jugador max
let jugadorEsMax = { [X]: false, [O]: !X };

// guardarà millor/s tirades possibles per triar
let tirs = new Map();

/*
 * possiblesTirades() : calcula les tirades que queden disponibles
 */
const possiblesTirades = tauler => {
	let tirs = [];

	for (let row in tauler) {
		for (let col in tauler[row]) {
			if (tauler[row][col] === BUIT) {
				tirs = [...tirs, {
					row: parseInt(row),
					col: parseInt(col),
				}]
			}
		}
	}

	return tirs;
};

/*
 * canviaMax(): canvia el jugador max
 */
export const canviaMax = x => { 
	jugadorEsMax = { [X]: x, [O]: !x }; 
};

/*
 * copia(): còpia Arrays i Arrays d'Arrays
 */
const copia = arr => arr.map(el => Array.isArray(el) ? copia(el) : el);

/*
 * millorTirada() : funció amb algoritme minimax i poda alfa-beta
 */
export const millorTirada = (tauler, puntuacio, jugador, prof = 0, alfa = -MAX, beta = MAX) => {
	// Inicialitza tirs en entrar
	if (prof === 0) tirs.clear();

	// LA POSSIBLE TIRADA ÉS TERMINAL?
	const guanyador = hihaGuanyador(puntuacio);
		// si hi ha guanyador: retorna valoració segons és min o max
	if (guanyador) return jugadorEsMax[guanyador.jugador] ? MAX - prof : prof - MAX;
		// sinó i no hi ha més tirades o hem arribat a profunditat màxima: retorna empat
	else if (!hihaTirades(tauler) || prof === PROF_MAX) return EMPATA;
	
	// Inicialitza millor (millor puntuació hipotètica per comparar real) a cada pas amb min o max
	let millor = jugadorEsMax[jugador] ? -MAX : MAX;
	
	// Calcula valoració de les tirades possibles
	possiblesTirades(tauler).forEach(tir => {
		const t = copia(tauler);
		// fa tirada
		t[tir.row][tir.col] = jugador;
		// calcula puntuacions amb tirada feta
		const p = calcPuntuacio(puntuacio, tir.row, tir.col, jugador);
		// tirada del següent jugador (entra recursivament a millorTirada amb el següent jugador)
		const pTir = millorTirada(t, p, jugador === X ? O : X, prof + 1, alfa, beta);
		// màxim o mínim entre última crida i millor
		millor = jugadorEsMax[jugador] ? Math.max(millor, pTir) : Math.min(millor, pTir);
		//guarda alfa o beta segons jugador és min o max
		jugadorEsMax[jugador] ? alfa = Math.max(alfa, millor) : beta = Math.min(beta, millor);
		if (prof === 0) tirs.set(pTir, tirs.has(pTir) ? [...tirs.get(pTir), tir] : [tir]);
		if (alfa >= beta) return;
	});

	// Final recursivitat (ha tornat a prof 0), retorna millor tirada o random si més d'una amb la mateixa puntuació
	if (prof === 0) {
		const tm = tirs.get(millor);
		return tm.length > 1 ? tm[Math.floor(Math.random() * tm.length)] : tm[0];
	}

	// retorna millor tirada (pas final recursiu però no final)
	return millor;
}