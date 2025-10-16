package sen.saloum.promeet.controler;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.EntrepriseDto;
import sen.saloum.promeet.services.Impl.EntrepriseServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/entreprises")
public class EntrepriseController {

    private final EntrepriseServiceImpl entrepriseService;

    public EntrepriseController(EntrepriseServiceImpl entrepriseService) {
        this.entrepriseService = entrepriseService;
    }


    @GetMapping
    public ResponseEntity<List<EntrepriseDto>> getAll() {
        return ResponseEntity.ok(entrepriseService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntrepriseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(entrepriseService.getById(id));
    }

    @PostMapping
    public ResponseEntity<EntrepriseDto> create(@RequestBody EntrepriseDto dto) {
        return ResponseEntity.ok(entrepriseService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EntrepriseDto> update(@PathVariable Long id, @RequestBody EntrepriseDto dto) {
        return ResponseEntity.ok(entrepriseService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        entrepriseService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
