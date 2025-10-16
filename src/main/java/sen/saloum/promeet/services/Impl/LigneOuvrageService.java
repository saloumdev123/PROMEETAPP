package sen.saloum.promeet.services.Impl;


import org.springframework.stereotype.Service;
import sen.saloum.promeet.dto.LigneOuvrageDto;
import sen.saloum.promeet.mapstracts.LigneOuvrageMapper;
import sen.saloum.promeet.models.Devis;
import sen.saloum.promeet.models.LigneOuvrage;
import sen.saloum.promeet.repos.DevisRepository;
import sen.saloum.promeet.repos.LigneOuvrageRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LigneOuvrageService {

    private final LigneOuvrageRepository ligneOuvrageRepository;
    private final DevisRepository devisRepository;
    private final LigneOuvrageMapper mapper;

    public LigneOuvrageService(LigneOuvrageRepository ligneOuvrageRepository, DevisRepository devisRepository, LigneOuvrageMapper mapper) {
        this.ligneOuvrageRepository = ligneOuvrageRepository;
        this.devisRepository = devisRepository;
        this.mapper = mapper;
    }

    public LigneOuvrageDto create(Long devisId, LigneOuvrageDto dto) {
        Devis devis = devisRepository.findById(devisId)
                .orElseThrow(() -> new RuntimeException("Devis introuvable"));

        LigneOuvrage entity = mapper.toEntity(dto);
        entity.setDevis(devis);

        LigneOuvrage saved = ligneOuvrageRepository.save(entity);
        return mapper.toDto(saved);
    }

    public List<LigneOuvrageDto> getByDevis(Long devisId) {
        return ligneOuvrageRepository.findByDevisId(devisId)
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    public void delete(Long id) {
        ligneOuvrageRepository.deleteById(id);
    }
}
