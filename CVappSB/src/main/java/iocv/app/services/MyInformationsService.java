package iocv.app.services;

import iocv.app.beans.Email;
import iocv.app.beans.MyInformations;
import iocv.app.components.EmailServiceImpl;
import iocv.app.repositories.MyInformationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyInformationsService {
    @Autowired
    private MyInformationsRepository myInformationsRepository;
    @Autowired
    private EmailServiceImpl imlp;
    public MyInformations getMyInformations() {
        MyInformations infos=null;
       try{
           infos = this.myInformationsRepository.findByCurrent(true);
       }catch(Exception e) {}
       return infos;
    }
    public boolean sendEmail(Email email) {
        System.out.println(email);
        try {
            imlp.sendSimpleMessage(email.getEmailAddress(), email.getEmailSubject() != null ? email.getEmailSubject() : "for work", email.getEmailContent());
            return true;
        }catch(Exception e) {
            return false;
        }
    }

    /*public MyInformations getCurrentInformations() {
      try{
        return  this.myInformationsRepository.findByCurrent(true);
      }catch (Exception e) {
        e.printStackTrace();
        return null;
      }
    }*/

    public boolean updateMyInformations(MyInformations infos) {
     try{
         this.myInformationsRepository.updateMyInforations(infos.getTel(), infos.getEmail(), infos.getAddress(), infos.getZip(), infos.getParagraphe(),infos.getCurrent(), infos.getId());
       return true;
     }catch (Exception e) {
         e.printStackTrace();
         return false;
     }
    }
}
