package iocv.app.controllers;

import iocv.app.beans.CVImage;
import iocv.app.common.ImageType;
import iocv.app.services.ImageService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/cvimages")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @GetMapping("/{type}")
    public ResponseEntity<CVImage> getOneImage(@PathVariable("type") ImageType type) throws Exception{
        CVImage image=null;
        if(type == ImageType.NAVBAR_LOGO) {
            System.err.println("we are in the logo picture");
             image = this.imageService.getLogoImage();
        }else if(type == ImageType.ME_BIG_PICTURE){
            System.err.println("we are in the me big picture");
             image = this.imageService.getMyBigPicture();
        }
        return new ResponseEntity<CVImage>(image, HttpStatus.OK);
    }
    @GetMapping("/certifications")
    public ResponseEntity<List<CVImage>> getAllCertifications() {
        List<CVImage> certifictions= new LinkedList<>();
        try {
           certifictions = this.imageService.getAllCertifications();
        }catch (Exception e){
            e.printStackTrace();
        }
        return  new ResponseEntity<>(certifictions,HttpStatus.OK);
    }
}
