package sen.saloum.promeet.services.Impl;

import org.springframework.stereotype.Service;
import sen.saloum.promeet.dto.InvoiceDTO;
import sen.saloum.promeet.enums.InvoiceStatus;
import sen.saloum.promeet.mapstracts.InvoiceMapper;
import sen.saloum.promeet.models.Invoice;
import sen.saloum.promeet.repos.InvoiceRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final InvoiceMapper invoiceMapper;

    public InvoiceService(InvoiceRepository invoiceRepository, InvoiceMapper invoiceMapper) {
        this.invoiceRepository = invoiceRepository;
        this.invoiceMapper = invoiceMapper;
    }

    // ✅ Créer une facture
    public InvoiceDTO createInvoice(InvoiceDTO dto) {
        Invoice entity = invoiceMapper.toEntity(dto);
        entity.setStatus(InvoiceStatus.EN_ATTENTE);
        Invoice saved = invoiceRepository.save(entity);
        return invoiceMapper.toDto(saved);
    }

    // ✅ Mettre à jour une facture
    public InvoiceDTO updateInvoice(Long id, InvoiceDTO dto) {
        Invoice existing = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Facture introuvable avec l'id : " + id));

        Invoice updated = invoiceMapper.toEntity(dto);
        updated.setId(id);
        updated.setStatus(existing.getStatus());
        Invoice saved = invoiceRepository.save(updated);
        return invoiceMapper.toDto(saved);
    }

    // ✅ Récupérer toutes les factures
    public List<InvoiceDTO> getAllInvoices() {
        return invoiceRepository.findAll()
                .stream()
                .map(invoiceMapper::toDto)
                .collect(Collectors.toList());
    }

    // ✅ Récupérer une facture par ID
    public Optional<InvoiceDTO> getInvoiceById(Long id) {
        return invoiceRepository.findById(id).map(invoiceMapper::toDto);
    }

    // ✅ Supprimer une facture
    public void deleteInvoice(Long id) {
        if (!invoiceRepository.existsById(id)) {
            throw new RuntimeException("Facture introuvable avec l'id : " + id);
        }
        invoiceRepository.deleteById(id);
    }

    // ✅ Récupérer les factures par statut
    public List<InvoiceDTO> getInvoicesByStatus(InvoiceStatus status) {
        return invoiceRepository.findByStatus(status)
                .stream()
                .map(invoiceMapper::toDto)
                .collect(Collectors.toList());
    }

    // ✅ Changer le statut d'une facture (facultatif)
    public InvoiceDTO updateStatus(Long id, InvoiceStatus newStatus) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Facture non trouvée"));
        invoice.setStatus(newStatus);
        return invoiceMapper.toDto(invoiceRepository.save(invoice));
    }



}
