package de.codecentric.project.staffing;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.web.client.RestTemplate;

import de.codecentric.project.staffing.Application;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest("server.port:0")
public class ApplicationTests {

    @Value("${local.server.port}")
    private int port;

    @Value("${server.contextPath}")
    private String contextPath;

    private String serverUrl = "http://localhost:";
    private RestTemplate template = new TestRestTemplate();

    @Test
    public void homePageLoads() {
        ResponseEntity<String> response = template.getForEntity(serverUrl + port + contextPath, String.class);
        assertEquals(HttpStatus.FOUND, response.getStatusCode());
    }

    @Test
    public void userEndpointProtected() {
        ResponseEntity<String> response = template.getForEntity(serverUrl + port + contextPath + "/user", String.class);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }

    @Test
    public void resourceEndpointProtected() {
        ResponseEntity<String> response = template.getForEntity(serverUrl + port + contextPath + "/resource", String.class);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }

    @Test
    public void loginSucceeds() {
        RestTemplate template = new TestRestTemplate("user", "password");
        ResponseEntity<String> response = template.getForEntity(serverUrl + port + contextPath + "/user", String.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

}