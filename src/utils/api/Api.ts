import { TApiData } from '../../types/TApiData';
import axios from 'axios';
import { TContactInfo, TApiCheckNumber } from '../../types/TContactInfo';
import { TReceiveNoteMessageExtText, TReceiveNoteMessageText, TResponseDeleteNotification, TSendMessage, TSendMessageAnswer } from '../../types/TMessage';

const host = process.env.REACT_APP_HOST!;

class Api {
  host: string;
  id: string | undefined;
  token: string | undefined;
  constructor({ host }: Omit<TApiData, 'idInstance' | 'apiTokenInstance'>) {
    this.host = host;
  }

  _checkAccount({ apiTokenInstance, idInstance }: Omit<TApiData, 'host'>): Promise<{ stateInstance: "authorized" | string }> {
    return axios.get(`${this.host}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`).then(({ data }) => data);
  }

  login({ apiTokenInstance, idInstance }: Omit<TApiData, 'host'>) {
    return this._checkAccount({ apiTokenInstance, idInstance }).then(({ stateInstance }) => {
      return stateInstance === 'authorized'
    })
  }

  set apiData({ apiTokenInstance, idInstance }: Omit<TApiData, 'host'>) {
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

  sendMessage({ chatId, message }: TSendMessage): Promise<TSendMessageAnswer> {
    return axios.post(this._urlRequest('sendMessage'), { chatId, message }).then(({ data }) => data);
  }

  receiveNotification(): Promise<| TReceiveNoteMessageText | TReceiveNoteMessageExtText | null> {
    return axios.get(this._urlRequest('receiveNotification')).then(({ data }) => data);
  }

  deleteNotification(id: number): Promise<TResponseDeleteNotification> {
    return axios.delete(`${this._urlRequest('deleteNotification')}/${id}`).then(({ data }) => data);
  }
}

export const api = new Api({ host });
