package sen.saloum.promeet.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import sen.saloum.promeet.repos.UtilisateurRepository;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http

                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
                        // Auth open endpoints
                        .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/register").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/forgot-password").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/reset-password").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/avis/**").permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/produits/**").permitAll()        // Lecture accessible à tous
                        .requestMatchers(HttpMethod.POST, "/api/produits/**").hasRole("ADMIN")   // Création uniquement Admin
                        .requestMatchers(HttpMethod.PUT, "/api/produits/**").hasRole("ADMIN")    // Modification uniquement Admin
                        .requestMatchers(HttpMethod.DELETE, "/api/produits/**").hasRole("ADMIN") // Suppression uniquement Admin

                                // --- AVOIRS ---
                                .requestMatchers(HttpMethod.GET, "/api/avoirs/**").permitAll()        // Lecture publique (si tu veux afficher sans login)
                                .requestMatchers(HttpMethod.POST, "/api/avoirs/**").permitAll()       // Création accessible (tu peux restreindre à ADMIN si nécessaire)
                                .requestMatchers(HttpMethod.PUT, "/api/avoirs/**").permitAll()        // Modification accessible
                                .requestMatchers(HttpMethod.DELETE, "/api/avoirs/**").hasRole("ADMIN") // Suppression réservée à ADMIN

                                // --- LIGNE OUVRAGES ---
                                .requestMatchers(HttpMethod.GET, "/api/ligne-ouvrages/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/ligne-ouvrages/**").permitAll()
                                .requestMatchers(HttpMethod.PUT, "/api/ligne-ouvrages/**").permitAll()
                                .requestMatchers(HttpMethod.DELETE, "/api/ligne-ouvrages/**").hasRole("ADMIN")


                                .requestMatchers(HttpMethod.GET, "/api/auth/profile").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/utilisateurs/**").hasAnyRole("ADMIN", "PARTICULIER", "PROFESSIONNEL")
                        .requestMatchers(HttpMethod.PUT, "/api/auth/profile").hasAnyRole("PARTICULIER","PROFESSIONNEL","ADMIN")

                                // --- CLIENT INFO ---
                                .requestMatchers(HttpMethod.GET, "/api/client-info/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/client-info/**").permitAll()
                                .requestMatchers(HttpMethod.PUT, "/api/client-info/**").permitAll()
                                .requestMatchers(HttpMethod.DELETE, "/api/client-info/**").permitAll()


                                .requestMatchers(HttpMethod.GET, "/api/offres/**").permitAll()
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/paiements/callback").permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/avis/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/avis/**").hasAnyRole("PARTICULIER", "ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/avis/**").hasAnyRole("PARTICULIER", "PROFESSIONNEL", "ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/avis/**").hasAnyRole("PARTICULIER", "PROFESSIONNEL", "ADMIN")


                        .requestMatchers(HttpMethod.GET, "/api/utilisateurs/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/utilisateurs").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/admin/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/api/offres/**").hasAnyRole("PROFESSIONNEL", "ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/offres/**").hasAnyRole("PROFESSIONNEL", "ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/offres/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST,"/api/paiements/**").hasAnyRole("PARTICULIER", "ADMIN")

                        .requestMatchers(HttpMethod.POST, "/api/reservations/**").hasAnyRole("PARTICULIER", "ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/reservations/**").hasAnyRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/reservations/validation/**").hasAnyRole("ADMIN", "PROFESSIONNEL")
                        .requestMatchers(HttpMethod.GET, "/api/reservations/**").hasAnyRole("PARTICULIER", "ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/reservations/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/api/categories/**").hasRole("ADMIN")      // Création uniquement Admin
                        .requestMatchers(HttpMethod.PUT, "/api/categories/**").hasRole("ADMIN")       // Update uniquement Admin
                        .requestMatchers(HttpMethod.DELETE, "/api/categories/**").hasRole("ADMIN")    // Suppression uniquement Admin
                        .requestMatchers(HttpMethod.GET, "/api/categories/**").permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/magasins/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/magasins/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/magasins/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/magasins/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/api/candidats").permitAll() // inscription
                        .requestMatchers(HttpMethod.GET, "/api/candidats/{id}").hasAnyRole("PARTICULIER", "PROFESSIONNEL", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/candidats").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/candidats/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/api/documents/**").hasAnyRole("PARTICULIER", "PROFESSIONNEL", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/documents/**").hasAnyRole("PARTICULIER", "PROFESSIONNEL", "ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/documents/**").hasAnyRole("PARTICULIER", "PROFESSIONNEL", "ADMIN")

                        .requestMatchers(HttpMethod.POST, "/api/abonnements/**").hasAnyRole("PARTICULIER", "PROFESSIONNEL", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/abonnements/actifs").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/abonnements/expires").hasRole("ADMIN")

                        // --- Devis ---
                        .requestMatchers(HttpMethod.GET, "/api/devis/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/devis/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/devis/**").hasAnyRole("ADMIN", "PROFESSIONNEL")
                        .requestMatchers(HttpMethod.DELETE, "/api/devis/**").hasRole("ADMIN")

                        // --- Lignes Devis ---
                        .requestMatchers(HttpMethod.GET, "/api/lignes-devis/**").hasAnyRole("ADMIN", "PROFESSIONNEL")
                        .requestMatchers(HttpMethod.POST, "/api/lignes-devis/**").hasAnyRole("ADMIN", "PROFESSIONNEL")
                        .requestMatchers(HttpMethod.PUT, "/api/lignes-devis/**").hasAnyRole("ADMIN", "PROFESSIONNEL")
                        .requestMatchers(HttpMethod.DELETE, "/api/lignes-devis/**").hasRole("ADMIN")

                        // --- Fournitures ---
                        .requestMatchers(HttpMethod.GET, "/api/fournitures/**").hasAnyRole("ADMIN", "PROFESSIONNEL")
                        .requestMatchers(HttpMethod.POST, "/api/fournitures/**").hasAnyRole("ADMIN", "PROFESSIONNEL")
                        .requestMatchers(HttpMethod.PUT, "/api/fournitures/**").hasAnyRole("ADMIN", "PROFESSIONNEL")
                        .requestMatchers(HttpMethod.DELETE, "/api/fournitures/**").hasRole("ADMIN")

                        // ====================================================
                        // 🔐 ENDPOINTS DEVIS DE0031, ENTREPRISE, CLIENT, LIGNES
                        // ====================================================

                        // --- ENTREPRISE ---
                        .requestMatchers(HttpMethod.GET, "/api/entreprises/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/entreprises/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/entreprises/**").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/api/entreprises/**").permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/clients/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/clients/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/clients/**").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/api/clients/**").permitAll()

// --- COMPANY INFO ---
                                .requestMatchers(HttpMethod.GET, "/api/company-info/**").permitAll()        // Lecture publique
                                .requestMatchers(HttpMethod.POST, "/api/company-info/**").permitAll()      // Création réservée à ADMIN
                                .requestMatchers(HttpMethod.PUT, "/api/company-info/**").permitAll()       // Modification réservée à ADMIN
                                .requestMatchers(HttpMethod.DELETE, "/api/company-info/**").hasRole("ADMIN") // Suppression réservée à ADMIN

                        // --- FACTURES ---
                        .requestMatchers(HttpMethod.GET, "/api/invoices/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/invoices/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/invoices/**").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/api/invoices/**").permitAll()

// --- DEVELOPPEURS ---
                                .requestMatchers(HttpMethod.GET, "/api/developpeurs/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/developpeurs/**").permitAll()
                                .requestMatchers(HttpMethod.PUT, "/api/developpeurs/**").permitAll()
                                .requestMatchers(HttpMethod.DELETE, "/api/developpeurs/**").permitAll()
// --- COMPANY INFO ---
                                .requestMatchers(HttpMethod.GET, "/api/company-info/**").permitAll()        // Lecture publique
                                .requestMatchers(HttpMethod.POST, "/api/company-info/**").permitAll()
                                .requestMatchers(HttpMethod.PUT, "/api/company-info/**").permitAll()     // Modification réservée aux admins
                                .requestMatchers(HttpMethod.DELETE, "/api/company-info/**").permitAll()  // Suppression réservée aux admins

// --- PROJETS ---
                                .requestMatchers(HttpMethod.GET, "/api/projets/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/projets/**").permitAll()
                                .requestMatchers(HttpMethod.PUT, "/api/projets/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/api/projets/**").permitAll()


                                // --- DOCUMENT INFO ---
                                .requestMatchers(HttpMethod.GET, "/api/document-info/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/document-info/**").permitAll()
                                .requestMatchers(HttpMethod.PUT, "/api/document-info/**").hasAnyRole("ADMIN", "PROFESSIONNEL")
                                .requestMatchers(HttpMethod.DELETE, "/api/document-info/**").hasRole("ADMIN")

                                // --- DOCUMENT ITEM ---
                                .requestMatchers(HttpMethod.GET, "/api/document-items/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/document-items/**").permitAll()
                                .requestMatchers(HttpMethod.PUT, "/api/document-items/**").hasAnyRole("ADMIN", "PROFESSIONNEL")
                                .requestMatchers(HttpMethod.DELETE, "/api/document-items/**").hasRole("ADMIN")

                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
    @Bean
    public UserDetailsService userDetailsService(UtilisateurRepository utilisateurRepository) {
        return username -> utilisateurRepository.findByEmail(username)
                .map(user -> org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
                        .password(user.getPassword())
                        .roles(user.getRole().name())
                        .build())
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:4300"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
