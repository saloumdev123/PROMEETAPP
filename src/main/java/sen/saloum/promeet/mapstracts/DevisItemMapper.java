package sen.saloum.promeet.mapstracts;


import org.mapstruct.Mapper;
import sen.saloum.promeet.dto.DevisItemDto;
import sen.saloum.promeet.models.DevisItem;

@Mapper(componentModel = "spring")
public interface DevisItemMapper {

    DevisItemDto toDto(DevisItem entity);

    DevisItem toEntity(DevisItemDto dto);
}
