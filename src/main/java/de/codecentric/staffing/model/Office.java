package de.codecentric.staffing.model;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Office {

	@Id private String id;
	
    private String office;
    private String address;
    private String telephone;
    private GeoLocation geoLocation;
    private Date createdOn;

	public Office(@JsonProperty("office") String office, @JsonProperty("telephone") String telephone, @JsonProperty("address") String address) {
        this.office = office;
        this.address = address;
        this.telephone = telephone;
        this.setCreatedOn(new Date());
    }
    public String getOffice() {
        return office;
    }
    public void setOffice(String office) {
        this.office = office;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getTelephone() {
        return telephone;
    }
    public void setTelephone(String telephone) {
        this.telephone = telephone;
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