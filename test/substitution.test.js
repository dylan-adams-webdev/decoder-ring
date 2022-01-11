const { expect } = require("chai");
const { substitution } = require("../src/substitution");

describe("substitution", () => {
	describe("validation", () => {
		it("should return false when alphabet not 26 characters", () => {
			const actual = substitution("msg", "abcdefg");
			expect(actual).to.be.false;
		});

		it("should return false when there are duplicates in alphabet", () => {
			const actual = substitution("msg", "abcdeffhijklmnopqrstuvwxyz");
			expect(actual).to.be.false;
		})
	});

	describe("encode", () => {
		it("should correctly translates a given phrase", () => {
			const actual = substitution("msg", "zyxwvutsrqponmlkjihgfedcba");
			const expected = "nht";
			expect(actual).to.equal(expected);
		});

		it("should maintain spaces in message", () => {
			const actual = substitution("msg sent", "zyxwvutsrqponmlkjihgfedcba");
			const expected = "nht hvmg";
			expect(actual).to.equal(expected);
		});

		it("should ignore capital letters", () => {
			const upper = substitution("MSG", "zyxwvutsrqponmlkjihgfedcba");
			const lower = substitution("msg", "zyxwvutsrqponmlkjihgfedcba");
			expect(upper).to.equal(lower);
		});
	});

	describe("decode", () => {
		it("should decode a properly encoded message", () => {
			const message = "msg sent";
			const encodedMessage = substitution(message, "zyxwvutsrqponmlkjihgfedcba");
			const decodedMessage = substitution(encodedMessage, "zyxwvutsrqponmlkjihgfedcba", false);
			expect(decodedMessage).to.equal(message);
		});
	});
});