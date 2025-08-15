package sen.saloum.promeet.services.peyment;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

@Service
public class AfribapayAuthService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${afribapay.api.url}")
    private String apiUrl;

    @Value("${afribapay.api.user}")
    private String apiUser;

    @Value("${afribapay.api.key}")
    private String apiKey;

    public String getAccessToken() {
        // 1. Construire les headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String auth = apiUser + ":" + apiKey;
        byte[] encodedAuth = Base64.getEncoder().encode(auth.getBytes(StandardCharsets.UTF_8));
        String authHeader = "Basic " + new String(encodedAuth, StandardCharsets.UTF_8);
        headers.set("Authorization", authHeader);

        // 2. Construire la requête
        HttpEntity<String> request = new HttpEntity<>(headers);

        // 3. Envoyer la requête
        ResponseEntity<Map> response =
                restTemplate.postForEntity(apiUrl + "/token", request, Map.class);

        // 4. Extraire le token
        if (response.getStatusCode().is2xxSuccessful()) {
            Map<String, Object> body = response.getBody();
            Map<String, Object> data = (Map<String, Object>) body.get("data");
            return (String) data.get("access_token");
        }
        throw new RuntimeException("Impossible de récupérer le token Afribapay");
    }
}
