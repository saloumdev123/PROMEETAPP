package sen.saloum.promeet.services.Impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sen.saloum.promeet.models.DocumentItem;
import sen.saloum.promeet.repos.DocumentItemRepository;

import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class DocumentItemService {

    private final DocumentItemRepository repository;

    public DocumentItemService(DocumentItemRepository repository) {
        this.repository = repository;
    }

    public DocumentItem save(DocumentItem item) {
        return repository.save(item);
    }

    public List<DocumentItem> findAll() {
        return repository.findAll();
    }

    public Optional<DocumentItem> findById(Long id) {
        return repository.findById(id);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
