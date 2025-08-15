package sen.saloum.promeet.services;


import sen.saloum.promeet.dto.AvisDTO;

import java.util.List;

public interface AvisService {
    AvisDTO createAvis(AvisDTO avisDto);
    AvisDTO updateAvis(Long id, AvisDTO avisDto);
    AvisDTO getAvisById(Long id);
    List<AvisDTO> getAllAvis();
    void deleteAvis(Long id);
    List<AvisDTO> getAvisByOffre(Long offreId);
}
