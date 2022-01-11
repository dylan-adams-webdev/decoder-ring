/**
 * @author Thinkful
 * @author Dylan Adams <dadams31@asu.edu>
 * @version 1.00
 */

const substitutionModule = (function () {
	/**
	 * Encode/Decode a message using the substitution method.
	 * Each non-space lowercase alphabetic-only character in the
	 * message is substituted with the corresponding letter in the
	 * given alphabet. Capital letters are transformed to lowercase
	 * and the all characters in the substitute alphabet should be
	 * unique and exactly 25 characters long.
	 * @param {string} input - the message to be encoded/decoded.
	 * @param {string} [alphabet=0] - the substitution alphabet.
	 * @param {boolean} encode - true to encode, false to decode.
	 * @returns {(string|boolean)} the encoded/decoded message or
	 * false for validation fail.
	 */
	function substitution(input, alphabet = 0, encode = true) {
		// validation
		const correctLength = alphabet.length === 26;
		const isUnique = _isUnique(alphabet);
		if (!alphabet.length || !isUnique || !correctLength) return false;
		// substitution
		input = input.toLowerCase();
		const key = _getKey(alphabet, encode);
		return [...input]
			.map((letter) => (letter === " " ? " " : key[letter]))
			.join("");
	}

	// helper for substitution()
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

	// helper for substitution()
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
