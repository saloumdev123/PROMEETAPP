package sen.saloum.promeet.services;


import sen.saloum.promeet.dto.UtilisateurDTO;

import java.util.List;
import java.util.Optional;

public interface UtilisateurService {
    UtilisateurDTO createUtilisateur(UtilisateurDTO utilisateurDto);
    UtilisateurDTO updateUtilisateur(Long id, UtilisateurDTO utilisateurDto);
    void deleteUtilisateur(Long id);
    Optional<UtilisateurDTO> getUtilisateurById(Long id);
    List<UtilisateurDTO> getAllUtilisateurs();
    List<UtilisateurDTO> searchUtilisateurs(String keyword);
}
