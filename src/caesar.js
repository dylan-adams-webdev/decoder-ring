/**
 * @author Thinkful
 * @author Dylan Adams <dadams31@asu.edu>
 * @version 1.00
 */

const caesarModule = (function () {
	
	/**
	 * Encode/decode a message using caesar shift method.
	 * Each non-space lowercase alphabetic-only character in
	 * the message is shifted up or down in the alphabet to produce
	 * the result.
	 * @param {string} input - the message to be encoded/decoded.
	 * @param {number} shift - the number of steps to shift the characters (accepts alphabetic characters, converts to lowercase).
	 * @param {boolean} [encode=true] - true to encode, false to decode.
	 * @returns {string|boolean} the decoded or encoded message OR
	 * false on validation fail.
	 */
	function caesar(input, shift, encode = true) {

		if (!shift || (typeof shift) !== 'number' || shift > 25 || shift < -25) {
			return false;
		}
		return encode
			? _translate(input, shift)
			: _translate(input, -shift);
		
	}

	/**
	 * Helper function to shift an input message up or down.
	 * Does not validate message or shift amount.
	 * @private
	 * @param {string} input - the string of characters to be shifted.
	 * @param {number} shift - the shift amount (can be pos/neg).
	 * @returns {string} the shifted message
	 */
	function _translate(input, shift) {

		input = input.toLowerCase();
		let cypher = "";

		for (let i = 0; i < input.length; ++i) {
			let char = input.charCodeAt(i);

			// character is a lowercase letter, elegible for shifting
			if (char >= 97 && char <= 122) {
				const zeroIndex = (char - 97 + shift);
				const newCode = (((zeroIndex % 26) + 26) % 26) + 97;
				cypher += String.fromCharCode(newCode)
			}
			
			// character is a space, number, or special char, do not shift
			else {
				cypher += input[i];
			}
		}

		return cypher;
	}

	return {
		caesar,
	};
})();

module.exports = { caesar: caesarModule.caesar };
