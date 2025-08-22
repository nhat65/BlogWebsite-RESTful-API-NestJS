import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CACHE_PAYPAL_TOKEN, CACHE_TTL } from 'src/constant/paypal';

@Injectable()
export class PaypalService {
  private readonly baseUrl = process.env.PAYPAL_BASE_URL ?? '';
  private readonly clientId = process.env.PAYPAL_CLIENT_ID ?? '';
  private readonly clientSecret = process.env.PAYPAL_SECRET ?? '';
  private readonly logger = new Logger(PaypalService.name);

  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async getAccessToken() {
    const cachedPaypalToken = await this.cacheManager.get(
      CACHE_PAYPAL_TOKEN,
    );
    if (cachedPaypalToken) return cachedPaypalToken;

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.baseUrl}/v1/oauth2/token`,
          'grant_type=client_credentials',
          {
            auth: {
              username: this.clientId,
              password: this.clientSecret,
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        ),
      );

      await this.cacheManager.set(
        CACHE_PAYPAL_TOKEN,
        response.data.access_token,
        CACHE_TTL,
      );

      return response.data.access_token;
    } catch (error) {
      this.logger.error('Failed to get PayPal access token', {
        error: error.response?.data || error.message,
      });
      throw new Error(`PayPal authentication failed`);
    }
  }

  async createOrder() {
    try {
      const accessToken = await this.getAccessToken();
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.baseUrl}/v2/checkout/orders`,
          {
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: '200.00',
                  breakdown: {
                    item_total: {
                      currency_code: 'USD',
                      value: '200.00',
                    },
                  },
                },
                items: [
                  {
                    name: 'NodeJS',
                    description: 'ABC',
                    quantity: '2',
                    unit_amount: {
                      currency_code: 'USD',
                      value: '100.00',
                    },
                    category: 'DIGITAL_GOODS',
                  },
                ],
              },
            ],
            application_context: {
              brand_name: 'Your Store',
              return_url: 'https://google.com',
              cancel_url: 'https://google.com',
              shipping_preference: 'NO_SHIPPING',
              user_action: 'PAY_NOW',
            },
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
              Prefer: 'return=representation',
            },
          },
        ),
      );

      return response.data.links.find((link) => link.rel === 'approve');
    } catch (error) {
      this.logger.error('Failed to create PayPal order', {
        error: error.response?.data || error.message,
      });
      throw new Error(
        `Failed to create order: ${error.response?.data?.message || error.message}`,
      );
    }
  }

  async capturePayment(orderId: string): Promise<any> {
    try {
      const accessToken = await this.getAccessToken();
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.baseUrl}/v2/checkout/orders/${orderId}/capture`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
              Prefer: 'return=representation',
            },
          },
        ),
      );

      return response.data;
    } catch (error) {
      this.logger.error('Failed to capture payment', {
        orderId,
        error: error.response?.data || error.message,
      });
      throw new Error(
        `Failed to capture payment: ${error.response?.data?.message || error.message}`,
      );
    }
  }
}
