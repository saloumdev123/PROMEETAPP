package sen.saloum.promeet.controler;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.ProjetDTO;
import sen.saloum.promeet.services.Impl.ProjetService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/projets")
public class ProjetController {

    private final ProjetService projetService;

    public ProjetController(ProjetService projetService) {
        this.projetService = projetService;
    }

    // ✅ Créer un projet
    @PostMapping
    public ResponseEntity<ProjetDTO> create(@RequestBody ProjetDTO dto) {
        return ResponseEntity.ok(projetService.createProjet(dto));
    }

    // ✅ Modifier un projet
    @PutMapping("/{id}")
    public ResponseEntity<ProjetDTO> update(@PathVariable Long id, @RequestBody ProjetDTO dto) {
        return ResponseEntity.ok(projetService.updateProjet(id, dto));
    }

    // ✅ Supprimer un projet
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        projetService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public List<ProjetDTO> getAllProjets() {
        return projetService.getAllProjets();
    }



    // ✅ Récupérer un projet par ID
    @GetMapping("/{id}")
    public ResponseEntity<ProjetDTO> getById(@PathVariable Long id) {
        return projetService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔍 Rechercher par nom
    @GetMapping("/search")
    public ResponseEntity<List<ProjetDTO>> searchByNom(@RequestParam String nom) {
        return ResponseEntity.ok(projetService.searchByNom(nom));
    }

    // 🔍 Recherche globale
    @GetMapping("/filter")
    public ResponseEntity<List<ProjetDTO>> searchGlobal(@RequestParam String keyword) {
        return ResponseEntity.ok(projetService.searchGlobal(keyword));
    }

    // 🔍 Récupérer les projets d’un client
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<ProjetDTO>> findByClient(@PathVariable Long clientId) {
        return ResponseEntity.ok(projetService.findByClient(clientId));
    }

    // 🔍 Récupérer les projets par période
    @GetMapping("/periode")
    public ResponseEntity<List<ProjetDTO>> findByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end
    ) {
        return ResponseEntity.ok(projetService.findByDateRange(start, end));
    }
}
