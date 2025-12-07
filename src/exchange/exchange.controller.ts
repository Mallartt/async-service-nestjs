import { Controller, Post, Body, BadRequestException, HttpCode } from '@nestjs/common';
import { ExchangeService } from './exchange.service';

@Controller('api/exchange_async')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Post()
  @HttpCode(200)
  async submitRequest(@Body() body: any) {
    if (!body.request_id || !body.exchange_rate || !body.bills) {
      throw new BadRequestException('Invalid payload');
    }

    this.exchangeService.sendExchangeResult(body);

    return { status: 'ok' };
  }
}