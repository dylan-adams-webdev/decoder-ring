const { expect } = require("chai");
const { caesar } = require("../src/caesar");

describe("caesar", () => {
	describe("validation", () => {
		it("should return false with 0 shift", () => {
			const actual = caesar("test", 0, true);
			expect(actual).to.be.false;
		});

		it("should return false with no shift value at all", () => {
			const actual = caesar("test", true);
			expect(actual).to.be.false;
		});

		it("should return false with shift value greater than 25", () => {
			const actual = caesar("test", 26, true);
			expect(actual).to.be.false;
		});

		it("should return false with shift value less than -25", () => {
			const actual = caesar("test", -26, true);
			expect(actual).to.be.false;
		});
	});

	describe("encode", () => {
		it("should ignore capital letters", () => {
			const lower = caesar("test", 2, true);
			const upper = caesar("TEST", 2, true);
			expect(upper).to.equal(lower);
		});

		it("should maintain spaces and nonalphabetic symbols", () => {
			const actual = caesar("aa aa 11", 2, true);
			const expected = "cc cc 11";
			expect(actual).to.equal(expected);
		});

		it("should handle shifts past the end of the alphabet", () => {
			const actual = caesar("zz", 2, true);
			const expected = "bb";
			expect(actual).to.equal(expected);
		});

		it("should handle shifts past the beginning of the alphabet", () => {
			const actual = caesar("aa", -2, true);
			const expected = "yy";
			expect(actual).to.equal(expected);
		});
	});

	describe("decode", () => {
		it("should decode a properly encoded message", () => {
			const message = "this message is zonkers!";
			const encodedMessage = caesar(message, 3, true);
			const decodedMessage = caesar(encodedMessage, 3, false);
			expect(decodedMessage).to.equal(message);
		});
	});
});