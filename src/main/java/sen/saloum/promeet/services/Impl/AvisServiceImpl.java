package sen.saloum.promeet.services.Impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sen.saloum.promeet.dto.AvisDTO;
import sen.saloum.promeet.mapstracts.AvisMapper;
import sen.saloum.promeet.models.Avis;
import sen.saloum.promeet.repos.AvisRepository;
import sen.saloum.promeet.services.AvisService;

import java.util.List;

@Service
public class AvisServiceImpl implements AvisService {

    private final AvisRepository avisRepository;
    private final AvisMapper avisMapper;

    public AvisServiceImpl(AvisRepository avisRepository, AvisMapper avisMapper) {
        this.avisRepository = avisRepository;
        this.avisMapper = avisMapper;
    }

    @Override
    public AvisDTO createAvis(AvisDTO avisDto) {
        Avis avis = avisMapper.toEntity(avisDto);
        return avisMapper.toDTO(avisRepository.save(avis));
    }

    @Override
    public AvisDTO updateAvis(Long id, AvisDTO avisDto) {
        Avis existing = avisRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Avis not found with id " + id));
        Avis updated = avisMapper.toEntity(avisDto);
        updated.setId(existing.getId());
        return avisMapper.toDTO(avisRepository.save(updated));
    }

    @Override
    public AvisDTO getAvisById(Long id) {
        return avisRepository.findById(id)
                .map(avisMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Avis not found with id " + id));
    }

    @Override
    public List<AvisDTO> getAllAvis() {
        return avisMapper.toDTOList(avisRepository.findAll());
    }

    @Override
    public void deleteAvis(Long id) {
        avisRepository.deleteById(id);
    }

    @Override
    public List<AvisDTO> getAvisByOffre(Long offreId) {
        return avisMapper.toDTOList(avisRepository.findByOffreId(offreId));
    }
}
