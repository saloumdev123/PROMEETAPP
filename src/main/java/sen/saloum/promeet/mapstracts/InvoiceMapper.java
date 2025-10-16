package sen.saloum.promeet.mapstracts;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sen.saloum.promeet.dto.InvoiceDTO;
import sen.saloum.promeet.models.Invoice;

@Mapper(componentModel = "spring")
public interface InvoiceMapper {
    @Mapping(target = "items", source = "items")
    Invoice toEntity(InvoiceDTO dto);

    @Mapping(target = "items", source = "items")
    InvoiceDTO toDto(Invoice entity);

}
