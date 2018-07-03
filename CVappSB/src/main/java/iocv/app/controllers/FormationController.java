package iocv.app.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import iocv.app.beans.Formation;
import iocv.app.services.FormationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/myformations")
public class FormationController {
    @Autowired
    private FormationService formationService;

    @GetMapping("/all")
    public ResponseEntity<List<Formation>> getAll() {
       List<Formation> formations = null;
        try{
             formations = this.formationService.getAllFormations();
        }catch(Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<List<Formation>>(formations, HttpStatus.OK);
    }
}
