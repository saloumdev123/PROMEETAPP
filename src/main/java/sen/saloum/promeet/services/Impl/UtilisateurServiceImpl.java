package sen.saloum.promeet.services.Impl;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sen.saloum.promeet.dto.UtilisateurDTO;
import sen.saloum.promeet.enums.Role;
import sen.saloum.promeet.mapstracts.UtilisateurMapper;
import sen.saloum.promeet.models.Utilisateur;
import sen.saloum.promeet.repos.UtilisateurRepository;
import sen.saloum.promeet.services.UtilisateurService;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UtilisateurServiceImpl implements UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private final UtilisateurMapper utilisateurMapper;
    private final PasswordEncoder passwordEncoder;

    public UtilisateurServiceImpl(UtilisateurRepository utilisateurRepository, UtilisateurMapper utilisateurMapper, PasswordEncoder passwordEncoder) {
        this.utilisateurRepository = utilisateurRepository;
        this.utilisateurMapper = utilisateurMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UtilisateurDTO createUtilisateur(UtilisateurDTO utilisateurDto) {
        Utilisateur utilisateur = utilisateurMapper.toEntity(utilisateurDto);

        if (utilisateur.getRole() == null) {
            utilisateur.setRole(Role.CLIENT);
        }
        if (utilisateur.getMotDePasse() != null) {
            utilisateur.setMotDePasse(passwordEncoder.encode(utilisateur.getMotDePasse()));
        }
        Utilisateur saved = utilisateurRepository.save(utilisateur);
        return utilisateurMapper.toDTO(saved);
    }


    @Override
    public UtilisateurDTO updateUtilisateur(Long id, UtilisateurDTO utilisateurDto) {
        Utilisateur existing = utilisateurRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur introuvable avec id " + id));

        // Mise à jour des champs manuellement
        existing.setNom(utilisateurDto.getNom());
        existing.setPrenom(utilisateurDto.getPrenom());
        existing.setEmail(utilisateurDto.getEmail());
        existing.setTelephone(utilisateurDto.getTelephone());
        existing.setRole(utilisateurMapper.mapRole(utilisateurDto.getRole()));
        existing.setBio(utilisateurDto.getBio());
        existing.setLocalisation(utilisateurDto.getLocalisation());

        if (utilisateurDto.getMotDePasse() != null && !utilisateurDto.getMotDePasse().isBlank()) {
            existing.setMotDePasse(passwordEncoder.encode(utilisateurDto.getMotDePasse()));
        }

        return utilisateurMapper.toDTO(utilisateurRepository.save(existing));
    }

    @Override
    public boolean deleteUtilisateur(Long id) {
        if (!utilisateurRepository.existsById(id)) {
            throw new EntityNotFoundException("Utilisateur introuvable avec id " + id);
        }
        utilisateurRepository.deleteById(id);
        return false;
    }

    @Override
    public Optional<UtilisateurDTO> getUtilisateurById(Long id) {
        return utilisateurRepository.findById(id).map(utilisateurMapper::toDTO);
    }

    @Override
    public List<UtilisateurDTO> getAllUtilisateurs() {
        return utilisateurMapper.toDTOList(utilisateurRepository.findAll());
    }

    @Override
    public List<UtilisateurDTO> searchUtilisateurs(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllUtilisateurs();
        }
        return utilisateurMapper.toDTOList(utilisateurRepository.searchByNomOrPrenom(keyword));
    }

    // Méthodes supplémentaires avec repository
    public Optional<UtilisateurDTO> getUtilisateurByEmail(String email) {
        return utilisateurRepository.findByEmail(email).map(utilisateurMapper::toDTO);
    }

    public List<UtilisateurDTO> getUtilisateursByRole(Role role) {
        return utilisateurMapper.toDTOList(utilisateurRepository.findByRole(role));
    }

    public List<UtilisateurDTO> getUtilisateursByLocalisation(String localisation) {
        return utilisateurMapper.toDTOList(utilisateurRepository.findByLocalisationContainingIgnoreCase(localisation));
    }
}
