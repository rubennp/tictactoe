export const BUIT = 0, X = 1, O = 2;

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
		if (puntuacio[linia] === 30) return { jugador: 1, linia: linia };
		else if (puntuacio[linia] === 300) return { jugador: 2, linia: linia } ;
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

const jugadorEsMax = {
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

		if (prof === 0) {
			tirs.set(pTir, tirs.has(pTir) ? 
				`${tirs.get(pTir)},${tir.row}${tir.col}` 
			: 
				`${tir.row}${tir.col}`);
		}
	});

	if (prof === 0) {
		let r;

		if (tirs.get(m).includes(',')) {
			let arr = tirs.get(m).split(',');
			r = arr[Math.floor(Math.random() * arr.length)];
		} else r = tirs.get(m);

		return r;
	}

	return m;
};