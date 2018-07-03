package iocv.app.controllers;

import iocv.app.beans.Technology;
import iocv.app.services.TechnologyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tech")
@CrossOrigin("*")
public class TechnologyController {
    @Autowired
    private TechnologyService techService;
    @GetMapping("/all")
    public ResponseEntity<List<Technology>> getAll() {
         return new ResponseEntity<List<Technology>>(this.techService.getAll(), HttpStatus.OK);
    }
}
