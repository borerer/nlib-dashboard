import KV from "../models/KV";

class API {
  base: string;

  constructor(base: string) {
    this.base = base;
  }

  async fetchJSON(path: string): Promise<any> {
    const res = await fetch(this.base + path);
    return await res.json();
  }

  async getKVList(): Promise<KV[]> {
    const j = await this.fetchJSON('/api/app/kv/recent');
    return j.map((kv: any) => {
        return new KV(kv['key'], kv['value'], kv['updated']); 
    });
  }

  async saveKV(kv: KV): Promise<void> {
    await fetch(this.base + '/api/app/kv/set', {
        method: 'POST',
        body: JSON.stringify({
            'key': kv.key,
            'value': kv.value
        })
    });
  }
};

const api = new API('');

export default api;