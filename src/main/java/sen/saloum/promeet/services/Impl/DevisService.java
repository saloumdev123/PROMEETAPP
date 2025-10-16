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

    public List<DevisDTO> getAll() {
        return devisRepository.findAll()
                .stream()
                .map(devisMapper::toDto)
                .collect(Collectors.toList());
    }

    public DevisDTO getById(Long id) {
        return devisRepository.findById(id)
                .map(devisMapper::toDto)
                .orElseThrow(() -> new RuntimeException("Devis non trouvé"));
    }

    public DevisDTO create(DevisDTO dto) {
        Devis entity = devisMapper.toEntity(dto);
        return devisMapper.toDto(devisRepository.save(entity));
    }

    public DevisDTO update(Long id, DevisDTO dto) {
        Devis existing = devisRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Devis non trouvé"));

        existing.setClientName(dto.getClientName());
        existing.setClientAddress(dto.getClientAddress());
        existing.setClientEmail(dto.getClientEmail());
        existing.setClientPhone(dto.getClientPhone());
        existing.setDateDevis(dto.getDateDevis());
        existing.setReference(dto.getReference());
        existing.setTotalHt(dto.getTotalHt());
        existing.setTva(dto.getTva());
        existing.setTotalTtc(dto.getTotalTtc());

        return devisMapper.toDto(devisRepository.save(existing));
    }

    public void delete(Long id) {
        devisRepository.deleteById(id);
    }
}
