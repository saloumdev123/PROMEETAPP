package sen.saloum.promeet.services.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sen.saloum.promeet.dto.ProduitDto;
import sen.saloum.promeet.mapstracts.ProduitMapper;
import sen.saloum.promeet.models.Produit;
import sen.saloum.promeet.models.Categorie;
import sen.saloum.promeet.repos.CategorieRepository;
import sen.saloum.promeet.repos.ProduitRepository;
import sen.saloum.promeet.services.ProduitService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProduitServiceImpl implements ProduitService {

    private final ProduitRepository produitRepository;
    private final CategorieRepository categorieRepository;
    private final ProduitMapper produitMapper;

    public ProduitServiceImpl(ProduitRepository produitRepository, CategorieRepository categorieRepository, ProduitMapper produitMapper) {
        this.produitRepository = produitRepository;
        this.categorieRepository = categorieRepository;
        this.produitMapper = produitMapper;
    }
    @Override
    public Page<ProduitDto> getAllProduits(Pageable pageable) {
        return produitRepository.findAll(pageable)
                .map(produitMapper::toDto);
    }

    @Override
    public Page<ProduitDto> getProduitsByCategorie(Long categorieId, Pageable pageable) {
        return produitRepository.findByCategorieId(categorieId, pageable)
                .map(produitMapper::toDto);
    }
    @Override
    public ProduitDto createProduit(ProduitDto dto) {
        Produit produit = produitMapper.toEntity(dto);

        if (dto.getCategorieId() != null) {
            Categorie categorie = categorieRepository.findById(dto.getCategorieId())
                    .orElseThrow(() -> new RuntimeException("Catégorie introuvable"));
            produit.setCategorie(categorie);
        }

        return produitMapper.toDto(produitRepository.save(produit));
    }

    @Override
    public ProduitDto getProduitById(Long id) {
        Produit produit = produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));
        return produitMapper.toDto(produit);
    }

    @Override
    public List<ProduitDto> getAllProduits() {
        return produitRepository.findAll().stream()
                .map(produitMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProduitDto> getProduitsByCategorie(Long categorieId) {
        return produitRepository.findByCategorieId(categorieId).stream()
                .map(produitMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProduitDto updateProduit(Long id, ProduitDto dto) {
        Produit produit = produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));
        produit.setNom(dto.getNom());
        produit.setDescription(dto.getDescription());
        produit.setPrix(dto.getPrix());
        produit.setQuantiteEnStock(dto.getQuantiteEnStock());

        if (dto.getCategorieId() != null) {
            Categorie categorie = categorieRepository.findById(dto.getCategorieId())
                    .orElseThrow(() -> new RuntimeException("Catégorie introuvable"));
            produit.setCategorie(categorie);
        }

        return produitMapper.toDto(produitRepository.save(produit));
    }
    @Override
    public Page<ProduitDto> getProduitsByMagasin(Long magasinId, Pageable pageable) {
        return produitRepository.findByMagasinId(magasinId, pageable)
                .map(produitMapper::toDto);
    }


    @Override
    public List<ProduitDto> getProduitsByMagasinAndCategorie(Long magasinId, Long categorieId) {
        return produitRepository.findByMagasinAndCategorie(magasinId, categorieId).stream()
                .map(produitMapper::toDto)
                .collect(Collectors.toList());
    }


    @Override
    public void deleteProduit(Long id) {
        produitRepository.deleteById(id);
    }
}
