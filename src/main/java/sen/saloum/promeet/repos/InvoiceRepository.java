package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import sen.saloum.promeet.enums.InvoiceStatus;
import sen.saloum.promeet.models.Invoice;

import java.util.List;
import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
            List<Invoice> findByStatus(InvoiceStatus status);
        Optional<Invoice> findByInvoiceNumber(String invoiceNumber);

}
