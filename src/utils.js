export const BUIT = 0, X = 1, O = 2, HUMA = X, IA = O;

// Google Material Icons
export const icoJugadors = ["", "face", "smart_toy"];
export const icoFitxa = [ "", "clear", "radio_button_unchecked"];

export const calcPuntuacio = (p, r, c, jugador) => {
	let puntuacio = [...p];

	// puntuacio[0, 1, 2] (columnes):
	puntuacio[c] += 10**jugador;
	// puntuacio[3, 4, 5] (files):
	puntuacio[r+3] += 10**jugador;
	// puntuacio[6] (diagonal ↘︎):
	if (c === r) puntuacio[6] += 10**jugador;
	// puntuacio[7] (diagonal ↗︎):
	const key = `${r}${c}`;
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
					row: row,
					col: col,
				}]
			}
		}
	}

	return tirs;
};

export const chJugadorMax = (x = false, o = true) => {
	jugadorEsMax = { 
		[X]: x, 
		[O]: o 
	};
};

let jugadorEsMax = {
	[X]: false,
	[O]: true,
};

let tirs = new Map();
const profMax = -1;

const copia = arr => {
	let cp = [];
	arr.forEach(el => { Array.isArray(el) ? cp.push(copia(el)) : cp.push(el); });
	return cp;
};

export const millorTirada = (tauler, puntuacio, jugador, prof = 0) => {
	if (prof === 0) tirs.clear();
	
	const guanyador = hihaGuanyador(puntuacio);

	if (guanyador) return jugadorEsMax[guanyador.jugador] ? 10 - prof : prof - 10;
	else if (!hihaTirades(tauler) || prof === profMax) return 0;
	
	let m = jugadorEsMax[jugador] ? -10 : 10;
	
	possiblesTirades(tauler).forEach(tir => {
		const t = copia(tauler);
		t[tir.row][tir.col] = jugador;

		const p = calcPuntuacio(puntuacio, parseInt(tir.row), parseInt(tir.col), jugador);
		let pTir = millorTirada(t, p, jugador === 1 ? 2 : 1, prof + 1);
		m = jugadorEsMax[jugador] ? Math.max(m, pTir) : Math.min(m, pTir);

		if (prof === 0) tirs.set(pTir, tirs.has(pTir) ? [...tirs.get(pTir), tir] : [tir]);
	});

	if (prof === 0) {
		let tm = tirs.get(m);
		return tm.length > 1 ? tm[Math.floor(Math.random() * tm.length)] : tm[0];
	}

	return m;
}