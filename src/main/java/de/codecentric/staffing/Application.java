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
	
	@PostConstruct
    public void initDb() {

	    // create test data for MongoDB
        this.customerRepository.deleteAll();
        this.employeeRepository.deleteAll();
        
        GeoLocation geoLocation = new GeoLocation();
        geoLocation.setLongitude("50.936872");
        geoLocation.setLatitude("6.834235000000035");
        this.customerRepository.save(new Customer("REWE", "Food", "Aachener Straße, Cologne, Germany", geoLocation));
        this.customerRepository.save(new Customer("Provinzial", "Insurance", "Provinzialplatz, Duesseldorf, Germany", geoLocation));
        for (int i = 0; i < 10; i++) {
            this.customerRepository.save(new Customer("Customer #" + i, "General", "Test Street " + i + ", Metropolis, Planet Earth", geoLocation));
            this.employeeRepository.save(new Employee("John Doe #" + i, i + "-john.doe@email.com", "Solingen"));
        }

    }
}
