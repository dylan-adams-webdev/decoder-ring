/**
 * Project: Decoder Ring
 * Authors: Thinkful, Dylan Adams
 * Last Modified: 2022/01/09
 * Version: 1.00
 */

const caesarModule = (function () {
	// Entry point for caesarShift
	function caesar(input, shift, encode = true) {

		if (shift === 0 || shift > 25 || shift < -25) return false;
		return encode ? translate(input, shift) : translate(input, shift * -1);
		
	}

	// Translate each letter of the input up or down in the 
	// alphabet by "shift" number of letters
	function translate(input, shift) {

		input = input.toLowerCase();
		let cypher = "";

		for (let i = 0; i < input.length; ++i) {
			let char = input.charCodeAt(i);

			if (char >= 97 && char <= 122) {
				const zeroIndex = (char - 97 + shift);
				const newCode = (((zeroIndex % 26) + 26) % 26) + 97;
				cypher += String.fromCharCode(newCode)
			} else cypher += input[i];
		}

		return cypher;
	}

	return {
		caesar,
	};
})();

module.exports = { caesar: caesarModule.caesar };
