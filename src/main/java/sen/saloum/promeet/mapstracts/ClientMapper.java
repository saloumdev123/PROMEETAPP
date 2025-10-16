package sen.saloum.promeet.mapstracts;


import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import sen.saloum.promeet.dto.ClientDto;
import sen.saloum.promeet.models.Client;

@Mapper(componentModel = "spring")
public interface ClientMapper {
    ClientMapper INSTANCE = Mappers.getMapper(ClientMapper.class);

    ClientDto toDto(Client client);
    Client toEntity(ClientDto clientDto);
}
