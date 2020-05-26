"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builder = void 0;
const fs = require("fs");
const path = require("path");
const lodash_1 = require("lodash");
class Builder {
    constructor(connection, parser) {
        this.connection = connection;
        this.parser = parser;
        this.entities = {};
    }
    /**
     * @param {IFixture} fixture
     * @return {any}
     */
    build(fixture) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.connection.getRepository(fixture.entity);
            const entity = repository.create();
            let data = this.parser.parse(fixture.data, fixture, this.entities);
            let call;
            /* istanbul ignore else */
            if (data.__call) {
                if (!lodash_1.isObject(data.__call) || lodash_1.isArray(data.__call)) {
                    throw new Error('invalid "__call" parameter format');
                }
                call = data.__call;
                delete data.__call;
            }
            const callExecutors = () => __awaiter(this, void 0, void 0, function* () {
                /* istanbul ignore else */
                if (call) {
                    for (const [method, values] of Object.entries(call)) {
                        /* istanbul ignore else */
                        if (entity[method]) {
                            yield entity[method].apply(entity, this.parser.parse(values instanceof Array ? values : [values], fixture, this.entities));
                        }
                    }
                }
            });
            if (fixture.processor) {
                const processorPathWithoutExtension = path.join(path.dirname(fixture.processor), path.basename(fixture.processor, path.extname(fixture.processor)));
                if (!fs.existsSync(processorPathWithoutExtension) &&
                    !fs.existsSync(processorPathWithoutExtension + '.ts') &&
                    !fs.existsSync(processorPathWithoutExtension + '.js')) {
                    throw new Error(`Processor "${fixture.processor}" not found`);
                }
                const processor = require(processorPathWithoutExtension).default;
                const processorInstance = new processor();
                /* istanbul ignore else */
                if (typeof processorInstance.preProcess === 'function') {
                    data = yield processorInstance.preProcess(fixture.name, data);
                }
                for (const key in data) {
                    if (data[key]) {
                        entity[key] = data[key];
                    }
                }
                /* istanbul ignore else */
                if (typeof processorInstance.postProcess === 'function') {
                    yield processorInstance.postProcess(fixture.name, entity);
                }
            }
            else {
                for (const key in data) {
                    if (data[key]) {
                        entity[key] = data[key];
                    }
                }
            }
            this.entities[fixture.name] = entity;
            return entity;
        });
    }
}
exports.Builder = Builder;
//# sourceMappingURL=Builder.js.map