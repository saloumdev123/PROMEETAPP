package sen.saloum.promeet.services;


import sen.saloum.promeet.dto.OffreDTO;

import java.util.List;

public interface OffreService {
    OffreDTO createOffre(OffreDTO offreDto);
    OffreDTO updateOffre(Long id, OffreDTO offreDto);
    void deleteOffre(Long id);
    OffreDTO getOffreById(Long id);
    List<OffreDTO> getAllOffres();
    List<OffreDTO> searchOffres(String keyword);
    List<OffreDTO> searchOffresAvancee(String categorie, Double minPrix, Double maxPrix, String localisation);
}
