package sen.saloum.promeet.services;


import sen.saloum.promeet.dto.ClientDto;

import java.util.List;

public interface ClientService {
    ClientDto create(ClientDto dto);
    ClientDto update(Long id, ClientDto dto);
    ClientDto getById(Long id);
    List<ClientDto> getAll();
    void delete(Long id);
}
