package sen.saloum.promeet.services.Impl;

import org.springframework.stereotype.Service;
import sen.saloum.promeet.dto.MacrosDTO;
import sen.saloum.promeet.mapstracts.MacrosMapper;
import sen.saloum.promeet.repos.CandidatRepository;

import java.util.Optional;

@Service
public class MacrosService {

    private final CandidatRepository candidatRepository;
    private final MacrosMapper macrosMapper;

    public MacrosService(CandidatRepository candidatRepository, MacrosMapper macrosMapper) {
        this.candidatRepository = candidatRepository;
        this.macrosMapper = macrosMapper;
    }

    public Optional<MacrosDTO> updateMacros(Long candidatId, MacrosDTO macrosDTO) {
        return candidatRepository.findById(candidatId).map(candidat -> {
            candidat.setMacros(macrosMapper.toEntity(macrosDTO));
            return macrosMapper.toDTO(candidatRepository.save(candidat).getMacros());
        });
    }
}
