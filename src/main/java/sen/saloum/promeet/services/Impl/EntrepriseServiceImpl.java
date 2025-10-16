package sen.saloum.promeet.services.Impl;


import org.springframework.stereotype.Service;
import sen.saloum.promeet.dto.EntrepriseDto;
import sen.saloum.promeet.mapstracts.EntrepriseMapper;
import sen.saloum.promeet.models.Entreprise;
import sen.saloum.promeet.repos.EntrepriseRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EntrepriseServiceImpl {

    private final EntrepriseRepository entrepriseRepository;
    private final EntrepriseMapper entrepriseMapper;


    public EntrepriseServiceImpl(EntrepriseRepository entrepriseRepository, EntrepriseMapper entrepriseMapper) {
        this.entrepriseRepository = entrepriseRepository;
        this.entrepriseMapper = entrepriseMapper;
    }

    public List<EntrepriseDto> getAll() {
        return entrepriseRepository.findAll()
                .stream()
                .map(entrepriseMapper::toDto)
                .collect(Collectors.toList());
    }

    public EntrepriseDto getById(Long id) {
        return entrepriseRepository.findById(id)
                .map(entrepriseMapper::toDto)
                .orElseThrow(() -> new RuntimeException("Entreprise non trouvée"));
    }

    public EntrepriseDto create(EntrepriseDto dto) {
        Entreprise entity = entrepriseMapper.toEntity(dto);
        return entrepriseMapper.toDto(entrepriseRepository.save(entity));
    }

    public EntrepriseDto update(Long id, EntrepriseDto dto) {
        Entreprise existing = entrepriseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entreprise non trouvée"));

        existing.setNom(dto.getNom());
        existing.setAdresse(dto.getAdresse());
        existing.setEmail(dto.getEmail());
        existing.setTelephone(dto.getTelephone());
        existing.setSiret(dto.getSiret());
        existing.setCodeApe(dto.getCodeApe());
        existing.setNumeroTva(dto.getNumeroTva());
        existing.setAffaire(dto.getAffaire());
        existing.setDepartement(dto.getDepartement());
        existing.setDirigeant(dto.getDirigeant());
        existing.setIndice(dto.getIndice());
        existing.setLieu(dto.getLieu());
        existing.setPortable(dto.getPortable());
        existing.setReference(dto.getReference());
        existing.setNumeroLot(dto.getNumeroLot());
        return entrepriseMapper.toDto(entrepriseRepository.save(existing));
    }

    public void delete(Long id) {
        entrepriseRepository.deleteById(id);
    }
}
