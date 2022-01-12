/**
 * @author Thinkful
 * @author Dylan Adams <dadams31@asu.edu>
 * @version 1.00
 */
const polybiusModule = (function () {
	/**
	 * Encode/Decode a message using polybius square method.
	 * Each non-space lowercase alphabetic-only character in
	 * the message is encoded as grid coordinates (i.e. "a" = "11").
	 * @param {string} input - the message to be encoded/decoded (accepts only alphabetic characters, converts all to lowercase).
	 * @param {boolean} [encode=true] - true to encode, false to decode.
	 * @returns {string} the result of encoding or decoding.
	 */
	function polybius(input, encode = true) {
		return encode ? _getEncoding(input) : _getDecoding(input);
	}

	/**
	 * Helper function to encode an input message.
	 * @private
	 * @param {string} input - the message to be encoded.
	 * @returns {string|boolean} the result of encoding OR
	 * false on validation fail.
	 */
	function _getEncoding(input) {
		let cypher = "";
		input = input.toLowerCase();

		for (let i = 0; i < input.length; ++i) {
			const char = input.charCodeAt(i);

			if (char === 105 || char === 106) {
				cypher += "42";
			} else if (char >= 97 && char <= 122) {
				let zeroIndex = char - 97;
				zeroIndex -= zeroIndex >= 10 ? 1 : 0;
				const top = (((zeroIndex % 5) + 5) % 5) + 1;
				const side = Math.floor(zeroIndex / 5) + 1;

				cypher += `${top}${side}`;
			} else {
				cypher += input[i];
			}
		}
		return cypher;
	}

	/**
	 * Helper function to decode an encoded message.
	 * @private
	 * @param {string} input - the message to be decoded.
	 * @returns {string|boolean} the decoded message OR
	 * false on validation fail.
	 */
	function _getDecoding(input) {
		if (input.split(" ").join("").length % 2 !== 0) {
			return false;
		}

		// make it easy to process spaces by adding another space
		// to each space so as to make it two characters, the same
		// as the increment of i in the loop below
		input = input.split(" ").join("  ");

		let message = "";
		for (let i = 0; i < input.length; i += 2) {
			if (input[i] === " ") {
				message += input[i];
				continue;
			}
			const top = Number(input[i]);
			const side = Number(input[i + 1]);
			let charCode = (side - 1) * 5 + top + 96;
			if (charCode === 105 || charCode === 106) {
				message += "(i/j)";
				continue;
			} else if (charCode >= 106) {
				charCode++;
			}
			message += String.fromCharCode(charCode);
		}
		return message;
	}

	return {
		polybius,
	};
})();

module.exports = { polybius: polybiusModule.polybius };
