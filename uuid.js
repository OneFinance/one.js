let UUID = {};

let crypto = globalThis.crypto;
let poolSize = 31 * 128; // 36 chars minus 4 dashes and 1 four
let r = new Uint8Array(poolSize);
crypto.getRandomValues(r);
let j = 0;
let str = "10000000-1000-4000-8000-100000000000";
let len = str.length; // 36
let strs = [];

strs.length = len;
strs[8] = "-";
strs[13] = "-";
strs[18] = "-";
strs[23] = "-";

UUID.v4 = function () {
    let ch;
    let chi;

    for (chi = 0; chi < len; chi += 1) {
        ch = str[chi];
        if ("-" === ch || "4" === ch) {
            strs[chi] = ch;
            continue;
        }

        // no idea why, but this is almost 4x slow if either
        // the increment is moved below or the >= is changed to >
        j += 1;
        if (j >= r.length) {
            r = crypto.randomBytes(poolSize);
            j = 0;
        }

        if ("8" === ch) {
            let variant = r[j] % 4;
            variant += 8;
            strs[chi] = variant.toString(16);
            continue;
        }

        let hex = r[j] % 16;
        strs[chi] = hex.toString(16);
    }

    return strs.join("");
};

export default UUID;
