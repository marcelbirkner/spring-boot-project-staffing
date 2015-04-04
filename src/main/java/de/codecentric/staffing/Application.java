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
        
        GeoLocation geoLocation = new GeoLocation();
        geoLocation.setLatitude("50.936872");
        geoLocation.setLongitude("6.834235000000035");
        
        Customer customerRewe = new Customer("REWE", "Food", "Aachener Straße, Cologne, Germany");
        customerRewe.setGeoLocation(geoLocation);
        this.customerRepository.save(customerRewe);
        
        Customer customerProvinzial = new Customer("Provinzial", "Insurance", "Provinzialplatz, Duesseldorf, Germany");
        customerProvinzial.setGeoLocation(geoLocation);
        this.customerRepository.save(customerProvinzial);

        for (int i = 0; i < 10; i++) {
            Customer customerRandom = new Customer("Customer #" + i, "General", "Test Street " + i + ", Metropolis, Planet Earth");
            geoLocation.setLatitude(Long.toString(50+i));
            geoLocation.setLongitude(Long.toString(6-i));
            customerRandom.setGeoLocation(geoLocation);
            this.customerRepository.save(customerRandom);
            
            Employee employeeRandom = new Employee("John Doe #" + i, i + "-john.doe@email.com", "Solingen");
            geoLocation.setLatitude(Long.toString(50-i));
            geoLocation.setLongitude(Long.toString(6+i));
            employeeRandom.setGeoLocation(geoLocation);
            this.employeeRepository.save(employeeRandom);
        }

    }
}
