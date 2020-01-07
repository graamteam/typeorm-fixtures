"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker = require("faker");
class FakerParser {
    constructor() {
        /**
         * @type {number}
         */
        this.priority = 70;
    }
    /**
     * @param {string} value
     * @return {boolean}
     */
    isSupport(value) {
        return /\{\{.+\}\}/gm.test(value);
    }
    /**
     * @param {string} value
     * @return {any}
     */
    parse(value) {
        const result = faker.fake(value);
        if ((+result).toString() === result) {
            return +result;
        }
        else if (result === 'true' || result === 'false') {
            return result === 'true';
        }
        else {
            return result;
        }
    }
}
exports.FakerParser = FakerParser;
//# sourceMappingURL=FakerParser.js.map