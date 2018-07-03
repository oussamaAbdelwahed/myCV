package iocv.app.services;

import iocv.app.beans.Email;
import iocv.app.beans.MyInformations;
import iocv.app.components.EmailServiceImpl;
import iocv.app.repositories.MyInformationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
