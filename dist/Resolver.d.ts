import { IFixture, IFixturesConfig } from './interface';
export declare class Resolver {
    private stack;
    /**
     * @param fixtureConfigs
     * @return {IFixture[]}
     */
    resolve(fixtureConfigs: IFixturesConfig[]): IFixture[];
    /**
     * @param {string} parentReferenceName
     * @param {any[] | object} propertyList
     * @return {any[]}
     */
    private resolveDependencies;
    /**
     * @param {string} fixtureIdentify
     * @param {string} reference
     * @return {any}
     */
    private resolveReference;
    /**
     * @param {string} fixtureIdentify
     * @param {string} value
     */
    private resolveCurrent;
    /**
     * @param item
     * @return {any[]}
     */
    private resolveDeepDependencies;
}
