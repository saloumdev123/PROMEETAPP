package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sen.saloum.promeet.dto.ProduitDto;
import sen.saloum.promeet.models.Produit;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProduitMapper {

    @Mapping(source = "magasin.id", target = "magasinId")
    @Mapping(source = "categorie.id", target = "categorieId")
    ProduitDto toDto(Produit produit);

    @Mapping(source = "magasinId", target = "magasin.id")
    @Mapping(source = "categorieId", target = "categorie.id")
    Produit toEntity(ProduitDto dto);

    List<ProduitDto> toDtoList(List<Produit> produits);
}
