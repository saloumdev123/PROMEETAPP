package sen.saloum.promeet.services.Impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sen.saloum.promeet.dto.DeveloppeurDTO;
import sen.saloum.promeet.mapstracts.DeveloppeurMapper;
import sen.saloum.promeet.models.Developpeur;
import sen.saloum.promeet.repos.DeveloppeurRepository;
import sen.saloum.promeet.repos.ProjetRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class DeveloppeurService {

    private final DeveloppeurRepository developpeurRepository;
    private final ProjetRepository projetRepository;
    private final DeveloppeurMapper developpeurMapper;

    public DeveloppeurService(DeveloppeurRepository developpeurRepository, 
                              ProjetRepository projetRepository,
                              DeveloppeurMapper developpeurMapper) {
        this.developpeurRepository = developpeurRepository;
        this.projetRepository = projetRepository;
        this.developpeurMapper = developpeurMapper;
    }

    // 🔹 Créer un développeur
    public DeveloppeurDTO create(DeveloppeurDTO dto) {
        Developpeur dev = developpeurMapper.toEntity(dto);
        dev = developpeurRepository.save(dev);
        return developpeurMapper.toDto(dev);
    }

    // 🔹 Mettre à jour un développeur
    public DeveloppeurDTO update(Long id, DeveloppeurDTO dto) {
        Developpeur existing = developpeurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Développeur non trouvé"));
        existing.setNom(dto.getNom());
        existing.setEmail(dto.getEmail());
        existing.setNiveau(dto.getNiveau());
        existing.setSpecialite(dto.getSpecialite());
        existing.setActif(dto.isActif());
        Developpeur updated = developpeurRepository.save(existing);
        return developpeurMapper.toDto(updated);
    }

    // 🔹 Supprimer un développeur
    public void delete(Long id) {
        developpeurRepository.deleteById(id);
    }

    // 🔹 Récupérer tous les développeurs
    public List<DeveloppeurDTO> getAll() {
        return developpeurRepository.findAll()
                .stream()
                .map(developpeurMapper::toDto)
                .collect(Collectors.toList());
    }

    // 🔹 Récupérer un développeur par ID
    public Optional<DeveloppeurDTO> getById(Long id) {
        return developpeurRepository.findById(id).map(developpeurMapper::toDto);
    }

    // 🔹 Recherche par nom
    public List<DeveloppeurDTO> searchByName(String keyword) {
        return developpeurRepository.searchByName(keyword)
                .stream()
                .map(developpeurMapper::toDto)
                .collect(Collectors.toList());
    }

    // 🔹 Recherche globale
    public List<DeveloppeurDTO> searchGlobal(String keyword) {
        return developpeurRepository.searchGlobal(keyword)
                .stream()
                .map(developpeurMapper::toDto)
                .collect(Collectors.toList());
    }

    // 🔹 Récupérer par spécialité
    public List<DeveloppeurDTO> findBySpecialite(String specialite) {
        return developpeurRepository.findBySpecialiteIgnoreCase(specialite)
                .stream()
                .map(developpeurMapper::toDto)
                .collect(Collectors.toList());
    }


}
