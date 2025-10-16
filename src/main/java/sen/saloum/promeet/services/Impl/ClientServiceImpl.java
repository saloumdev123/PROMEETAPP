package sen.saloum.promeet.services.Impl;


import org.springframework.stereotype.Service;
import sen.saloum.promeet.dto.ClientDto;
import sen.saloum.promeet.mapstracts.ClientMapper;
import sen.saloum.promeet.models.Client;
import sen.saloum.promeet.repos.ClientRepository;
import sen.saloum.promeet.services.ClientService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;

    public ClientServiceImpl(ClientRepository clientRepository, ClientMapper clientMapper) {
        this.clientRepository = clientRepository;
        this.clientMapper = clientMapper;
    }

    @Override
    public ClientDto create(ClientDto dto) {
        Client client = clientMapper.toEntity(dto);
        client = clientRepository.save(client);
        return clientMapper.toDto(client);
    }

    @Override
    public ClientDto update(Long id, ClientDto dto) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client non trouvé"));
        client.setNom(dto.getNom());
        client.setAdresse(dto.getAdresse());
        client.setTelephone(dto.getTelephone());
        client.setEmail(dto.getEmail());
        client.setDepartement(dto.getDepartement());
        client = clientRepository.save(client);
        return clientMapper.toDto(client);
    }

    @Override
    public ClientDto getById(Long id) {
        return clientRepository.findById(id)
                .map(clientMapper::toDto)
                .orElseThrow(() -> new RuntimeException("Client non trouvé"));
    }

    @Override
    public List<ClientDto> getAll() {
        return clientRepository.findAll().stream()
                .map(clientMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        clientRepository.deleteById(id);
    }
}
