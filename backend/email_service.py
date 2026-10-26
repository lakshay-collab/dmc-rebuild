import smtplib
import ssl
import os
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

logger = logging.getLogger("email_service")


def _build_thank_you_html(first_name: str, agency_name: str, destination: str = None, source_page: str = None) -> str:
    is_service = not destination or not source_page or source_page.lower() in ("homepage hero", "signup page") or source_page.lower().startswith("service")

    if is_service:
        heading = "Welcome to the Hi DMC Partner Network"
        body = f"""
        <p>Hi {first_name},</p>
        <p>Thank you for registering <strong>{agency_name}</strong> with Hi DMC. We're excited to have you on board.</p>
        <p>Our partner success team will reach out within <strong>24 to 48 hours</strong> to activate your agent account and walk you through our platform, live rates, and how we can help you sell 45+ destinations more effectively.</p>
        <p>In the meantime, feel free to explore our destinations and services at <a href="https://hidmc.in" style="color:#174358;font-weight:600;">hidmc.in</a></p>
        """
    else:
        heading = "We've Received Your Inquiry"
        dest_text = f" for <strong>{destination}</strong>" if destination else ""
        body = f"""
        <p>Hi {first_name},</p>
        <p>Thank you for your inquiry{dest_text} on behalf of <strong>{agency_name}</strong>.</p>
        <p>Our destination specialists are already working on a custom proposal for you. Expect to hear back within <strong>24 to 48 hours</strong> with detailed itineraries, rates, and availability.</p>
        <p>If you need anything urgent, reply to this email or reach us at <a href="mailto:partners@hidmc.in" style="color:#174358;font-weight:600;">partners@hidmc.in</a></p>
        """

    return f"""<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f7f8fa;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f8fa;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr><td style="background-color:#0D1B2A;padding:32px 40px;border-radius:12px 12px 0 0;">
          <h1 style="margin:0;font-size:22px;color:#ffffff;font-weight:700;letter-spacing:0.5px;">HI DMC</h1>
          <p style="margin:4px 0 0;font-size:11px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:2px;">Destination Management Company</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background-color:#ffffff;padding:36px 40px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">
          <h2 style="margin:0 0 20px;font-size:20px;color:#0D1B2A;font-weight:600;">{heading}</h2>
          <div style="font-size:14px;color:#444444;line-height:1.7;">
            {body}
          </div>
        </td></tr>

        <!-- CTA -->
        <tr><td style="background-color:#ffffff;padding:0 40px 36px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="background-color:#174358;border-radius:8px;padding:12px 28px;">
              <a href="https://hidmc.in" style="color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;">Explore Destinations</a>
            </td>
          </tr></table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background-color:#f0f0f0;padding:24px 40px;border-radius:0 0 12px 12px;border:1px solid #e8e8e8;border-top:none;">
          <p style="margin:0 0 6px;font-size:12px;color:#888888;">Hi Tours India Pvt. Ltd.</p>
          <p style="margin:0 0 4px;font-size:11px;color:#aaaaaa;">Vatika City Point, Sector 49, Gurgaon, Haryana 122002</p>
          <p style="margin:0;font-size:11px;color:#aaaaaa;">This is an automated message. Please do not reply directly to this email.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>"""


async def send_thank_you_email(to_email: str, first_name: str, agency_name: str, destination: str = None, source_page: str = None):
    """Send a thank-you email after a lead submission. Runs in background."""
    host = os.environ.get("SMTP_HOST")
    port = int(os.environ.get("SMTP_PORT", 587))
    user = os.environ.get("SMTP_USER")
    password = os.environ.get("SMTP_PASS")
    from_name = os.environ.get("SMTP_FROM_NAME", "HI DMC")
    from_email = os.environ.get("SMTP_FROM_EMAIL", user)

    if not all([host, user, password]):
        logger.warning("SMTP not configured, skipping email")
        return False

    is_service = not destination or not source_page or source_page.lower() in ("homepage hero", "signup page") or source_page.lower().startswith("service")
    subject = "Welcome to Hi DMC Partner Network" if is_service else f"Hi DMC - We've Received Your Inquiry"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"{from_name} <{from_email}>"
    msg["To"] = to_email

    html_content = _build_thank_you_html(first_name, agency_name, destination, source_page)
    msg.attach(MIMEText(html_content, "html"))

    try:
        context = ssl.create_default_context()
        with smtplib.SMTP(host, port, timeout=15) as server:
            server.starttls(context=context)
            server.login(user, password)
            server.send_message(msg)
        logger.info(f"Thank-you email sent to {to_email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email to {to_email}: {e}")
        return False
