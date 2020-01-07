"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class ParameterParser {
    constructor() {
        /**
         * @type {number}
         */
        this.priority = 60;
    }
    /**
     * @type {RegExp}
     */
    get regExp() {
        return /<\{(.+?)\}>/gm;
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
        const chunks = lodash_1.chunk(value.split(this.regExp), 2);
        const result = [];
        for (const [str, parameter] of chunks) {
            result.push(str);
            if (parameter) {
                const parameterValue = lodash_1.get(fixture.parameters, parameter);
                if (parameterValue === undefined) {
                    throw new Error(`Unknown parameter "${parameter}" in ${fixture.name}`);
                }
                result.push(parameterValue);
            }
        }
        return result.join('');
    }
}
exports.ParameterParser = ParameterParser;
//# sourceMappingURL=ParameterParser.js.map