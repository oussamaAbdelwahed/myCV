package iocv.app.controllers;

import iocv.app.beans.Email;
import iocv.app.beans.MyInformations;
import iocv.app.services.MyInformationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.Response;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/myinformations")
public class MyInformationsController {
    @Autowired
    private MyInformationsService myInformationsService;


    @GetMapping("/get")
    public ResponseEntity<MyInformations> getMyInformations() {
      MyInformations infos = null;
      try{
         infos = this.myInformationsService.getMyInformations();
      }catch(Exception e){ }
      return new ResponseEntity<MyInformations>(infos,HttpStatus.OK);
    }
    @PostMapping("/sendemail")
    public ResponseEntity<Boolean> sendEmail(@RequestBody Email email) {
        boolean response = true;
        try{
            response = this.myInformationsService.sendEmail(email);
        }catch (Exception e) {}
        return new ResponseEntity<Boolean>(response, HttpStatus.OK);
    }

}
