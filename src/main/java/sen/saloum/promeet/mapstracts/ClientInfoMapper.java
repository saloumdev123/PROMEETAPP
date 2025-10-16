package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import sen.saloum.promeet.dto.ClientInfoDto;
import sen.saloum.promeet.models.ClientInfo;

@Mapper(componentModel = "spring")
public interface ClientInfoMapper {

    ClientInfoMapper INSTANCE = Mappers.getMapper(ClientInfoMapper.class);

    ClientInfoDto toDto(ClientInfo entity);

    ClientInfo toEntity(ClientInfoDto dto);
}
