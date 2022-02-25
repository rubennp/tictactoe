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

const jugadorEsMax = {
	1: false,
	2: true,
};

let tirades = new Map();
const  max_depth = -1;

const deepCopy = arr => {
	let copy = [];
	arr.forEach(el => {
		Array.isArray(el) ? copy.push(deepCopy(el)) : copy.push(el);
	});
	return copy;
};

export const millorTirada = (tauler, puntuacio, jugador, prof = 0) => {
	if (prof === 0) tirades.clear();

	const guanyador = hihaGuanyador(puntuacio);

	if (guanyador) return jugadorEsMax[guanyador.jugador] ? 10 - prof : prof - 10;
	else if (!hihaTirades(tauler)) return 0;
	
	let millor = jugadorEsMax[jugador] ? -10 : 10;
	
	possiblesTirades(tauler).forEach(tirada => {
		const taulerFill = deepCopy(tauler);
		taulerFill[tirada.row][tirada.col] = jugador;

		const puntuacioFill = calcPuntuacio(puntuacio, parseInt(tirada.row), parseInt(tirada.col), jugador);
		let puntuacioTirada = millorTirada(taulerFill, puntuacioFill, jugador === 1 ? 2 : 1, prof + 1);
		millor = jugadorEsMax[jugador] ? Math.max(millor, puntuacioTirada) : Math.min(millor, puntuacioTirada);

		if (prof === 0) tirades.set(puntuacioTirada, tirades.has(puntuacioTirada) ? `${tirades.get(puntuacioTirada)},${tirada.row}${tirada.col}` : `${tirada.row}${tirada.col}`);
	});

	if (prof === 0) {
		let r;

		if (tirades.get(millor).includes(',')) {
			let arr = tirades.get(millor).split(',');
			r = arr[Math.floor(Math.random() * arr.length)];
		} else r = tirades.get(millor);

		return r;
	}

	return millor;
};

const hihaTirades = tauler => tauler.flat().some(el => el === 0);

const possiblesTirades = tauler => {
	let tirades = [];

	for (let row in tauler) {
		for (let col in tauler[row]) {
			if (tauler[row][col] === 0) {
				tirades = [...tirades, {
					row: row,
					col: col,
				}]
			}
		}
	}

	return tirades;
};