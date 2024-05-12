import axios from 'axios';
import { RpcMethod, JsonRpcRequest } from './common.ts';
import Client from './Client.ts';

export default class HttpClient extends Client {
  private readonly client;

  constructor(url: string) {
    super(url);
    this.client = axios.create({ baseURL: this.url, method: 'POST' });
  }

  async send<const T extends RpcMethod>(request: JsonRpcRequest<T>): Promise<unknown> {
    const { data } = await this.client({ data: request });

    return data;
  }
}
