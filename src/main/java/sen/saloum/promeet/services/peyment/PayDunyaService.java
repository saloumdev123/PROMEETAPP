package sen.saloum.promeet.services.peyment;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.web.client.RestTemplate;
import sen.saloum.promeet.config.PayDunyaConfig;

import java.util.HashMap;
import java.util.Map;

@Service
public class
PayDunyaService {

    @Autowired
    private PayDunyaConfig config;

    private final RestTemplate restTemplate = new RestTemplate();


    public Map<String, String> initierPaiement(String clientEmail, String description, double montant) throws Exception {
        String url = "https://app.paydunya.com/api/v1/checkout-invoice/create";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("PAYDUNYA-PUBLIC-KEY", config.getPublicKey());
        headers.set("PAYDUNYA-PRIVATE-KEY", config.getPrivateKey());
        headers.set("PAYDUNYA-TOKEN", config.getToken());

        // ✅ Invoice
        Map<String, Object> item = new HashMap<>();
        item.put("name", description);
        item.put("quantity", 1);
        item.put("unit_price", montant);
        item.put("total_price", montant);


        Map<String, Object> invoice = new HashMap<>();
        invoice.put("items", new Object[]{ item });
        invoice.put("total_amount", montant);
        invoice.put("description", description);

        // ✅ Store (mettre plus d’infos si possible)
        Map<String, Object> store = new HashMap<>();
        store.put("name", "Promeet");
        store.put("website_url", "http://www.exemple.com");
        store.put("tagline", "Vos événements, simplifiés !");
        store.put("phone", "+221770000000");
        store.put("postal_address", "Dakar, Sénégal");

        // ✅ Actions (obligatoire)
        Map<String, Object> actions = new HashMap<>();
        actions.put("cancel_url", "https://promeet.com/payment/cancel");
        actions.put("return_url", "https://promeet.com/payment/return");
        actions.put("callback_url", "https://api.promeet.com/api/paiements/callback");

        // ✅ Custom data (optionnel mais pratique pour rattacher réservation ou email)
        Map<String, Object> customData = new HashMap<>();
        customData.put("client_email", clientEmail);
        customData.put("reservation_ref", "R-" + System.currentTimeMillis());

        // ✅ Payload complet
        Map<String, Object> payload = new HashMap<>();
        payload.put("invoice", invoice);
        payload.put("store", store);
        payload.put("actions", actions);
        payload.put("custom_data", customData);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode json = mapper.readTree(response.getBody());

            if (json.get("response_code").asText().equals("00")) {
                // ⚡️ Récupération infos importantes
                String lienPaiement = json.get("response_text").asText();
                String referenceTransaction = json.get("token").asText();
                String statut = "EN_ATTENTE";

                Map<String, String> result = new HashMap<>();
                result.put("lienPaiement", lienPaiement);
                result.put("referenceTransaction", referenceTransaction);
                result.put("statut", statut);
                result.put("email", clientEmail);
                result.put("description", description);
                result.put("montant", String.valueOf(montant));

                return result;
            } else {
                throw new Exception("Erreur PayDunya: " + json.get("response_text").asText());
            }
        } else {
            throw new Exception("Erreur HTTP PayDunya: " + response.getStatusCode());
        }
    }

    public boolean verifierSignature(Map<String, Object> payload, String signatureRecue) {
        try {
            String signatureAttendue = calculerSignature(payload);
            return signatureAttendue.equals(signatureRecue);
        } catch (Exception e) {
            return false;
        }
    }

    private String calculerSignature(Map<String, Object> payload) throws Exception {

        ObjectMapper mapper = new ObjectMapper();
        String payloadJson = mapper.writeValueAsString(payload);

        String secret = config.getPrivateKey();
        String toHash = payloadJson + secret;

        return DigestUtils.md5DigestAsHex(toHash.getBytes());
    }

}
