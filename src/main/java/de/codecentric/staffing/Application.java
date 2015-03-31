package de.codecentric.staffing;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import de.codecentric.staffing.model.Customer;
import de.codecentric.staffing.model.GeoLocation;
import de.codecentric.staffing.repository.CustomerRepository;

@SpringBootApplication
public class Application {

    @Autowired
    private CustomerRepository repository;
    
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	
	@PostConstruct
    public void initDb() {

        this.repository.deleteAll();

        // save a couple of customers
        GeoLocation geoLocation = new GeoLocation();
        geoLocation.setLongitude("50.936872");
        geoLocation.setLatitude("6.834235000000035");
        
        this.repository.save(new Customer("REWE", "Food", "Aachener Straße, Cologne, Germany", geoLocation));
        this.repository.save(new Customer("Provinzial", "Insurance", "Provinzialplatz, Duesseldorf, Germany", geoLocation));

        // fetch all customers
        System.out.println("Customers found with findAll():");
        System.out.println("-------------------------------");
        for (Customer customer : this.repository.findAll()) {
            System.out.println(customer);
        }
        System.out.println();

        // fetch an individual customer
        System.out.println("Customer found with findByCustomerName('REWE'):");
        System.out.println("--------------------------------");
        System.out.println(this.repository.findByCustomerName("REWE"));

    }
}
