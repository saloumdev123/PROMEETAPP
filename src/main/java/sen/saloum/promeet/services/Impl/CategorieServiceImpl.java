package sen.saloum.promeet.services.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sen.saloum.promeet.dto.CategorieDto;
import sen.saloum.promeet.mapstracts.CategorieMapper;
import sen.saloum.promeet.models.Categorie;
import sen.saloum.promeet.repos.CategorieRepository;
import sen.saloum.promeet.services.CategorieService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CategorieServiceImpl implements CategorieService {

    private final CategorieRepository categorieRepository;
    private final CategorieMapper categorieMapper;

    public CategorieServiceImpl(CategorieRepository categorieRepository, CategorieMapper categorieMapper) {
        this.categorieRepository = categorieRepository;
        this.categorieMapper = categorieMapper;
    }

    @Override
    public CategorieDto createCategorie(CategorieDto dto) {
        Categorie categorie = categorieMapper.toEntity(dto);
        return categorieMapper.toDto(categorieRepository.save(categorie));
    }

    @Override
    public CategorieDto getCategorieById(Long id) {
        Categorie categorie = categorieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Catégorie introuvable"));
        return categorieMapper.toDto(categorie);
    }

    @Override
    public List<CategorieDto> getAllCategories() {
        return categorieRepository.findAll().stream()
                .map(categorieMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CategorieDto updateCategorie(Long id, CategorieDto dto) {
        Categorie categorie = categorieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Catégorie introuvable"));
        categorie.setNom(dto.getNom());
        categorie.setDescription(dto.getDescription());
        return categorieMapper.toDto(categorieRepository.save(categorie));
    }

    @Override
    public void deleteCategorie(Long id) {
        categorieRepository.deleteById(id);
    }
}
