package de.codecentric.staffing.model;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Customer {

	@Id private String id;
	
    private String customerName;
    private String industry;
    private String address;
    private GeoLocation geoLocation;
    private Date createdOn;

	public Customer(@JsonProperty("customerName") String customerName, @JsonProperty("industry") String industry, @JsonProperty("address") String address) {
        this.customerName = customerName;
        this.industry = industry;
        this.address = address;
        this.setCreatedOn(new Date());
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
    
    public Date getCreatedOn() {
        return createdOn;
    }
    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }
    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
    
}