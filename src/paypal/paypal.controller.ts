import { Body, Controller, Post, Query } from '@nestjs/common';
import { PaypalService } from './paypal.service';

@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Post('create-order')
  async createOrder(@Body() orderData: any) {
    return await this.paypalService.createOrder();
  }

  @Post('capture-order')
  async completeOrder(@Query('token') orderId: string) {
    return await this.paypalService.capturePayment(orderId);
  }
}
