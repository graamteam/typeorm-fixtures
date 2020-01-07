import { IParser } from '../interface';
export declare class FakerParser implements IParser {
    /**
     * @type {number}
     */
    priority: number;
    /**
     * @param {string} value
     * @return {boolean}
     */
    isSupport(value: string): boolean;
    /**
     * @param {string} value
     * @return {any}
     */
    parse(value: string): any;
}
