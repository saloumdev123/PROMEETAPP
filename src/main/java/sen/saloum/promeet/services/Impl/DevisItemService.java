package sen.saloum.promeet.services.Impl;

import org.springframework.stereotype.Service;
import sen.saloum.promeet.dto.DevisItemDto;
import sen.saloum.promeet.mapstracts.DevisItemMapper;
import sen.saloum.promeet.models.DevisItem;
import sen.saloum.promeet.repos.DevisItemRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DevisItemService {

    private final DevisItemRepository devisItemRepository;
    private final DevisItemMapper devisItemMapper;

    public DevisItemService(DevisItemRepository devisItemRepository, DevisItemMapper devisItemMapper) {
        this.devisItemRepository = devisItemRepository;
        this.devisItemMapper = devisItemMapper;
    }

    public List<DevisItemDto> getAll() {
        return devisItemRepository.findAll()
                .stream()
                .map(devisItemMapper::toDto)
                .collect(Collectors.toList());
    }

    public DevisItemDto getById(Long id) {
        return devisItemRepository.findById(id)
                .map(devisItemMapper::toDto)
                .orElseThrow(() -> new RuntimeException("Élément de devis non trouvé"));
    }

    public DevisItemDto create(DevisItemDto dto) {
        DevisItem entity = devisItemMapper.toEntity(dto);
        return devisItemMapper.toDto(devisItemRepository.save(entity));
    }

    public void delete(Long id) {
        devisItemRepository.deleteById(id);
    }
}
