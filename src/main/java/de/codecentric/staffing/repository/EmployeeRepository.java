package de.codecentric.staffing.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import de.codecentric.staffing.model.Employee;

@RepositoryRestResource(collectionResourceRel = "employee", path = "employees")
public interface EmployeeRepository extends MongoRepository<Employee, String> {

    List<Employee> findByFullName(@Param("fullName") String fullName);
    List<Employee> findByOffice(@Param("office") String office);

}