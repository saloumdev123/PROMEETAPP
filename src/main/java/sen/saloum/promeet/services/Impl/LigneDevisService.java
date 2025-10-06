package sen.saloum.promeet.services.Impl;

import org.springframework.stereotype.Service;
import sen.saloum.promeet.dto.LigneDevisDTO;
import sen.saloum.promeet.mapstracts.LigneDevisMapper;
import sen.saloum.promeet.models.LigneDevis;
import sen.saloum.promeet.repos.LigneDevisRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LigneDevisService {

    private final LigneDevisRepository ligneDevisRepository;
    private final LigneDevisMapper ligneDevisMapper;

    public LigneDevisService(LigneDevisRepository ligneDevisRepository, LigneDevisMapper ligneDevisMapper) {
        this.ligneDevisRepository = ligneDevisRepository;
        this.ligneDevisMapper = ligneDevisMapper;
    }

    /** 🔹 Créer une ligne de devis */
    public LigneDevisDTO create(LigneDevisDTO dto) {
        LigneDevis entity = ligneDevisMapper.toEntity(dto);
        LigneDevis saved = ligneDevisRepository.save(entity);
        return ligneDevisMapper.toDto(saved);
    }

    /** 🔹 Récupérer toutes les lignes de devis */
    public List<LigneDevisDTO> getAll() {
        return ligneDevisRepository.findAll()
                .stream()
                .map(ligneDevisMapper::toDto)
                .collect(Collectors.toList());
    }

    /** 🔹 Récupérer une ligne par ID */
    public LigneDevisDTO getById(Long id) {
        return ligneDevisRepository.findById(id)
                .map(ligneDevisMapper::toDto)
                .orElseThrow(() -> new RuntimeException("LigneDevis non trouvée avec id : " + id));
    }

    /** 🔹 Modifier une ligne existante */
    public LigneDevisDTO update(Long id, LigneDevisDTO dto) {
        LigneDevis existing = ligneDevisRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("LigneDevis non trouvée"));
        LigneDevis updated = ligneDevisMapper.toEntity(dto);
        updated.setId(existing.getId());
        LigneDevis saved = ligneDevisRepository.save(updated);
        return ligneDevisMapper.toDto(saved);
    }

    /** 🔹 Supprimer une ligne de devis */
    public void delete(Long id) {
        if (!ligneDevisRepository.existsById(id)) {
            throw new RuntimeException("LigneDevis introuvable pour suppression");
        }
        ligneDevisRepository.deleteById(id);
    }
}
