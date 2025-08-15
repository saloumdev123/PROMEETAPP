package sen.saloum.promeet.services.Impl;

import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import sen.saloum.promeet.dto.ReservationDTO;
import sen.saloum.promeet.enums.StatutReservation;
import sen.saloum.promeet.mapstracts.ReservationMapper;
import sen.saloum.promeet.models.Offre;
import sen.saloum.promeet.models.Reservation;
import sen.saloum.promeet.models.Utilisateur;
import sen.saloum.promeet.notification.JMSReservationService;
import sen.saloum.promeet.repos.OffreRepository;
import sen.saloum.promeet.repos.ReservationRepository;
import sen.saloum.promeet.repos.UtilisateurRepository;
import sen.saloum.promeet.services.ReservationService;

import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final ReservationMapper reservationMapper;
    private final JMSReservationService jmsReservationService;
    private final UtilisateurRepository utilisateurRepository;
    private final OffreRepository offreRepository;

    public ReservationServiceImpl(
            ReservationRepository reservationRepository,
            ReservationMapper reservationMapper,
            JMSReservationService jmsReservationService,
            UtilisateurRepository utilisateurRepository,
            OffreRepository offreRepository) {
        this.reservationRepository = reservationRepository;
        this.reservationMapper = reservationMapper;
        this.jmsReservationService = jmsReservationService;
        this.utilisateurRepository = utilisateurRepository;
        this.offreRepository = offreRepository;
    }

    @Override
    public ReservationDTO createReservation(ReservationDTO reservationDto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            throw new EntityNotFoundException("Impossible de récupérer le client connecté");
        }

        String email;

        // Le principal peut être ton objet UserDetails ou ton DTO Utilisateur
        if (auth.getPrincipal() instanceof org.springframework.security.core.userdetails.User userDetails) {
            email = userDetails.getUsername(); // ici c'est l'email
        } else if (auth.getPrincipal() instanceof Utilisateur utilisateur) {
            email = utilisateur.getEmail();
        } else {
            throw new EntityNotFoundException("Impossible de récupérer l'email du client connecté");
        }

        Utilisateur client = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Client introuvable avec l'email : " + email));

        // Mapper la DTO en entité
        Reservation reservation = reservationMapper.toEntity(reservationDto);

        // Associer le client
        reservation.setClient(client);

        // Statut par défaut
        reservation.setStatut(StatutReservation.EN_ATTENTE);

        // Associer l'offre complète
        Offre offre = offreRepository.findById(reservationDto.getOffreId())
                .orElseThrow(() -> new EntityNotFoundException("Offre introuvable avec l'id : " + reservationDto.getOffreId()));
        reservation.setOffre(offre);

        // Sauvegarder
        Reservation saved = reservationRepository.save(reservation);

        return reservationMapper.toDTO(saved);
    }



    @Override
    public ReservationDTO updateReservation(Long id, ReservationDTO reservationDto) throws MessagingException {
        Reservation existing = reservationRepository.findByIdWithOffre(id)
                .orElseThrow(() -> new EntityNotFoundException("Reservation not found with id " + id));

        // Sauvegarder l'ancien statut
        StatutReservation oldStatus = existing.getStatut();

        // L'admin peut seulement changer le statut
        existing.setStatut(reservationDto.getStatut());

        Reservation saved = reservationRepository.save(existing);

        // Envoi d'email si statut passe EN_ATTENTE -> CONFIRMEE
        if (saved.getStatut() == StatutReservation.CONFIRMEE
                && oldStatus != StatutReservation.CONFIRMEE) {
            if (saved.getClient() != null && saved.getClient().getEmail() != null) {
                jmsReservationService.processReservation(reservationMapper.toDTO(saved), saved.getId());
            }
        }

        return reservationMapper.toDTO(saved);
    }

    @Override
    public ReservationDTO getReservationById(Long id) {
        Reservation reservation = reservationRepository.findByIdWithOffre(id)
                .orElseThrow(() -> new EntityNotFoundException("Reservation not found with id " + id));
        return reservationMapper.toDTO(reservation);
    }

    @Override
    public List<ReservationDTO> getAllReservations() {
        return reservationMapper.toDTOList(reservationRepository.findAll());
    }

    @Override
    public boolean deleteReservation(Long id) {
        reservationRepository.deleteById(id);
        return false;
    }

    @Override
    public List<ReservationDTO> getReservationsByUtilisateur(Long utilisateurId) {
        return reservationMapper.toDTOList(reservationRepository.findByClientId(utilisateurId));
    }
}
