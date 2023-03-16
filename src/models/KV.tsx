export default class KV {
    key: string;
    value: string;
    updated: number;

    constructor(key: string, value: string, updated: number) {
        this.key = key;
        this.value = value;
        this.updated = updated;
    }
}