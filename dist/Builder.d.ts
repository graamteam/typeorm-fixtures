import { Connection } from 'typeorm';
import { IDataParser, IFixture } from './interface';
export declare class Builder {
    private readonly connection;
    private readonly parser;
    entities: any;
    constructor(connection: Connection, parser: IDataParser);
    /**
     * @param {IFixture} fixture
     * @return {any}
     */
    build(fixture: IFixture): Promise<any>;
}
