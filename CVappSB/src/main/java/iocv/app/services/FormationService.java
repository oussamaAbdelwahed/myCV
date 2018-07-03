package iocv.app.services;

import iocv.app.beans.Formation;
import iocv.app.repositories.FormationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
