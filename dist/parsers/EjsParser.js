"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ejs = require("ejs");
class EjsParser {
    constructor() {
        /**
         * @type {number}
         */
        this.priority = 80;
    }
    /**
     * @type {RegExp}
     */
    get regExp() {
        return /<%(.+?)%>/gm;
    }
    /**
     * @param {string} value
     * @return {boolean}
     */
    isSupport(value) {
        return this.regExp.test(value);
    }
    /**
     * @param {string} value
     * @param {IFixture} fixture
     * @return {any}
     */
    parse(value, fixture) {
        return ejs.render(value, fixture);
    }
}
exports.EjsParser = EjsParser;
//# sourceMappingURL=EjsParser.js.map