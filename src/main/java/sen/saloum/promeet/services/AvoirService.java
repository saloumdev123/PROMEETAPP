package sen.saloum.promeet.services;


import sen.saloum.promeet.dto.AvoirDto;

import java.util.List;

public interface AvoirService {
    AvoirDto createAvoir(AvoirDto dto);
    List<AvoirDto> getAllAvoirs();
    AvoirDto getAvoirById(Long id);
    void deleteAvoir(Long id);
}
