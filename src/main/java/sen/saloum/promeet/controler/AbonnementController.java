package sen.saloum.promeet.controler;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.AbonnementDTO;
import sen.saloum.promeet.services.Impl.AbonnementService;

@RestController
@RequestMapping("/api/abonnements")
public class AbonnementController {

    private final AbonnementService abonnementService;

    public AbonnementController(AbonnementService abonnementService) {
        this.abonnementService = abonnementService;
    }

    // Créer ou mettre à jour un abonnement
    @PostMapping
    public AbonnementDTO createOrUpdateAbonnement(@RequestBody AbonnementDTO dto) {
        return abonnementService.createOrUpdateAbonnement(dto);
    }

    // Lister abonnements actifs
    @GetMapping("/actifs")
    public Page<AbonnementDTO> getActiveAbonnements(Pageable pageable) {
        return abonnementService.getActiveAbonnements(pageable);
    }

    // Lister abonnements expirés
    @GetMapping("/expires")
    public Page<AbonnementDTO> getExpiredAbonnements(Pageable pageable) {
        return abonnementService.getExpiredAbonnements(pageable);
    }
}
