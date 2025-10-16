package sen.saloum.promeet.services.Impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sen.saloum.promeet.dto.CompanyInfoDto;
import sen.saloum.promeet.mapstracts.CompanyInfoMapper;
import sen.saloum.promeet.models.CompanyInfo;
import sen.saloum.promeet.repos.CompanyInfoRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class CompanyInfoService {

    private final CompanyInfoRepository companyInfoRepository;
    private final CompanyInfoMapper companyInfoMapper;

    public CompanyInfoService(CompanyInfoRepository companyInfoRepository, CompanyInfoMapper companyInfoMapper) {
        this.companyInfoRepository = companyInfoRepository;
        this.companyInfoMapper = companyInfoMapper;
    }

    // === CREATE ===
    public CompanyInfoDto createCompanyInfo(CompanyInfoDto dto) {
        CompanyInfo entity = companyInfoMapper.toEntity(dto);
        CompanyInfo saved = companyInfoRepository.save(entity);
        return companyInfoMapper.toDto(saved);
    }

    // === READ ALL ===
    public List<CompanyInfoDto> getAllCompanyInfos() {
        return companyInfoRepository.findAll()
                .stream()
                .map(companyInfoMapper::toDto)
                .collect(Collectors.toList());
    }

    // === READ BY ID ===
    public CompanyInfoDto getCompanyInfoById(Long id) {
        Optional<CompanyInfo> companyInfo = companyInfoRepository.findById(id);
        return companyInfo.map(companyInfoMapper::toDto)
                .orElseThrow(() -> new RuntimeException("CompanyInfo not found with ID: " + id));
    }
    // === UPDATE ===
    public CompanyInfoDto updateCompanyInfo(Long id, CompanyInfoDto dto) {
        CompanyInfo existing = companyInfoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CompanyInfo not found with ID: " + id));

        companyInfoMapper.updateEntityFromDto(dto, existing);

        CompanyInfo updated = companyInfoRepository.save(existing);

        return companyInfoMapper.toDto(updated);
    }

    // === DELETE ===
    public void deleteCompanyInfo(Long id) {
        if (!companyInfoRepository.existsById(id)) {
            throw new RuntimeException("CompanyInfo not found with ID: " + id);
        }
        companyInfoRepository.deleteById(id);
    }
}
