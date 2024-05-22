import axios from 'axios';
import Client from './Client';
import { JsonRpcRequest, RpcMethod } from './common';

export default class HttpClient extends Client {
  private readonly client;

  constructor(url: string) {
    super(url);
    this.client = axios.create({ baseURL: this.url, method: 'POST' });
  }

  protected async send<const T extends RpcMethod>(request: JsonRpcRequest<T>): Promise<unknown> {
    const res = await this.client({ data: request });

    return res.data as unknown;
  }
}
