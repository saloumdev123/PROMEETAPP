package sen.saloum.promeet.notification;



import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;
import sen.saloum.promeet.dto.ReservationDTO;

import java.time.OffsetDateTime;

@Service
public class JMSReservationService {


    private final EmailService emailService;

    public JMSReservationService(EmailService emailService) {
        this.emailService = emailService;
    }

    public JMSReservation prepareJMSReservation(ReservationDTO reservationDTO, Long createdId) {
        JMSReservation jMSReservation = new JMSReservation();
        jMSReservation.setEmail(reservationDTO.getEmail());
        jMSReservation.setOffreTitre("Confirmation de votre réservation");
        jMSReservation.setBody("Votre réservation pour l'offre " + reservationDTO.getOffreTitre() + " a été confirmée.");
        jMSReservation.setDateReservation(reservationDTO.getDateReservation());
        return jMSReservation;
    }

    public void processReservation(ReservationDTO reservationDTO, Long createdId) throws MessagingException {
        JMSReservation jmSubscription = prepareJMSReservation(reservationDTO, createdId);
        sendSubscriptionEmail(jmSubscription);
    }
    public void sendSubscriptionEmail(JMSReservation subscription) throws MessagingException {
        emailService.sendSubscriptionEmail(subscription);

    }
}












































































