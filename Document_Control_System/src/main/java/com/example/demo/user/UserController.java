package com.example.demo.user;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController // ability to expose the resources to end point the client can approach
@RequestMapping(path = "api/v1/users") // change url
public class UserController {

    @GetMapping
    public List<User> getAllUsers() {
        List<User> users = Arrays.asList(
                new User(1L,
                        "Masha",
                        "Masha@gmail.com",
                        Gender.FEMALE),
                new User(2L,
                        "Karl",
                        "Karl@agmail.com",
                        Gender.MALE)
        );
        return users;
    }
}
