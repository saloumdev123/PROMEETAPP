package sen.saloum.promeet.services.peyment;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class AfribapayPaymentService {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String PAYIN_URL = "https://api-sandbox.afribapay.com/v1/pay/payin";
    private static final String MERCHANT_KEY = "mk_sandbox_Dv2c9Us240920061620";

    private final AfribapayAuthService authService;

    public AfribapayPaymentService(AfribapayAuthService authService) {
        this.authService = authService;
    }

    public Map<String, Object> initierPaiement(String operator, String phone, double montant, String currency, String orderId) {
        String token = authService.getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new HashMap<>();
        body.put("operator", operator.toLowerCase()); // "wave", "orange", "free"
        body.put("country", currency.equals("XOF") ? "SN" : "CM");
        body.put("phone_number", phone);
        body.put("amount", montant);
        body.put("currency", currency); // "XOF" ou "XAF"
        body.put("order_id", orderId);
        body.put("merchant_key", MERCHANT_KEY);
        body.put("reference_id", "REF-" + orderId);
        body.put("lang", "fr");
        body.put("return_url", "https://tonsite.com/success");
        body.put("cancel_url", "https://tonsite.com/cancel");
        body.put("notify_url", "https://tonsite.com/api/paiements/callback");

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(PAYIN_URL, request, Map.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return (Map<String, Object>) response.getBody().get("data");
        }
        throw new RuntimeException("Erreur lors de l'initiation du paiement AfribaPAY");
    }
}
