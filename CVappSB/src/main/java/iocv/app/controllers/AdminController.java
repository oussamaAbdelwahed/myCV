package iocv.app.controllers;

import iocv.app.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;


@CrossOrigin(value = "*")
@RestController
public class AdminController {
    @Autowired
    private AdminService adminService;

    @GetMapping("/account/login")
    public Principal login(Principal principal) {
        System.err.println("whe are in the controller of admin login method");
       return principal;
    }
}