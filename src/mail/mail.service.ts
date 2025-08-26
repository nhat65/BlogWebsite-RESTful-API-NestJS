import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { mailerConfig } from 'src/config/nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {}
  async onModuleInit() {
    await this.initializeTransporter();
  }

  private async initializeTransporter() {
    try {
      this.transporter = nodemailer.createTransport(mailerConfig);
      await this.transporter.verify();
      this.logger.log('Mail server connection verified successfully');
    } catch (error) {
      this.logger.error('Failed to initialize mail transporter:', error);
      throw error;
    }
  }

  async sendMail(options: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
    from?: string;
  }): Promise<boolean> {
    try {
      const mailOptions = {
        from: options.from || this.configService.get<string>('MAIL_FROM'),
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      };
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email sent: ${info.messageId}`);
      return true;
    } catch (error) {
      this.logger.error('Error sending email:', error);
      return false;
    }
  }

  async sendRejectAppealEmail(user: {
    email: string;
    fullName: string;
    postTitle: string;
  }): Promise<boolean> {
    const subject = 'Response to hidden post complaint!';
    const html = `
     <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
<p><strong>Dear ${user.fullName},</strong></p>
<p>
Thank you for contacting us and submitting a complaint regarding the post
"<em>${user.postTitle}</em>" being hidden on our blogging platform.
</p>
<p>
After carefully reviewing your complaint as well as the process of handling reports from other users,
we have confirmed that the post has been hidden in accordance with the system's <strong>infringement content review process</strong>.
</p>
<p>
Specifically, your post has been reported by many users, and after review,
the admin team determined that the content has signs of violating
<strong>the community policy</strong> that you agreed to when using the service.
</p>
<p>
We understand that hiding posts can affect your experience,
however, this decision was made to ensure a healthy,
positive blogging environment and comply with the established regulations.
</p>
<p>
Therefore, we regret that we <strong>cannot accept your request to restore the post</strong> as you have requested.
</p>
<p>
If you need more information about the specific cause or wish to adjust the content to comply with the policy and repost,
our team is ready to support.
</p>
<p>
Thank you for understanding and accompanying the platform.
</p>
<br>
<p>
<strong>Sincerely,</strong><br>
User Support<br>
<strong>BLOGS</strong>
</p>
</div>
    `;
    return this.sendMail({
      to: user.email,
      subject,
      html,
    });
  }

  async sendResolveAppealEmail(user: {
    email: string;
    fullName: string;
    postTitle: string;
  }): Promise<boolean> {
    const subject = 'Complaint handling results!';
    const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
<p><strong>Dear ${user.fullName},</strong></p>
<p>
Thank you for submitting your complaint regarding the post
"<em>${user.postTitle}</em>" on our blogging platform.
</p>
<p>
After receiving and carefully reviewing the content of the post as well as related reports,
we found that <strong>your complaint is reasonable</strong>.
</p>
<p>
Therefore, we have <strong>reopened your post</strong> and ensured that the content will continue to be displayed normally on the platform.
</p>
<p>
We apologize for any inconvenience that hiding the post may have caused.
At the same time, we always strive to ensure fairness and transparency in the content moderation process.
</p>
<p>
If you have any questions or need further assistance, please do not hesitate to contact us.
</p>
<p>
Thank you for your patience and support in building a positive and respectful blogging community.
</p>
<br>
<p>
<strong>Sincerely,</strong><br>
User Support<br>
<strong>BLOGS</strong>
</p>
</div>
    `;
    return this.sendMail({
      to: user.email,
      subject,
      html,
    });
  }
}
