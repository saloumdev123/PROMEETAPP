package sen.saloum.promeet.services.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sen.saloum.promeet.dto.MagasinDTO;
import sen.saloum.promeet.mapstracts.MagasinMapper;
import sen.saloum.promeet.models.Magasin;
import sen.saloum.promeet.repos.MagasinRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MagasinService {

    private final MagasinRepository magasinRepository;
    private final MagasinMapper magasinMapper;

    public MagasinService(MagasinRepository magasinRepository, MagasinMapper magasinMapper) {
        this.magasinRepository = magasinRepository;
        this.magasinMapper = magasinMapper;
    }

    // Créer un magasin
    public MagasinDTO createMagasin(MagasinDTO magasinDTO) {
        Magasin magasin = magasinMapper.toEntity(magasinDTO);
        Magasin saved = magasinRepository.save(magasin);
        return magasinMapper.toDTO(saved);
    }

    // Récupérer tous les magasins
    public List<MagasinDTO> getAllMagasins() {
        return magasinRepository.findAll()
                .stream()
                .map(magasinMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Récupérer un magasin par ID
    public Optional<MagasinDTO> getMagasinById(Long id) {
        return magasinRepository.findById(id)
                .map(magasinMapper::toDTO);
    }

    // Mettre à jour un magasin
    public Optional<MagasinDTO> updateMagasin(Long id, MagasinDTO magasinDTO) {
        return magasinRepository.findById(id).map(existing -> {
            existing.setNom(magasinDTO.getNom());
            existing.setLocalisation(magasinDTO.getLocalisation());
            existing.setTelephone(magasinDTO.getTelephone());
            Magasin updated = magasinRepository.save(existing);
            return magasinMapper.toDTO(updated);
        });
    }

    // Supprimer un magasin
    public boolean deleteMagasin(Long id) {
        if (magasinRepository.existsById(id)) {
            magasinRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
