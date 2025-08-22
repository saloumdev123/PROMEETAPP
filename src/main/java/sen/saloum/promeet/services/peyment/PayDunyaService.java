package sen.saloum.promeet.services.peyment;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import sen.saloum.promeet.config.PayDunyaConfig;

import java.util.HashMap;
import java.util.Map;

@Service
public class PayDunyaService {

    @Autowired
    private PayDunyaConfig config;

    private final RestTemplate restTemplate = new RestTemplate();

    public String initierPaiement(String clientEmail, String description, double montant) throws Exception {
        String url = "https://app.paydunya.com/api/v1/checkout-invoice/create";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("PAYDUNYA-MASTER-KEY", config.getMasterKey());
        headers.set("PAYDUNYA-PUBLIC-KEY", config.getPublicKey());
        headers.set("PAYDUNYA-PRIVATE-KEY", config.getPrivateKey());
        headers.set("PAYDUNYA-TOKEN", config.getToken());
        headers.set("mode", config.getMode());

        Map<String, Object> payload = new HashMap<>();
        payload.put("invoice", Map.of(
                "items", new Object[]{
                        Map.of("name", description, "quantity", 1, "unit_price", montant)
                },
                "total_amount", montant,
                "description", description
        ));
        payload.put("store", Map.of(
                "name", "Promeet",
                "website_url", """
                        http://www.exemple.com"""
        ));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode json = mapper.readTree(response.getBody());

            if (json.get("response_code").asText().equals("00")) {
                return json.get("response_text").asText(); // URL de paiement
            } else {
                throw new Exception("Erreur PayDunya: " + json.get("response_text").asText());
            }
        } else {
            throw new Exception("Erreur HTTP PayDunya: " + response.getStatusCode());
        }
    }
}
