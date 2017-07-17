var converter = (function () {
    "use strict";

    // returns an array of unicode values that represent the string.
    function stringToUnicode(str) {

        if (!str || typeof str !== "string") {
            return null;
        }

        var result = [];

        for (var i = 0; i < str.length; i++) {
            result.push(str.codePointAt(i));
        }

        return result;
    }

    // returns an array representation of the num in binary.
    // Automatically adds the leading zeros when converting.
    // This function returns num as a 8-bit binary integer.
    function intTo8BitBinary(num) {
        // Only handles integers below or equal 255.
        if (num > 255 || typeof num !== "number") {
            return null;
        }

        var bi = [128, 64, 32, 16, 8, 4, 2, 1];
        var result = [];

        for (var i = 0; i < bi.length; i++) {
            if (num < bi[i]) {
                result.push(0);
            } else {
                num -= bi[i];
                result.push(1);
            }
        }

        return result;
    }

    // bits - Set the number of bits for the num.
    // leadingZeros - default: false, If set to true the leadingZeros in binary
    // will be added.
    function intToBinary(num, bits, leadingZeros) {

        var result = [];
        var started = leadingZeros ? leadingZeros : false;
        var numBits = bits ? bits : numOfBitsNeeded(num);

        if (num >= Math.pow(2, numBits) || typeof num !== "number") {
            return null;
        }

        for (var i = numBits - 1; i >= 0; i--) {

            // If binary position greater than num
            if (Math.pow(2, i) > num) {
                // if the first bit(1) has been set fill in between with zeros.
                if (started) {
                    result[i] = 0;
                }
            } else if (num > 0) {
                // first 1 has been set.
                if (!started) started = true;

                // update num.
                num -= Math.pow(2, i);

                // set bit
                result[i] = 1;
            }
        }

        //console.log(result.join(""), result.reverse().join(""));
        // for loop starts by setting the first bits into the array.
        // Thus result contains the reverse of the actual binary code.
        // Reverse result and return it as the correct code.
        //console.log(result.reverse().join(""));
        result.reverse()
        return result;
    }

    // Minimum number of bits needed to contain an integer.
    // Returned integer will always be a divisible by 8
    function numOfBitsNeeded(num) {
        for (var i = 8; i <= 64; i += 8) {
            if (num < Math.pow(2, i)) {
                return i;
            }
        }
    }

    // convert binary integer to decimal.
    // binary is passed in as a string.
    // possible input = "1100101";
    function binaryToInt(binaryString) {
        var result = 0;

        if (typeof binaryString !== "string"
            || !binaryString
            || binaryString.search(/[2-9a-zA-Z]/g) !== -1) {
            return null;
        }

        // reverse the string so the for loop can start at 2^0.
        // Since the last characters of the binary digit is the most 
        // important and consistent.
        var tempArr = binaryString.split("").reverse();

        for (var i = 0; i < tempArr.length; i++) {
            if (tempArr[i] === "1") {
                result += Math.pow(2, i);
            }
        }

        return result;
    }

    // Returns a binary string the string passed in.
    // leadingZeros - specifies whether user wants leading zeros to be added 
    // in binary code.
    function stringToBinary(str, leadingZeros) {

        if (!str
            || typeof str !== "string"
            || !str.trim()) {
            return null;
        }

        var leadingZeros = leadingZeros || false;

        var unicodeValues = stringToUnicode(str.trim());
        var result = [];

        for (let val of unicodeValues) {
            result.push(intToBinary(val, null, leadingZeros).join(""));
        }   

        //console.log(result.join(" "));
        return result.join(" ");
    }

    // Converts binary to string.
    function binaryToString(binaryString) {

        if (!binaryString
            || typeof binaryString !== "string"
            || !binaryString.trim()) {
            return null;
        }

        var binary = binaryString.split(" ");
        var unicodeValues = [];
        var result = "";

        for (let bi of binary) {
            var str = bi.trim();

            // Don't bother it it's an empty string.
            if (str === "") {
                continue;
            }

            result += String.fromCharCode(binaryToInt(str));
        }

        return result;
    }

    return {
        binaryToString: binaryToString,
        stringToBinary: stringToBinary,
        binaryToInt: binaryToInt,
        intTo8BitBinary: intTo8BitBinary,
        intToBinary: intToBinary,
        stringToUnicode: stringToUnicode
    }
})();