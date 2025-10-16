package sen.saloum.promeet.services.Impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sen.saloum.promeet.dto.DocumentInfoDTO;
import sen.saloum.promeet.mapstracts.DocumentInfoMapper;
import sen.saloum.promeet.models.DocumentInfo;
import sen.saloum.promeet.repos.DocumentInfoRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class DocumentInfoService {

    private final DocumentInfoRepository documentInfoRepository;
    private final DocumentInfoMapper documentInfoMapper;

    public DocumentInfoService(DocumentInfoRepository documentInfoRepository, DocumentInfoMapper documentInfoMapper) {
        this.documentInfoRepository = documentInfoRepository;
        this.documentInfoMapper = documentInfoMapper;
    }

    public DocumentInfoDTO save(DocumentInfoDTO dto) {
        DocumentInfo entity = documentInfoMapper.toEntity(dto);
        DocumentInfo saved = documentInfoRepository.save(entity);
        return documentInfoMapper.toDTO(saved);
    }

    public List<DocumentInfoDTO> findAll() {
        return documentInfoRepository.findAll()
                .stream()
                .map(documentInfoMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<DocumentInfoDTO> findById(Long id) {
        return documentInfoRepository.findById(id)
                .map(documentInfoMapper::toDTO);
    }

    public DocumentInfoDTO update(Long id, DocumentInfoDTO dto) {
        return documentInfoRepository.findById(id)
                .map(existing -> {
                    DocumentInfo updatedEntity = documentInfoMapper.toEntity(dto);
                    updatedEntity.setId(id);
                    DocumentInfo updated = documentInfoRepository.save(updatedEntity);
                    return documentInfoMapper.toDTO(updated);
                })
                .orElseThrow(() -> new RuntimeException("DocumentInfo not found with id " + id));
    }

    public void delete(Long id) {
        documentInfoRepository.deleteById(id);
    }
}
