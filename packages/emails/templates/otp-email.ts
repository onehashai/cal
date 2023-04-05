import { TFunction } from "next-i18next";

import { APP_NAME } from "@calcom/lib/constants";

import { renderEmail } from "../";
import BaseEmail from "./_base-email";

export type OTPEmailProps = {
  otp: string;
};

export default class OtpEmail extends BaseEmail {
  otp : string;
  to=""
  constructor(otpemail:OTPEmailProps ) {
    super();
    console.log(otpemail)
    this.otp = otpemail.otp;
    this.to = otpemail.to
    this.name = "SEND_OTP_EMAIL";
  }

  protected getNodeMailerPayload(): Record<string, unknown> {
    return {
      to: this.to,
      from: `${APP_NAME} <${this.getMailerOptions().from}>`,
      subject: "OneCal Email Verification (OTP) ",
      text: `Thank you for registering for our service. As part of our verification process, we require all new users to confirm their email address. To complete the email verification process, please enter the following One-Time Password (OTP) code: ${this.otp}.

Please note that this OTP code is only valid for a limited time and can only be used once. Do not share this code with anyone, as it is a unique code specifically for your email address verification.

If you did not request this OTP or are having trouble accessing your account, please contact our support team immediately.

Thank you for your cooperation in verifying your email address.

Best regards,
Team OneCal`,
    };
  }
}
