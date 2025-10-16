package sen.saloum.promeet.controler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.CompanyInfoDto;
import sen.saloum.promeet.services.Impl.CompanyInfoService;

import java.util.List;

@RestController
@RequestMapping("/api/company-info")// autorise Angular
public class CompanyInfoController {

    private final CompanyInfoService companyInfoService;

    public CompanyInfoController(CompanyInfoService companyInfoService) {
        this.companyInfoService = companyInfoService;
    }

    // === CREATE ===
    @PostMapping
    public ResponseEntity<CompanyInfoDto> create(@RequestBody CompanyInfoDto dto) {
        CompanyInfoDto created = companyInfoService.createCompanyInfo(dto);
        return ResponseEntity.ok(created);
    }

    // === READ ALL ===
    @GetMapping
    public ResponseEntity<List<CompanyInfoDto>> getAll() {
        List<CompanyInfoDto> list = companyInfoService.getAllCompanyInfos();
        return ResponseEntity.ok(list);
    }

    // === READ BY ID ===
    @GetMapping("/{id}")
    public ResponseEntity<CompanyInfoDto> getById(@PathVariable Long id) {
        CompanyInfoDto dto = companyInfoService.getCompanyInfoById(id);
        return ResponseEntity.ok(dto);
    }

    // === UPDATE ===
    @PutMapping("/{id}")
    public ResponseEntity<CompanyInfoDto> update(@PathVariable Long id, @RequestBody CompanyInfoDto dto) {
        CompanyInfoDto updated = companyInfoService.updateCompanyInfo(id, dto);
        return ResponseEntity.ok(updated);
    }

    // === DELETE ===
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        companyInfoService.deleteCompanyInfo(id);
        return ResponseEntity.noContent().build();
    }
}
