package sen.saloum.promeet.services.Impl;

import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
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

    public ReservationServiceImpl(ReservationRepository reservationRepository, ReservationMapper reservationMapper, JMSReservationService jmsReservationService, UtilisateurRepository utilisateurRepository, OffreRepository offreRepository) {
        this.reservationRepository = reservationRepository;
        this.reservationMapper = reservationMapper;
        this.jmsReservationService = jmsReservationService;
        this.utilisateurRepository = utilisateurRepository;
        this.offreRepository = offreRepository;
    }

    @Override
    public ReservationDTO createReservation(ReservationDTO reservationDto) {
        Reservation reservation = reservationMapper.toEntity(reservationDto);

        // Statut par défaut
        reservation.setStatut(StatutReservation.EN_ATTENTE);

        // Associer le client complet
        Utilisateur client = utilisateurRepository.findById(reservationDto.getClientId())
                .orElseThrow(() -> new EntityNotFoundException("Client not found with id " + reservationDto.getClientId()));
        reservation.setClient(client);

        // Associer l'offre complète pour éviter les null
        Offre offre = offreRepository.findById(reservationDto.getOffreId())
                .orElseThrow(() -> new EntityNotFoundException("Offre not found with id " + reservationDto.getOffreId()));
        reservation.setOffre(offre);

        Reservation saved = reservationRepository.save(reservation);
        return reservationMapper.toDTO(saved); // Pas d'email envoyé ici !
    }


    @Override
    public ReservationDTO updateReservation(Long id, ReservationDTO reservationDto) throws MessagingException {
        Reservation existing = reservationRepository.findByIdWithOffre(id)
                .orElseThrow(() -> new EntityNotFoundException("Reservation not found with id " + id));

        // Sauvegarder l'ancien statut avant de modifier
        StatutReservation oldStatus = existing.getStatut();

        existing.setStatut(reservationDto.getStatut());

        Reservation saved = reservationRepository.save(existing);

        // Envoi d'email si passage EN_ATTENTE -> CONFIRMEE
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
    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }

    @Override
    public List<ReservationDTO> getReservationsByUtilisateur(Long utilisateurId) {
        return reservationMapper.toDTOList(reservationRepository.findByClientId(utilisateurId));
    }
}
