package sen.saloum.promeet.controler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.DevisDTO;
import sen.saloum.promeet.services.Impl.DevisService;

import java.util.List;

@RestController
@RequestMapping("/api/devis")
public class DevisController {

    private final DevisService devisService;

    public DevisController(DevisService devisService) {
        this.devisService = devisService;
    }

    /** 🔹 Créer un devis */
    @PostMapping
    public ResponseEntity<DevisDTO> create(@RequestBody DevisDTO dto) {
        return ResponseEntity.ok(devisService.createDevis(dto));
    }

    /** 🔹 Récupérer tous les devis */
    @GetMapping
    public ResponseEntity<List<DevisDTO>> getAll() {
        return ResponseEntity.ok(devisService.getAll());
    }
}
