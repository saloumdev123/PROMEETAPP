package sen.saloum.promeet.services.Impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sen.saloum.promeet.dto.UtilisateurDTO;
import sen.saloum.promeet.mapstructs.UtilisateurMapper;
import sen.saloum.promeet.models.Utilisateur;
import sen.saloum.promeet.repos.UtilisateurRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UtilisateurServiceImpl  {

    private final UtilisateurRepository utilisateurRepository;
    private final UtilisateurMapper utilisateurMapper;
    private final PasswordEncoder passwordEncoder;

    public UtilisateurServiceImpl(UtilisateurRepository utilisateurRepository, UtilisateurMapper utilisateurMapper, PasswordEncoder passwordEncoder) {
        this.utilisateurRepository = utilisateurRepository;
        this.utilisateurMapper = utilisateurMapper;
        this.passwordEncoder = passwordEncoder;
    }

    // Créer un utilisateur
    public UtilisateurDTO createUtilisateur(UtilisateurDTO dto) {
        Utilisateur utilisateur = utilisateurMapper.toEntity(dto);

        // ⚠️ Toujours encoder le mot de passe
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            utilisateur.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        Utilisateur saved = utilisateurRepository.save(utilisateur);
        return utilisateurMapper.toDto(saved);
    }


    // Récupérer un utilisateur par ID
    public UtilisateurDTO getUtilisateurById(Long id) {
        return utilisateurRepository.findById(id)
                .map(utilisateurMapper::toDto)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec id : " + id));
    }

    // Récupérer tous les utilisateurs
    public List<UtilisateurDTO> getAllUtilisateurs() {
        return utilisateurRepository.findAll()
                .stream()
                .map(utilisateurMapper::toDto)
                .collect(Collectors.toList());
    }

    // Mettre à jour un utilisateur
    public UtilisateurDTO updateUtilisateur(Long id, UtilisateurDTO dto) {
        Utilisateur existing = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec id : " + id));

        existing.setNom(dto.getNom());
        existing.setPrenom(dto.getPrenom());
        existing.setEmail(dto.getEmail());
        existing.setTelephone(dto.getTelephone());
        existing.setRole(dto.getRole());
        existing.setMetier(dto.getMetier());
        existing.setAdresse(dto.getAdresse());

        // ⚠️ Ne mettre à jour le password que si fourni
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            existing.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        existing.setNumeroIdentification(dto.getNumeroIdentification());
        existing.setTypeIdentification(dto.getTypeIdentification());
        existing.setTypePartenaire(dto.getTypePartenaire());

        Utilisateur updated = utilisateurRepository.save(existing);
        return utilisateurMapper.toDto(updated);
    }


    // Supprimer un utilisateur
    public void deleteUtilisateur(Long id) {
        if (!utilisateurRepository.existsById(id)) {
            throw new RuntimeException("Utilisateur non trouvé avec id : " + id);
        }
        utilisateurRepository.deleteById(id);
    }
}
