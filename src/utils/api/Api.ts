import { TApiData } from '../../types/TApiData';
import axios from 'axios';
import { TContactInfo, TApiCheckNumber } from '../../types/TContactInfo';
import { TSendMessage, TSendMessageAnswer } from '../../types/TMessage';

export default class Api {
  host: string;
  id: string;
  token: string;

  constructor({ host, idInstance, apiTokenInstance }: TApiData) {
    this.host = host;
    this.id = idInstance;
    this.token = apiTokenInstance;
  }

  _urlRequest(a: string) {
    return `${this.host}/waInstance${this.id}/${a}/${this.token}`
  }

  getContact(number: string): Promise<TContactInfo> {
    return axios
      .post(this._urlRequest('GetContactInfo'), {
        chatId: `${number}@c.us`,
      })
      .then(({ data }) => data);
  }

  checkNumber(number: string): Promise<TApiCheckNumber> {
    return axios
      .post(this._urlRequest('checkWhatsapp'), {
        phoneNumber: number,
      })
      .then(({ data }) => data);
  }

  sendMessage({chatId, message}:TSendMessage): Promise<TSendMessageAnswer> {
    return axios.post(this._urlRequest('sendMessage'), { chatId, message }).then(({ data }) => data);
  }
}
