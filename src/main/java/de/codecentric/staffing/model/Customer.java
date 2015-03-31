package de.codecentric.staffing.model;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.springframework.data.annotation.Id;

public class Customer {

	@Id private String id;
	
    private String customerName;
    private String industry;
    private String address;
    private GeoLocation geoLocation;

	public Customer(String customerName, String industry, String address, GeoLocation geoLocation) {
        this.customerName = customerName;
        this.industry = industry;
        this.address = address;
        this.geoLocation = geoLocation;
    }
    public String getCustomerName() {
        return customerName;
    }
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
    public String getIndustry() {
        return industry;
    }
    public void setIndustry(String industry) {
        this.industry = industry;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public GeoLocation getGeoLocation() {
        return geoLocation;
    }
    public void setGeoLocation(GeoLocation geoLocation) {
        this.geoLocation = geoLocation;
    }
    
    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
    
}