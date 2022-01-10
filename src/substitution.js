/**
 * Project: Decoder Ring
 * Authors: Thinkful, Dylan Adams
 * Last Modified: 2022/01/09
 * Version: 1.00
 */

const substitutionModule = (function () {
	// you can add any code you want within this function scope

	function substitution(input, alphabet = 0, encode = true) {
		// validation
		const correctLength = alphabet.length === 26;
		const isUnique = _isUnique(alphabet);
		if (!alphabet.length || !isUnique || !correctLength) return false;
		// substitution
		input = input.toLowerCase();
		const key = _getKey(alphabet, encode);
		return [...input].map(letter => letter === " " ? " " : key[letter]).join("");
	}

	function _getKey(alphabet, encoding) {
		let key = {};
		[...alphabet].forEach((letter, index) => {
			if (encoding) {
				key = { ...key, [String.fromCharCode(index + 97)]: letter };
			} else {
				key = { ...key, [letter]: String.fromCharCode(index + 97) };
			}
		});
		return key;
	}

	function _isUnique(alphabet) {
		for (let i = 0; i < alphabet.length - 1; ++i) {
			for (let k = i + 1; k < alphabet.length; ++k) {
				if (alphabet[i] === alphabet[k]) return false;
			}
		}
		return true;
	}

	return {
		substitution,
	};
})();

module.exports = { substitution: substitutionModule.substitution };
