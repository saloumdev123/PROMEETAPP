package sen.saloum.promeet.services.Impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import sen.saloum.promeet.dto.DocumentDTO;
import sen.saloum.promeet.mapstracts.DocumentMapper;
import sen.saloum.promeet.models.Document;
import sen.saloum.promeet.repos.DocumentRepository;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final DocumentMapper documentMapper;

    public DocumentService(DocumentRepository documentRepository, DocumentMapper documentMapper) {
        this.documentRepository = documentRepository;
        this.documentMapper = documentMapper;
    }

    // Ajouter un document
    public DocumentDTO addDocument(DocumentDTO dto) {
        Document document = documentMapper.toEntity(dto);
        return documentMapper.toDTO(documentRepository.save(document));
    }

    // Documents d’un candidat (paginés)
    public Page<DocumentDTO> getDocumentsByCandidat(Long candidatId, Pageable pageable) {
        return documentRepository.findByCandidatId(candidatId, pageable)
                .map(documentMapper::toDTO);
    }

    // Recherche par nom fichier (paginée)
    public Page<DocumentDTO> searchDocuments(String keyword, Pageable pageable) {
        return documentRepository.searchByNomFichier(keyword, pageable)
                .map(documentMapper::toDTO);
    }

    // Supprimer document
    public void deleteDocument(Long id) {
        documentRepository.deleteById(id);
    }
}
