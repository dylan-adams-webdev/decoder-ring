const { expect } = require("chai");
const { polybius } = require("../src/polybius");

describe("polybius", () => {
	describe("encode", () => {
		it("should translate letters i/j to '42'", () => {
			const iEncoding = polybius("i", true);
			const jEncoding = polybius("j", true);
			const expected = "42";
			expect(iEncoding).to.equal(expected);
			expect(jEncoding).to.equal(expected);
		});

		it("should ignore capital letters", () => {
			const upper = polybius("THIS MESSAGE", true);
			const lower = polybius("this message", true);
			expect(upper).to.equal(lower);
		});

		it("should properly encode while maintaining spaces", () => {
			const actual = polybius("this is a message", true);
			const expected = "44324234 4234 11 23513434112251";
			expect(actual).to.equal(expected);
		});
	});

	describe("decode", () => {
		it("should return false if the input length is odd", () => {
			const actual = polybius("423", false);
			expect(actual).to.be.false;
		});

		it("should translate '42' to (i/j)", () => {
			const actual = polybius("42", false);
			const expected = "(i/j)";
			expect(actual).to.equal(expected);
		});

		it("should decode a properly encoded message", () => {
			const message = "This is a message";
			const encodedMessage = polybius(message, true);
			const decodedMessage = polybius(encodedMessage, false);
			const expectedOutput = "th(i/j)s (i/j)s a message";
			expect(decodedMessage).to.equal(expectedOutput);
		});
	});
});
