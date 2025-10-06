package sen.saloum.promeet.services.Impl;

import org.springframework.stereotype.Service;
import sen.saloum.promeet.dto.FournitureDTO;
import sen.saloum.promeet.mapstracts.FournitureMapper;
import sen.saloum.promeet.models.Fourniture;
import sen.saloum.promeet.repos.FournitureRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FournitureService {

    private final FournitureRepository fournitureRepository;
    private final FournitureMapper fournitureMapper;

    public FournitureService(FournitureRepository fournitureRepository, FournitureMapper fournitureMapper) {
        this.fournitureRepository = fournitureRepository;
        this.fournitureMapper = fournitureMapper;
    }

    /** 🔹 Créer une fourniture */
    public FournitureDTO create(FournitureDTO dto) {
        Fourniture entity = fournitureMapper.toEntity(dto);
        Fourniture saved = fournitureRepository.save(entity);
        return fournitureMapper.toDto(saved);
    }

    /** 🔹 Récupérer toutes les fournitures */
    public List<FournitureDTO> getAll() {
        return fournitureRepository.findAll()
                .stream()
                .map(fournitureMapper::toDto)
                .collect(Collectors.toList());
    }

    /** 🔹 Récupérer une fourniture par ID */
    public FournitureDTO getById(Long id) {
        return fournitureRepository.findById(id)
                .map(fournitureMapper::toDto)
                .orElseThrow(() -> new RuntimeException("Fourniture non trouvée avec id : " + id));
    }

    /** 🔹 Modifier une fourniture */
    public FournitureDTO update(Long id, FournitureDTO dto) {
        Fourniture existing = fournitureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fourniture non trouvée"));
        Fourniture updated = fournitureMapper.toEntity(dto);
        updated.setId(existing.getId());
        updated.setDesignation(existing.getDesignation());
        updated.setDevis(existing.getDevis());
        updated.setMontantTotal(existing.getMontantTotal());
        updated.setQuantite(existing.getQuantite());
        updated.setPrixUnitaire(existing.getPrixUnitaire());
        Fourniture saved = fournitureRepository.save(updated);
        return fournitureMapper.toDto(saved);
    }

    /** 🔹 Supprimer une fourniture */
    public void delete(Long id) {
        if (!fournitureRepository.existsById(id)) {
            throw new RuntimeException("Fourniture introuvable pour suppression");
        }
        fournitureRepository.deleteById(id);
    }
}
