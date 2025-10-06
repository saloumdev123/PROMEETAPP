package sen.saloum.promeet.services.Impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import sen.saloum.promeet.dto.AbonnementDTO;
import sen.saloum.promeet.mapstracts.AbonnementMapper;
import sen.saloum.promeet.models.Abonnement;
import sen.saloum.promeet.repos.AbonnementRepository;

@Service
public class AbonnementService {

    private final AbonnementRepository abonnementRepository;
    private final AbonnementMapper abonnementMapper;

    public AbonnementService(AbonnementRepository abonnementRepository, AbonnementMapper abonnementMapper) {
        this.abonnementRepository = abonnementRepository;
        this.abonnementMapper = abonnementMapper;
    }

    // Créer ou renouveler un abonnement
    public AbonnementDTO createOrUpdateAbonnement(AbonnementDTO dto) {
        Abonnement abonnement = abonnementMapper.toEntity(dto);
        return abonnementMapper.toDTO(abonnementRepository.save(abonnement));
    }

    // Lister abonnements actifs (paginés)
    public Page<AbonnementDTO> getActiveAbonnements(Pageable pageable) {
        return abonnementRepository.findActiveAbonnements(pageable)
                .map(abonnementMapper::toDTO);
    }

    // Lister abonnements expirés (paginés)
    public Page<AbonnementDTO> getExpiredAbonnements(Pageable pageable) {
        return abonnementRepository.findExpiredAbonnements(pageable)
                .map(abonnementMapper::toDTO);
    }
}
