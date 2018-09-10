package iocv.app.services;

import iocv.app.beans.Formation;
import iocv.app.common.FormationType;
import iocv.app.repositories.FormationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class FormationService {
    @Autowired
    private FormationRepository formationRepository;

    public List<Formation> getAllFormations() {
        List<Formation> formations = null;
        try {
            formations = this.formationRepository.findAll();
        }catch(Exception e ) {
            e.printStackTrace();
        }
        return formations;
    }

    public List<Formation> getAllFormationsByType(FormationType type) {
        List<Formation> formations = new LinkedList<>();
        try {
            formations = this.formationRepository.findAllByType(type);
        }catch(Exception e ) {
            e.printStackTrace();
        }
        return formations;
    }

    public Formation getOneById(Long id) {
       try {
           return  this.formationRepository.findById(id).get();
       }catch (Exception e) {
           e.printStackTrace();
           return null;
       }
    }

    public boolean saveFormation(Formation formation) {
        try{
             this.formationRepository.save(formation);
             return true;
        }catch(Exception e) {
            return false;
        }
    }


    public boolean updateFormation(Formation form, boolean withDocument) {
        try{
           if(withDocument) {
              this.formationRepository.updateFormation(form.getType(), form.getDescription(), form.getProofDocument(), form.getId());
           }else{
              this.formationRepository.updateFormationPlainText(form.getType(), form.getDescription(), form.getId());
           }
            return true;
        }catch (Exception e) {
          e.printStackTrace();
          return false;
        }
    }
    //mezalet kan update


    public boolean deleteFormation(Long id) {
        try {
            this.formationRepository.deleteById(id);
           return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }


}
