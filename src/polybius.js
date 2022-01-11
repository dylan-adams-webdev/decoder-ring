/**
 * Project: Decoder Ring
 * Authors: Thinkful, Dylan Adams
 * Last Modified: 2022/01/09
 * Version: 1.00
 */

const polybiusModule = (function () {
	function polybius(input, encode = true) {
		return encode ? _getEncoding(input) : _getDecoding(input);
	}

	function _getEncoding(input) {
		let cypher = "";
		input = input.toLowerCase();

		for (let i = 0; i < input.length; ++i) {
			const char = input.charCodeAt(i);

			if (char === 105 || char === 106) {
				cypher += "42";
			}
			
			else if (char >= 97 && char <= 122) {
				let zeroIndex = char - 97;
				zeroIndex -= zeroIndex >= 10 ? 1 : 0;
				const top = (((zeroIndex % 5) + 5) % 5) + 1;
				const side = Math.floor(zeroIndex / 5) + 1;

				cypher += `${top}${side}`;
			}
			
			else {
				cypher += input[i];
			}
		}
		return cypher;
	}

	function _getDecoding(input) {
		if (input.split(" ").join("").length % 2 !== 0) {
			return false;
		}

		// make it easy to process spaces by adding another space
		// to each space so as to take it two characters, the same
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
			let charCode = ((side - 1) * 5) + top + 96;
			if (charCode === 105 || charCode === 106) {
				message += "(i/j)";
				continue;
			}
			else if (charCode >= 106) {
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
