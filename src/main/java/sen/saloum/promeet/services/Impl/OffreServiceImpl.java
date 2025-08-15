package sen.saloum.promeet.services.Impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sen.saloum.promeet.dto.OffreDTO;
import sen.saloum.promeet.mapstracts.OffreMapper;
import sen.saloum.promeet.models.Offre;
import sen.saloum.promeet.models.Utilisateur;
import sen.saloum.promeet.repos.OffreRepository;
import sen.saloum.promeet.repos.UtilisateurRepository;
import sen.saloum.promeet.services.OffreService;

import java.util.List;

@Service
@Transactional
public class OffreServiceImpl implements OffreService {

    private final OffreRepository offreRepository;
    private final OffreMapper offreMapper;
    private final UtilisateurRepository utilisateurRepository;

    public OffreServiceImpl(OffreRepository offreRepository, OffreMapper offreMapper, UtilisateurRepository utilisateurRepository) {
        this.offreRepository = offreRepository;
        this.offreMapper = offreMapper;
        this.utilisateurRepository = utilisateurRepository;
    }

    @Override
    public OffreDTO createOffre(OffreDTO offreDto) {
        Offre offre = offreMapper.toEntity(offreDto);

        // Charger le prestataire complet
        if (offreDto.getPrestataireId() != null) {
            Utilisateur prestataire = utilisateurRepository.findById(offreDto.getPrestataireId())
                    .orElseThrow(() -> new EntityNotFoundException("Prestataire non trouvé avec id " + offreDto.getPrestataireId()));
            offre.setPrestataire(prestataire);
        }

        Offre saved = offreRepository.save(offre);
        return offreMapper.toDTO(saved);
    }


    @Override
    public OffreDTO updateOffre(Long id, OffreDTO offreDto) {
        Offre existing = offreRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Offre introuvable avec id " + id));
        Offre updated = offreMapper.toEntity(offreDto);
        updated.setId(existing.getId());
        return offreMapper.toDTO(offreRepository.save(updated));
    }
    @Override
    public List<OffreDTO> searchOffresAvancee(String categorie, Double minPrix, Double maxPrix, String localisation) {
        return offreMapper.toDTOList(
                offreRepository.searchOffres(categorie, minPrix, maxPrix, localisation)
        );
    }

    @Override
    public void deleteOffre(Long id) {
        if (!offreRepository.existsById(id)) {
            throw new EntityNotFoundException("Offre introuvable avec id " + id);
        }
        offreRepository.deleteById(id);
    }

    @Override
    public OffreDTO getOffreById(Long id) {
        return offreRepository.findById(id)
                .map(offreMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Offre introuvable avec id " + id));
    }

    @Override
    public List<OffreDTO> getAllOffres() {
        return offreMapper.toDTOList(offreRepository.findAll());
    }

    @Override
    public List<OffreDTO> searchOffres(String keyword) {
        // Si keyword est vide, retourner toutes les offres
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllOffres();
        }
        return offreMapper.toDTOList(
                offreRepository.findByLocalisationPrestataire(keyword)
        );
    }

    public List<OffreDTO> getOffresByPrestataire(Long prestataireId) {
        return offreMapper.toDTOList(offreRepository.findByPrestataire(prestataireId));
    }
}
