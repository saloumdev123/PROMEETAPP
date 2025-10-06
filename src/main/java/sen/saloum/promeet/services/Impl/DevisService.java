package sen.saloum.promeet.services.Impl;

import org.springframework.stereotype.Service;
import sen.saloum.promeet.dto.DevisDTO;
import sen.saloum.promeet.mapstracts.DevisMapper;
import sen.saloum.promeet.models.Devis;
import sen.saloum.promeet.repos.DevisRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DevisService {

    private final DevisRepository devisRepository;
    private final DevisMapper devisMapper;

    public DevisService(DevisRepository devisRepository, DevisMapper devisMapper) {
        this.devisRepository = devisRepository;
        this.devisMapper = devisMapper;
    }

    public DevisDTO createDevis(DevisDTO dto) {
        Devis devis = devisMapper.toEntity(dto);
        Devis saved = devisRepository.save(devis);
        return devisMapper.toDto(saved);
    }

    public List<DevisDTO> getAll() {
        return devisRepository.findAll()
                .stream()
                .map(devisMapper::toDto)
                .collect(Collectors.toList());
    }
}
