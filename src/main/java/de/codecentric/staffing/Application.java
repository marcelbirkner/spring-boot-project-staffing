package de.codecentric.staffing;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import de.codecentric.staffing.model.Customer;
import de.codecentric.staffing.model.Employee;
import de.codecentric.staffing.model.GeoLocation;
import de.codecentric.staffing.repository.CustomerRepository;
import de.codecentric.staffing.repository.EmployeeRepository;

@SpringBootApplication
public class Application {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    /**
     * Init MongoDB with test data
     */
    @PostConstruct
    public void initDb() {

        this.customerRepository.deleteAll();
        this.employeeRepository.deleteAll();

        Customer customerRewe = new Customer("REWE", "Food", "Aachener Straße, Cologne, Germany");
        GeoLocation geoLocation = new GeoLocation();
        geoLocation.setLatitude("50.936872");
        geoLocation.setLongitude("6.834235000000035");
        customerRewe.setGeoLocation(geoLocation);
        this.customerRepository.save(customerRewe);

        Employee employeeRandom = new Employee("John Doe", "john.doe@email.com", "Solingen");
        geoLocation.setLatitude("50.536872");
        geoLocation.setLongitude("6.434235000000035");
        employeeRandom.setGeoLocation(geoLocation);
        this.employeeRepository.save(employeeRandom);
    }
}
