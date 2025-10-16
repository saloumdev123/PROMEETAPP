package sen.saloum.promeet.controler;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.AvoirDto;
import sen.saloum.promeet.services.AvoirService;

import java.util.List;

@RestController
@RequestMapping("/api/avoirs")
public class AvoirController {

    private final AvoirService avoirService;

    public AvoirController(AvoirService avoirService) {
        this.avoirService = avoirService;
    }

    @PostMapping
    public ResponseEntity<AvoirDto> create(@RequestBody AvoirDto dto) {
        return ResponseEntity.ok(avoirService.createAvoir(dto));
    }

    @GetMapping
    public ResponseEntity<List<AvoirDto>> getAll() {
        return ResponseEntity.ok(avoirService.getAllAvoirs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AvoirDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(avoirService.getAvoirById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        avoirService.deleteAvoir(id);
        return ResponseEntity.noContent().build();
    }
}
