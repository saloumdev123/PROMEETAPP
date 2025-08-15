package sen.saloum.promeet.notification;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendSubscriptionEmail(JMSReservation jmSubscription) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        messageHelper.setFrom("sensaloumdev@gmail.com");
        messageHelper.setTo(jmSubscription.getEmail());
        messageHelper.setSubject(jmSubscription.getOffreTitre());
        String emailBody = buildEmailBody(jmSubscription);
        messageHelper.setText(emailBody, true);

        mailSender.send(mimeMessage);
    }

    private String buildEmailBody(JMSReservation jmsReservation) {
        return """
<html>
<body style='font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;'>
    <div style='max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);'>
        <h2 style='color: #0073e6;'>Confirmation de votre réservation sur Promeet</h2>
        <p>Bonjour,</p>
        <p>Merci d'avoir effectué une réservation via notre plateforme Promeet. Voici le récapitulatif de votre demande :</p>
        <ul>
            <li><strong>Email :</strong> %s</li>
            <li><strong>Date de la réservation :</strong> %s</li>
            <li><strong>Message :</strong> %s</li>
        </ul>
        <p>Notre équipe traite votre demande et vous contactera sous peu pour confirmer les détails.</p>
        <p style='margin-top: 20px;'>Merci de votre confiance,<br/><strong>L’équipe Promeet</strong></p>
    </div>
</body>
</html>
""".formatted(
                jmsReservation.getEmail(),
                jmsReservation.getOffreTitre(),
                jmsReservation.getDateReservation(),
                jmsReservation.getBody()
        );
    }

}
