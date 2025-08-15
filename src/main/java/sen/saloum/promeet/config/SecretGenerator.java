package sen.saloum.promeet.config;

import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import java.util.Base64;

public class SecretGenerator {
    public static void main(String[] args) {
        SecretKey key = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256);
        String base64Key = Base64.getEncoder().encodeToString(key.getEncoded());
        System.out.println(base64Key);
    }
}
