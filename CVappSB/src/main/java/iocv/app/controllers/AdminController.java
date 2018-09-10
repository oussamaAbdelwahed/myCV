package iocv.app.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import iocv.app.beans.*;
import iocv.app.common.FormationType;
import iocv.app.common.ImageType;
import iocv.app.common.MultipartFileManipulation;
import iocv.app.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.security.Principal;
import java.util.*;

@CrossOrigin(value = "http://localhost:4200")
@RestController
public class AdminController {
    @Autowired
    private AdminService adminService;
    @Autowired
    private ImageService imageService;
    @Autowired
    private FormationService formationService;
    @Autowired
    private MyInformationsService myInformationsService;
    @Autowired
    private TechnologyService technologyService;
    @Autowired
    private MultipartFileManipulation multipartFileManipulation;

    @GetMapping("/account/login")
    public Principal login(Principal principal) {
        return principal;
    }

    @GetMapping("/account/logout")
    public ResponseEntity<Boolean>  logout(HttpServletRequest req,HttpServletResponse rep) {
        HttpSession session = req.getSession(false);
        if(session != null)
            session.invalidate();

        Cookie c = new Cookie("JSESSIONID","deleted");
        c.setMaxAge(0);
        c.setDomain("localhost");
        c.setPath("/");
        c.setHttpOnly(true);
        rep.addCookie(c);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @GetMapping("/account/requiredlogin")
    public void test() {
        System.out.println("***************we have access now****************");
    }



 /*    Images Work **************************************************************************************************************************  */
    @GetMapping("/admin/images/{type}")
    public ResponseEntity<List<CVImage>> getAllImagesByType(@PathVariable ImageType type) {
        return new ResponseEntity<List<CVImage>>(this.imageService.getAllImagesByType(type),HttpStatus.OK);
    }

    @GetMapping("/admin/images/byid/{id}")
    public ResponseEntity<CVImage> getOneById(@PathVariable Long id) throws IOException {
      return new ResponseEntity<CVImage>(this.imageService.getOneById(id),HttpStatus.OK);
    }


    @PostMapping(value = "/admin/images/save",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Boolean> addCVImage(@RequestParam("image") MultipartFile image, @RequestParam("serializedObj") String cvimage) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        CVImage img = objectMapper.readValue(cvimage,CVImage.class);
        img.setImage(image.getBytes());
        img.setExtension(this.multipartFileManipulation.getExtension(image));
        img.setName(image.getOriginalFilename());
        boolean test = this.imageService.saveCVImage(img);

        return new ResponseEntity<Boolean>(test, HttpStatus.OK);
    }


    @PostMapping(value = "/admin/images/update",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public   ResponseEntity<Boolean> updateImage(
             @RequestParam MultipartFile image,
             @RequestParam int show,
             @RequestParam String alt,
             @RequestParam String description,
             @RequestParam Long id
    ) throws IOException {
        boolean isImage = this.multipartFileManipulation.isImage(image);
        if(isImage) {
            CVImage img = new CVImage();
            img.setShow(show == 0 ? false : true);
            img.setDescription(description);
            img.setAlt(alt);
            img.setImage(image.getBytes());
            img.setId(id);
            boolean res = this.imageService.updateCVImage(img, true);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }

    @PostMapping("/admin/images/updateplaintext")
    public  ResponseEntity<Boolean> updateImageCredentials(@RequestBody() CVImage image)  {
        boolean res = this.imageService.updateCVImage(image,false);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }


    @PostMapping("/admin/images/delete")
    public ResponseEntity<Boolean> deleteCVImage(@RequestBody() Map<String, String> map) {
        try{
            boolean test = this.imageService.deleteCVImage(Long.parseLong(map.get("id")));
            return  new ResponseEntity<>(test,HttpStatus.OK);
        }catch (NumberFormatException e) {
            return  new ResponseEntity<>(false,HttpStatus.OK);
        }
    }

 /*   END IMAGES WORK  ********************************************************************************************************************  */



 /*  Formations WORK  ************************************************************************************************************************* */

   @GetMapping("/admin/formations/{type}")
   public ResponseEntity<List<Formation>> getAllFormationsByType(@PathVariable FormationType type) {
       return new ResponseEntity<List<Formation>>(this.formationService.getAllFormationsByType(type), HttpStatus.OK);
   }


   @GetMapping("/admin/formations/byid/{id}")
   public ResponseEntity<Formation> getOneFormationById(@PathVariable Long id) {
       return new ResponseEntity<Formation>(this.formationService.getOneById(id),HttpStatus.OK);
   }

    @PostMapping(value = "/admin/formations/save",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Boolean> addFormation(@RequestParam("proofDocument") MultipartFile proofDocument, @RequestParam("serializedObj") String formation) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Formation form = objectMapper.readValue(formation,Formation.class);
        form.setProofDocument(proofDocument.getBytes());
        form.setName(proofDocument.getOriginalFilename());
        boolean test = this.formationService.saveFormation(form);

        return new ResponseEntity<Boolean>(test, HttpStatus.OK);
    }

    @PostMapping(value = "/admin/formations/update",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public   ResponseEntity<Boolean> updateFormation(@RequestParam("proofDocument") MultipartFile proofDocument,@RequestParam("formation") String formation) throws IOException {
       ObjectMapper objectMapper = new ObjectMapper();
       Formation form = objectMapper.readValue(formation, Formation.class);
       form.setProofDocument(proofDocument.getBytes());
       boolean res  =this.formationService.updateFormation(form, true);

      return new ResponseEntity<Boolean>(res, HttpStatus.OK);
    }

    @PostMapping(value = "/admin/formations/updateplaintext")
    public   ResponseEntity<Boolean> updateFormationPlainText(@RequestBody() Formation formation) throws IOException {
       boolean res  = this.formationService.updateFormation(formation, false);
       return new ResponseEntity<Boolean>(res, HttpStatus.OK);
    }

    @PostMapping("/admin/formations/delete")
    public ResponseEntity<Boolean> deleteFormation(@RequestBody() Map<String, String> map) {
        try{
            boolean test = this.formationService.deleteFormation(Long.parseLong(map.get("id")));
            return  new ResponseEntity<>(test,HttpStatus.OK);
        }catch (NumberFormatException e) {
            return  new ResponseEntity<>(false,HttpStatus.OK);
        }
    }
 /*   END FORMATIONS WORK  *******************************************************************************************************************  */



 /*  Technologies WORK  ************************************************************************************************************************* */

    @GetMapping("/admin/technologies/byid/{id}")
    public ResponseEntity<Technology> getOneTechnology(@PathVariable("id") Long id) {
       return new ResponseEntity<Technology>(this.technologyService.getOneById(id), HttpStatus.OK);
    }

    @PostMapping("/admin/technologies/save")
    public ResponseEntity<Boolean> saveTechnology(@RequestParam("image") MultipartFile techImage, @RequestParam("technology") String technology) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Technology tech = mapper.readValue(technology, Technology.class);
        tech.setTechnology(techImage.getBytes());
        boolean test = this.technologyService.saveTechnology(tech);
        return new ResponseEntity<Boolean>(test, HttpStatus.OK);
    }

    @PostMapping("/admin/technologies/update")
    public ResponseEntity<Boolean> updateTechnology(@RequestParam("image") MultipartFile techImage, @RequestParam("technology") String technology) throws IOException {
        if(techImage != null && this.multipartFileManipulation.isImage(techImage)) {
            ObjectMapper mapper = new ObjectMapper();
            Technology tech = mapper.readValue(technology, Technology.class);
            tech.setTechnology(techImage.getBytes());
            boolean test = this.technologyService.updateTechnology(tech, true);
            return new ResponseEntity<Boolean>(test, HttpStatus.OK);
        }else{
            return new ResponseEntity<Boolean>(false,HttpStatus.OK);
        }
    }

    @PostMapping("/admin/technologies/updateplaintext")
    public ResponseEntity<Boolean> updateTechnologyPlainText(@RequestBody() Technology technology) {
        boolean test = this.technologyService.updateTechnology(technology, false);
        return new ResponseEntity<Boolean>(test, HttpStatus.OK);
    }

    @PostMapping("/admin/technologies/delete")
    public ResponseEntity<Boolean> deleteTechnology(@RequestBody() Map<String, String> map) {
        try{
            boolean test = this.technologyService.deleteTechnology(Long.parseLong(map.get("id")));
            return  new ResponseEntity<>(test,HttpStatus.OK);
        }catch (NumberFormatException e) {
            return  new ResponseEntity<>(false,HttpStatus.OK);
        }
    }
 /*   END Technologies WORK  *******************************************************************************************************************  */


 /*MY INFORMATIONS WORK ************************************************************************************************************* */
    @GetMapping("/admin/myinfos")
    public ResponseEntity<MyInformations> getCurrentInfos() {
        return new ResponseEntity<MyInformations>(this.myInformationsService.getMyInformations(), HttpStatus.OK);
    }

    @PostMapping("/admin/myinfos/update")
    public ResponseEntity<Boolean> updateMyInfos(@RequestBody() MyInformations myInofs) {
        return  new ResponseEntity<Boolean>(this.myInformationsService.updateMyInformations(myInofs),HttpStatus.OK);
    }

 /*END MY INFORMATIONS WORK ************************************************************************************************************/


 /*EDIT ADMIN ACCOUNT CREDENTIALS ************************************************************************************************************* */


  @PostMapping("/admin/updatecredentials")
    public ResponseEntity<?> updateAdminAccountCredentials(@RequestParam("admin") String a, @RequestParam("oldPassword") String oldPassword) throws IOException {
      ObjectMapper mapper = new ObjectMapper();
      Admin admin = mapper.readValue(a, Admin.class);
      boolean res = this.adminService.updateAdminCredentials(admin, oldPassword);
        if(res) {
            admin.setPassword("");
            return new ResponseEntity<Object>(admin, HttpStatus.OK);
        }else{
            return new ResponseEntity<Object>("l ancien mot de passe est invalide", HttpStatus.NOT_ACCEPTABLE);
        }
   }

  /*END EDIT ADMIN ACCOUNT CREDENTIALS ************************************************************************************************************* */
}
