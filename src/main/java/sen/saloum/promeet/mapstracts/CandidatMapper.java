package sen.saloum.promeet.mapstracts;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import sen.saloum.promeet.dto.CandidatDTO;
import sen.saloum.promeet.models.Candidat;

@Mapper(componentModel = "spring", uses = {DocumentMapper.class, AbonnementMapper.class})
public interface CandidatMapper {
    CandidatMapper INSTANCE = Mappers.getMapper(CandidatMapper.class);

    CandidatDTO toDTO(Candidat candidat);
    @InheritInverseConfiguration
    Candidat toEntity(CandidatDTO dto);
}
