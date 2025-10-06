package sen.saloum.promeet.services.Impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import sen.saloum.promeet.dto.CandidatDTO;
import sen.saloum.promeet.dto.MacrosDTO;
import sen.saloum.promeet.mapstracts.CandidatMapper;
import sen.saloum.promeet.models.Candidat;
import sen.saloum.promeet.models.Macros;
import sen.saloum.promeet.repos.CandidatRepository;

import java.util.Optional;

@Service
public class CandidatService {

    private final CandidatRepository candidatRepository;
    private final CandidatMapper candidatMapper;

    public CandidatService(CandidatRepository candidatRepository, CandidatMapper candidatMapper) {
        this.candidatRepository = candidatRepository;
        this.candidatMapper = candidatMapper;
    }

    // Création d’un candidat
    public CandidatDTO createCandidat(CandidatDTO dto) {
        Candidat candidat = candidatMapper.toEntity(dto);
        return candidatMapper.toDTO(candidatRepository.save(candidat));
    }

    // Récupérer un candidat par ID
    public Optional<CandidatDTO> getCandidatById(Long id) {
        return candidatRepository.findById(id).map(candidatMapper::toDTO);
    }

    // Liste paginée de candidats
    public Page<CandidatDTO> getAllCandidats(Pageable pageable) {
        return candidatRepository.findAll(pageable)
                .map(candidatMapper::toDTO);
    }

    // Recherche par nom ou prénom (paginée)
    public Page<CandidatDTO> searchCandidats(String keyword, Pageable pageable) {
        return candidatRepository.searchByNomOrPrenom(keyword, pageable)
                .map(candidatMapper::toDTO);
    }
    public Optional<CandidatDTO> updateCandidat(Long id, CandidatDTO dto) {
        return candidatRepository.findById(id).map(existing -> {
            Candidat updated = candidatMapper.toEntity(dto);
            updated.setId(existing.getId()); // conserver l’ID
            return candidatMapper.toDTO(candidatRepository.save(updated));
        });
    }
    // Dans CandidatService
    public Optional<CandidatDTO> updateMacros(Long candidatId, MacrosDTO macrosDTO) {
        return candidatRepository.findById(candidatId).map(candidat -> {
            // On applique les changements des macros
            if (candidat.getMacros() == null) {
                candidat.setMacros(new Macros());
            }
            candidat.getMacros().setCv(macrosDTO.getCv());
            candidat.getMacros().setLm(macrosDTO.getLm());
            candidat.getMacros().setCvFibem(macrosDTO.getCvFibem());
            candidat.getMacros().setPriseDeNotes(macrosDTO.getPriseDeNotes());

            // Sauvegarder et renvoyer le DTO
            return candidatMapper.toDTO(candidatRepository.save(candidat));
        });
    }

    // Supprimer
    public void deleteCandidat(Long id) {
        candidatRepository.deleteById(id);
    }
}
