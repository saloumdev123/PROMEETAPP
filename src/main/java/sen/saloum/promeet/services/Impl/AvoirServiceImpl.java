package sen.saloum.promeet.services.Impl;


import org.springframework.stereotype.Service;
import sen.saloum.promeet.dto.AvoirDto;
import sen.saloum.promeet.mapstracts.AvoirMapper;
import sen.saloum.promeet.models.Avoir;
import sen.saloum.promeet.repos.AvoirRepository;
import sen.saloum.promeet.services.AvoirService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AvoirServiceImpl implements AvoirService {

    private final AvoirRepository avoirRepository;
    private final AvoirMapper avoirMapper;

    public AvoirServiceImpl(AvoirRepository avoirRepository, AvoirMapper avoirMapper) {
        this.avoirRepository = avoirRepository;
        this.avoirMapper = avoirMapper;
    }

    @Override
    public AvoirDto createAvoir(AvoirDto dto) {
        Avoir avoir = avoirMapper.toEntity(dto);
        Avoir saved = avoirRepository.save(avoir);
        return avoirMapper.toDto(saved);
    }

    @Override
    public List<AvoirDto> getAllAvoirs() {
        return avoirRepository.findAll()
                .stream()
                .map(avoirMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public AvoirDto getAvoirById(Long id) {
        Avoir avoir = avoirRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Avoir introuvable avec ID : " + id));
        return avoirMapper.toDto(avoir);
    }

    @Override
    public void deleteAvoir(Long id) {
        if (!avoirRepository.existsById(id)) {
            throw new RuntimeException("Avoir introuvable avec ID : " + id);
        }
        avoirRepository.deleteById(id);
    }
}
