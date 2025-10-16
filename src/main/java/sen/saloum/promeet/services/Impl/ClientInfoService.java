package sen.saloum.promeet.services.Impl;


import org.springframework.stereotype.Service;
import sen.saloum.promeet.dto.ClientInfoDto;
import sen.saloum.promeet.mapstracts.ClientInfoMapper;
import sen.saloum.promeet.models.ClientInfo;
import sen.saloum.promeet.repos.ClientInfoRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClientInfoService {

    private final ClientInfoRepository clientInfoRepository;
    private final ClientInfoMapper clientInfoMapper;

    public ClientInfoService(ClientInfoRepository clientInfoRepository, ClientInfoMapper clientInfoMapper) {
        this.clientInfoRepository = clientInfoRepository;
        this.clientInfoMapper = clientInfoMapper;
    }

    // 🔹 Créer un client
    public ClientInfoDto create(ClientInfoDto dto) {
        ClientInfo entity = clientInfoMapper.toEntity(dto);
        ClientInfo saved = clientInfoRepository.save(entity);
        return clientInfoMapper.toDto(saved);
    }

    // 🔹 Récupérer tous les clients
    public List<ClientInfoDto> getAll() {
        return clientInfoRepository.findAll()
                .stream()
                .map(clientInfoMapper::toDto)
                .collect(Collectors.toList());
    }

    // 🔹 Récupérer un client par ID
    public Optional<ClientInfoDto> getById(Long id) {
        return clientInfoRepository.findById(id)
                .map(clientInfoMapper::toDto);
    }

    // 🔹 Mettre à jour un client
    public Optional<ClientInfoDto> update(Long id, ClientInfoDto dto) {
        return clientInfoRepository.findById(id)
                .map(existing -> {
                    existing.setCompany(dto.getCompany());
                    existing.setManager(dto.getManager());
                    existing.setAddress(dto.getAddress());
                    existing.setPhone(dto.getPhone());
                    existing.setMobile(dto.getMobile());
                    existing.setEmail(dto.getEmail());
                    ClientInfo updated = clientInfoRepository.save(existing);
                    return clientInfoMapper.toDto(updated);
                });
    }

    // 🔹 Supprimer un client
    public boolean delete(Long id) {
        if (clientInfoRepository.existsById(id)) {
            clientInfoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
