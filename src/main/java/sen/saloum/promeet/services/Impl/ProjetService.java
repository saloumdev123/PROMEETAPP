package sen.saloum.promeet.services.Impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sen.saloum.promeet.dto.ProjetDTO;
import sen.saloum.promeet.mapstracts.DeveloppeurMapper;
import sen.saloum.promeet.mapstracts.ProjetMapper;
import sen.saloum.promeet.models.Projet;
import sen.saloum.promeet.repos.DeveloppeurRepository;
import sen.saloum.promeet.repos.ProjetRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProjetService {

        private final ProjetRepository projetRepository;
        private final DeveloppeurRepository developpeurRepository;
        private final ProjetMapper projetMapper;
        private final DeveloppeurMapper developpeurMapper;

        public ProjetService(
                ProjetRepository projetRepository,
                DeveloppeurRepository developpeurRepository,
                ProjetMapper projetMapper,
                DeveloppeurMapper developpeurMapper
        ) {
            this.projetRepository = projetRepository;
            this.developpeurRepository = developpeurRepository;
            this.projetMapper = projetMapper;
            this.developpeurMapper = developpeurMapper;
        }

        // 🔹 Récupérer tous les projets
        public List<ProjetDTO> getAllProjets() {
            return projetRepository.findAll().stream()
                    .map(projet -> {
                        ProjetDTO dto = projetMapper.toDto(projet);

                        // ✅ On remplit le champ developpeurNom au lieu d’un Set<DeveloppeurDTO>
                        dto.setDeveloppeurNom(projet.getDeveloppeurNom());

                        return dto;
                    })
                    .toList();
        }

    // 🔹 Créer un projet (avec un simple nom de développeur)
    public ProjetDTO createProjet(ProjetDTO dto) {
        Projet projet = projetMapper.toEntity(dto);

        // ✅ On gère juste le nom du développeur, plus de liste d'IDs
        projet.setDeveloppeurNom(dto.getDeveloppeurNom());

        Projet saved = projetRepository.save(projet);
        return projetMapper.toDto(saved);
    }

    // 🔹 Mettre à jour un projet (avec un simple nom de développeur)
    public ProjetDTO updateProjet(Long id, ProjetDTO dto) {
        Projet projet = projetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Projet introuvable avec l’ID : " + id));

        projet.setNom(dto.getNom());
        projet.setDescription(dto.getDescription());
        projet.setDateDebut(dto.getDateDebut());
        projet.setDateFin(dto.getDateFin());
        projet.setStatut(dto.getStatut());
        projet.setBudget(dto.getBudget());
        projet.setDeveloppeurNom(dto.getDeveloppeurNom());
        projet.setEmail(dto.getEmail());
        projet.setTelephone(dto.getTelephone());

        // ✅ Nouveau : gestion simple du nom du développeur
        projet.setDeveloppeurNom(dto.getDeveloppeurNom());

        Projet updated = projetRepository.save(projet);
        return projetMapper.toDto(updated);
    }

    // 🔹 Supprimer un projet
        public void delete(Long id) {
            projetRepository.deleteById(id);
        }

    // 🔹 Récupérer un projet par son ID
    public Optional<ProjetDTO> getById(Long id) {
        return projetRepository.findById(id)
                .map(projetMapper::toDto);
    }


    // 🔹 Recherche par nom
        public List<ProjetDTO> searchByNom(String nom) {
            return projetRepository.searchByNom(nom).stream()
                    .map(projetMapper::toDto)
                    .collect(Collectors.toList());
        }

        // 🔹 Recherche globale
        public List<ProjetDTO> searchGlobal(String keyword) {
            return projetRepository.searchGlobal(keyword).stream()
                    .map(projetMapper::toDto)
                    .collect(Collectors.toList());
        }

        // 🔹 Récupérer les projets d’un client
        public List<ProjetDTO> findByClient(Long clientId) {
            return projetRepository.findByClientId(clientId).stream()
                    .map(projetMapper::toDto)
                    .collect(Collectors.toList());
        }



        // 🔹 Filtrer par dates
        public List<ProjetDTO> findByDateRange(LocalDate start, LocalDate end) {
            return projetRepository.findByDateDebutBetween(start, end).stream()
                    .map(projetMapper::toDto)
                    .collect(Collectors.toList());
        }
}
