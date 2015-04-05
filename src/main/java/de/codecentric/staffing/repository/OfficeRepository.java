package de.codecentric.staffing.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import de.codecentric.staffing.model.Office;

@RepositoryRestResource(collectionResourceRel = "office", path = "office")
public interface OfficeRepository extends MongoRepository<Office, String> {

    List<Office> findByOffice(@Param("office") String office);

}