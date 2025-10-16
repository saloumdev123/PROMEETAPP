package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import sen.saloum.promeet.dto.InvoiceItemDTO;
import sen.saloum.promeet.models.InvoiceItem;

@Mapper(componentModel = "spring")
public interface InvoiceItemMapper {
    InvoiceItem toEntity(InvoiceItemDTO dto);
    InvoiceItemDTO toDto(InvoiceItem entity);
}
