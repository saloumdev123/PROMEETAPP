package sen.saloum.promeet.controler;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.ClientInfoDto;
import sen.saloum.promeet.services.Impl.ClientInfoService;

import java.util.List;

@RestController
@RequestMapping("/api/client-info")
public class ClientInfoController {

    private final ClientInfoService clientInfoService;

    public ClientInfoController(ClientInfoService clientInfoService) {
        this.clientInfoService = clientInfoService;
    }

    @PostMapping
    public ResponseEntity<ClientInfoDto> create(@RequestBody ClientInfoDto dto) {
        return ResponseEntity.ok(clientInfoService.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<ClientInfoDto>> getAll() {
        return ResponseEntity.ok(clientInfoService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientInfoDto> getById(@PathVariable Long id) {
        return clientInfoService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientInfoDto> update(@PathVariable Long id, @RequestBody ClientInfoDto dto) {
        return clientInfoService.update(id, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = clientInfoService.delete(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
