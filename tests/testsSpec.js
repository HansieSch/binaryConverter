describe("converter", function () {
    describe("#stringToUnicode(str)", function () {
        it("should return a correct array of values for string provided", function () {
            expect(converter.stringToUnicode("abcdefghijklmnopqrstuvwxyz"))
                .toEqual([97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107,
                          108, 109, 110, 111, 112, 113, 114, 115, 116, 117,
                          118, 119, 120, 121, 122]);

            expect(converter.stringToUnicode("ABCDEFGHIJKLMNOPQRSTUVWXYZ"))
                .toEqual([65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
                          79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90]);

            expect(converter.stringToUnicode("0123456789"))
                .toEqual([48, 49, 50, 51, 52, 53, 54, 55, 56, 57]);

            expect(converter.stringToUnicode("/*-+`~!@#$%^&*()_+-=[]{}\\|;:\'\",./<>?"))
                .toEqual([47, 42, 45, 43, 96, 126, 33, 64, 35, 36, 37, 94, 38,
                          42, 40, 41, 95, 43, 45, 61, 91, 93, 123, 125, 92,
                          124, 59, 58, 39, 34, 44, 46, 47, 60, 62, 63]);
        });

        it("should return null for non string and empty string values", function () {
            expect(converter.stringToUnicode([])).toBeNull();
            expect(converter.stringToUnicode([89, "dd"])).toBeNull();
            expect(converter.stringToUnicode({})).toBeNull();
            expect(converter.stringToUnicode({name: "john doe"})).toBeNull();
            expect(converter.stringToUnicode(null)).toBeNull();
            expect(converter.stringToUnicode(undefined)).toBeNull();
            expect(converter.stringToUnicode()).toBeNull();
            expect(converter.stringToUnicode(89)).toBeNull();
            expect(converter.stringToUnicode(/d*/g)).toBeNull();
            expect(converter.stringToUnicode(function () { console.log("none"); })).toBeNull();
        });
    });

    describe("#function intToBinary(num, bits, leadingZeros)", function () {
        it("should return the correct number of bits specified and the leading zeros", function () {
            expect(converter.intToBinary(5, 8, true).join("")).toBe("00000101");
            expect(converter.intToBinary(13, 8, true).join("")).toBe("00001101");
            expect(converter.intToBinary(255, 16, true).join("")).toBe("0000000011111111");
            expect(converter.intToBinary(63589, 32, true).join("")).toBe("00000000000000001111100001100101");
            expect(converter.intToBinary(9, 4, true).join("")).toBe("1001");
        });

        it("should return correct binary representation for integer provided", function () {
            expect(converter.intToBinary(5).join("")).toBe("101");
            expect(converter.intToBinary(13).join("")).toBe("1101");
            expect(converter.intToBinary(255).join("")).toBe("11111111");
            expect(converter.intToBinary(63589).join("")).toBe("1111100001100101");
            expect(converter.intToBinary(9).join("")).toBe("1001");
        });

        it("should return null for non integer values", function () {
            expect(converter.intToBinary()).toBeNull();
            expect(converter.intToBinary([])).toBeNull();
            expect(converter.intToBinary({})).toBeNull();
            expect(converter.intToBinary([58])).toBeNull();
            expect(converter.intToBinary({name: "converter"})).toBeNull();
            expect(converter.intToBinary(function () { console.log("null"); })).toBeNull();
            expect(converter.intToBinary("")).toBeNull();
            expect(converter.intToBinary("dfd")).toBeNull();
            expect(converter.intToBinary("485")).toBeNull();
        });
    });

    describe("#intTo8BitBinary(num)", function () {
        it("should return correct binary representation of integer", function () {
            expect(converter.intTo8BitBinary(5).join("")).toBe("00000101");
            expect(converter.intTo8BitBinary(168).join("")).toBe("10101000");
            expect(converter.intTo8BitBinary(255).join("")).toBe("11111111");
            expect(converter.intTo8BitBinary(57).join("")).toBe("00111001");
        });

        it("should return null for non integer values and empty parameters", function () {
            expect(converter.intTo8BitBinary()).toBeNull();
            expect(converter.intTo8BitBinary([])).toBeNull();
            expect(converter.intTo8BitBinary({})).toBeNull();
            expect(converter.intTo8BitBinary([58])).toBeNull();
            expect(converter.intTo8BitBinary({name: "converter"})).toBeNull();
            expect(converter.intTo8BitBinary(function () { console.log("null"); })).toBeNull();
            expect(converter.intTo8BitBinary("")).toBeNull();
            expect(converter.intTo8BitBinary("dfd")).toBeNull();
            expect(converter.intTo8BitBinary("485")).toBeNull();
        });
    });

    describe("#binaryToInt(binaryString)", function () {
        it("should return the correct integer", function () {
            expect(converter.binaryToInt("101")).toBe(5);
            expect(converter.binaryToInt("11111101101")).toBe(2029);
            expect(converter.binaryToInt("1101")).toBe(13);
            expect(converter.binaryToInt("100")).toBe(4);
            expect(converter.binaryToInt("11111111")).toBe(255);
            expect(converter.binaryToInt("1111111111111111")).toBe(65535);
        });

        it("should return null value for empty parameters and non integer values", function () {
            expect(converter.binaryToInt()).toBeNull();
            expect(converter.binaryToInt([])).toBeNull();
            expect(converter.binaryToInt({})).toBeNull();
            expect(converter.binaryToInt([45, "1010011"])).toBeNull();
            expect(converter.binaryToInt({binary: "100101"})).toBeNull();
            expect(converter.binaryToInt(null)).toBeNull();
            expect(converter.binaryToInt(undefined)).toBeNull();
            expect(converter.binaryToInt(/d/g)).toBeNull();
        });
    });

    describe("#stringToBinary(str, leadingZeros)", function () {
        it("should return correct binary to represent the string passed in with leading zeros", function () {
            expect(converter.stringToBinary("Hansie", true))
                .toBe("01001000 01100001 01101110 01110011 01101001 01100101");

            expect(converter.stringToBinary("binary", true))
                .toBe("01100010 01101001 01101110 01100001 01110010 01111001");

            expect(converter.stringToBinary("a simple test ", true))
                .toBe("01100001 00100000 01110011 01101001 01101101 01110000 01101100 01100101 00100000 01110100 01100101 01110011 01110100");

            expect(converter.stringToBinary("No isn't an answer.", true))
                .toBe("01001110 01101111 00100000 01101001 01110011 01101110 00100111 01110100 00100000 01100001 01101110 00100000 01100001 01101110 01110011 01110111 01100101 01110010 00101110");
        });

        it("should return the correct binary code without leading zeros for string passed in", function () {
            expect(converter.stringToBinary("Hansie", false))
                .toBe("1001000 1100001 1101110 1110011 1101001 1100101");

            expect(converter.stringToBinary("binary", false))
                .toBe("1100010 1101001 1101110 1100001 1110010 1111001");

            expect(converter.stringToBinary("a simple test", false))
                .toBe("1100001 100000 1110011 1101001 1101101 1110000 1101100 1100101 100000 1110100 1100101 1110011 1110100");

            expect(converter.stringToBinary("No isn't an answer.", false))
                .toBe("1001110 1101111 100000 1101001 1110011 1101110 100111 1110100 100000 1100001 1101110 100000 1100001 1101110 1110011 1110111 1100101 1110010 101110");
        });

        it("should return null when called with no parameters or it's passed a non string value", function () {
            expect(converter.stringToBinary(null)).toBeNull();
            expect(converter.stringToBinary(undefined)).toBeNull();
            expect(converter.stringToBinary()).toBeNull();
            expect(converter.stringToBinary([])).toBeNull();
            expect(converter.stringToBinary({})).toBeNull();
            expect(converter.stringToBinary(/g/g)).toBeNull();
            expect(converter.stringToBinary([" values" , "more"])).toBeNull();
        });
    });

    describe("#binaryToString(binaryString)", function () {
        it("should return correct string for binary passed in", function () {
            expect(converter.binaryToString("1001000 1100001 1101110 1110011 1101001 1100101"))
                .toBe("Hansie");

            expect(converter.binaryToString("1100010 1101001 1101110 1100001 1110010 1111001"))
                .toBe("binary");

            expect(converter.binaryToString("1100001 100000 1110011 1101001 1101101 1110000 1101100 1100101 100000 1110100 1100101 1110011 1110100"))
                .toBe("a simple test");

            expect(converter.binaryToString("1001110 1101111 100000 1101001 1110011 1101110 100111 1110100 100000 1100001 1101110 100000 1100001 1101110 1110011 1110111 1100101 1110010 101110"))
                .toBe("No isn't an answer.");
        });

        it("should return null for empty string, non string values and when called with no parameters", function () {
            expect(converter.binaryToString("")).toBeNull();
            expect(converter.binaryToString([])).toBeNull();
            expect(converter.binaryToString({})).toBeNull();
            expect(converter.binaryToString(/g/g)).toBeNull();
            expect(converter.binaryToString(null)).toBeNull();
            expect(converter.binaryToString(undefined)).toBeNull();
            expect(converter.binaryToString("")).toBeNull();
        });
    });
});