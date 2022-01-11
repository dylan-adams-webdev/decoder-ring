/**
 * Project: Decoder Ring
 * Authors: Thinkful, Dylan Adams
 * Last Modified: 2022/01/09
 * Version: 1.00
 */

const polybiusModule = (function () {
	function polybius(input, encode = true) {
		return encode ? getEncoding(input) : getDecoding(input);
	}

	function getEncoding(input) {
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

	function getDecoding(input) {
		if (input.split(" ").join("").length % 2 !== 0) {
			return false;
		}

		let message = "";
		for (let i = 0; i < input.length; i += 2) {
			if (input[i] === " ") {
				message += input[i];
				i--;
				continue;
			}
			else if (input[i + 1] === " ") {
				continue;
			}
			const top = Number(input[i]);
			const side = Number(input[i + 1]);
			let charCode = ((side - 1) * 5) + top + 96;
			if (charCode === 105 || charCode === 106) message += "(i/j)";
			if (charCode >= 106) charCode++;
			message += String.fromCharCode(charCode);
		}
		return message;
	}



	return {
		polybius,
	};
})();

module.exports = { polybius: polybiusModule.polybius };
