export const BUIT = 0, X = 1, O = 2, HUMA = X, IA = O;

// Google Material Icons
export const icoJugadors = ["", "face", "smart_toy"];
export const icoFitxa = [ "", "clear", "radio_button_unchecked"];

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

export const hihaGuanyador = puntuacio => {
	for (let linia in puntuacio) {
		if (puntuacio[linia] === 30) return { jugador: X, linia: linia };
		else if (puntuacio[linia] === 300) return { jugador: O, linia: linia } ;
	}
	return false;
};

export const hihaTirades = tauler => tauler.flat().includes(BUIT);

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

export const canviaMax = x => { 
	jugadorEsMax = { [X]: x, [O]: !x }; 
};

let jugadorEsMax = { [X]: false, [O]: !X };

let tirs = new Map();

const copia = arr => arr.map(el => Array.isArray(el) ? copia(el) : el);

const MAX = Infinity, PROF_MAX = -1, EMPAT = 0;

export const millorTirada = (tauler, puntuacio, jugador, prof = 0, alpha = -MAX, beta = MAX) => {
	// Init al entrar
	if (prof === 0) tirs.clear();

	// És terminal?
	const guanyador = hihaGuanyador(puntuacio);
	if (guanyador) return jugadorEsMax[guanyador.jugador] ? MAX - prof : prof - MAX;
	else if (!hihaTirades(tauler) || prof === PROF_MAX) return EMPAT;
	
	// Init millor a cada pas
	let millor = jugadorEsMax[jugador] ? -MAX : MAX;
	
	// Recursivament, calcula puntuacio tirades possibles
	possiblesTirades(tauler).forEach(tir => {
		const t = copia(tauler);
		t[tir.row][tir.col] = jugador;
		const p = calcPuntuacio(puntuacio, tir.row, tir.col, jugador);
		const pTir = millorTirada(t, p, jugador === X ? O : X, prof + 1, alpha, beta);
		millor = jugadorEsMax[jugador] ? Math.max(millor, pTir) : Math.min(millor, pTir);
		jugadorEsMax[jugador] ? alpha = Math.max(alpha, millor) : beta = Math.min(beta, millor);
		if (prof === 0) tirs.set(pTir, tirs.has(pTir) ? [...tirs.get(pTir), tir] : [tir]);
		if (alpha >= beta) return;
	});

	// final recursivitat (ha tornat a prof 0), retorna millor tirada o random si més d'una amb la mateixa puntuació
	if (prof === 0) {
		const tm = tirs.get(millor);
		return tm.length > 1 ? tm[Math.floor(Math.random() * tm.length)] : tm[0];
	}

	// retorna millor tirada (pas final recursiu)
	return millor;
}