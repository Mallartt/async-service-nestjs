import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface Bill { denomination_id: number; denomination: number; count: number; }
export interface RequestData { request_id: string; exchange_rate: number; bills: Bill[]; }

export function calculateBillValues(bills: Bill[], rate: number) {
  return bills.map((b) => ({
    denomination_id: b.denomination_id,
    subtotal_rub: b.denomination * b.count * rate,
  }));
}

@Injectable()
export class ExchangeService {
  private readonly MAIN_SERVICE_URL = 'http://localhost:3001/api/exchange_result';
  private readonly SECRET_TOKEN = 'MY_SECRET_TOKEN'; // Ваш токен

  async sendExchangeResult(data: RequestData) {
    const delay = Math.random() * 5000 + 5000;
    await new Promise(resolve => setTimeout(resolve, delay));


    await axios.put(this.MAIN_SERVICE_URL, {
      token: this.SECRET_TOKEN,
      request_id: data.request_id,
      breakdown: calculateBillValues(data.bills, data.exchange_rate),
    });
  }
}