import { IDataParser, IFixture } from './interface';
export declare class Parser implements IDataParser {
    private parsers;
    constructor();
    /**
     * @param {object | any} data
     * @param {IFixture} fixture
     * @param entities
     * @return {any}
     */
    parse(data: object | any, fixture: IFixture, entities: any): any;
}
