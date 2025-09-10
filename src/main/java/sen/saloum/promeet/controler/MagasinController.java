package sen.saloum.promeet.controler;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.MagasinDTO;
import sen.saloum.promeet.services.Impl.MagasinService;

import java.util.List;

@RestController
@RequestMapping("/api/magasins")
public class MagasinController {

    private final MagasinService magasinService;

    public MagasinController(MagasinService magasinService) {
        this.magasinService = magasinService;
    }

    @PostMapping
    public ResponseEntity<MagasinDTO> createMagasin(@RequestBody MagasinDTO magasinDTO) {
        MagasinDTO created = magasinService.createMagasin(magasinDTO);
        return ResponseEntity.ok(created);
    }


    @GetMapping
    public ResponseEntity<List<MagasinDTO>> getAllMagasins() {
        return ResponseEntity.ok(magasinService.getAllMagasins());
    }


    @GetMapping("/{id}")
    public ResponseEntity<MagasinDTO> getMagasinById(@PathVariable Long id) {
        return magasinService.getMagasinById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PutMapping("/{id}")
    public ResponseEntity<MagasinDTO> updateMagasin(@PathVariable Long id, @RequestBody MagasinDTO magasinDTO) {
        return magasinService.updateMagasin(id, magasinDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMagasin(@PathVariable Long id) {
        if (magasinService.deleteMagasin(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
