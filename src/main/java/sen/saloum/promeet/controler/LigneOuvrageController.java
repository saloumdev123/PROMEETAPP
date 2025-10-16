package sen.saloum.promeet.controler;

import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.LigneOuvrageDto;
import sen.saloum.promeet.services.Impl.LigneOuvrageService;

import java.util.List;

@RestController
@RequestMapping("/api/lignes-ouvrages")

public class LigneOuvrageController {

    private final LigneOuvrageService service;

    public LigneOuvrageController(LigneOuvrageService service) {
        this.service = service;
    }

    @PostMapping("/{devisId}")
    public LigneOuvrageDto create(@PathVariable Long devisId, @RequestBody LigneOuvrageDto dto) {
        return service.create(devisId, dto);
    }

    @GetMapping("/devis/{devisId}")
    public List<LigneOuvrageDto> getByDevis(@PathVariable Long devisId) {
        return service.getByDevis(devisId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
