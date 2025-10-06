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


                        .requestMatchers(HttpMethod.GET, "/api/auth/profile").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/utilisateurs/**").hasAnyRole("ADMIN", "PARTICULIER", "PROFESSIONNEL")
                        .requestMatchers(HttpMethod.PUT, "/api/auth/profile").hasAnyRole("PARTICULIER","PROFESSIONNEL","ADMIN")


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
