package sen.saloum.promeet.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.services.peyment.PayDunyaService;

@RestController
@RequestMapping("/api/paiements")
public class PaymentController {

    @Autowired
    private PayDunyaService payDunyaService;

    @PostMapping("/initier")
    public String initierPaiement(@RequestParam String email,
                                  @RequestParam String description,
                                  @RequestParam double montant) throws Exception {
        return payDunyaService.initierPaiement(email, description, montant);
    }

    // Réception du callback (IPN)
    @PostMapping("/ipn")
    public String ipnNotification(@RequestBody String payload) {
        // TODO: Vérifier la signature et mettre à jour l’état du paiement
        System.out.println("IPN reçu : " + payload);
        return "OK";
    }
}
