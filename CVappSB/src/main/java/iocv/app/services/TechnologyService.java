package iocv.app.services;

import iocv.app.beans.Technology;
import iocv.app.repositories.TechnologyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class TechnologyService {
    @Autowired
    private TechnologyRepository techRepo;
    public List<Technology> getAll() {
        List<Technology> list = new LinkedList<>();
        try{
            list = this.techRepo.findAll();
        }catch(Exception e) {}
        return list;
    }


   public Technology getOneById(Long id) {
     try{
       return this.techRepo.findById(id).get();
     }catch (Exception e) {
       e.printStackTrace();
       return null;
     }
   }

   public boolean saveTechnology(Technology tech) {
     try{
       this.techRepo.save(tech);
       return true;
     }catch (Exception e) {
       e.printStackTrace();
       return false;
     }
   }

   public boolean updateTechnology(Technology tech, boolean withImage) {
        try {
            if (withImage) {
                this.techRepo.updateTechnology(tech.getName(), tech.getLevel(), tech.getTechnology(), tech.getId());
            } else {
                this.techRepo.updateTechnologyPlainText(tech.getName(), tech.getLevel(), tech.getId());
            }
            return true;
        }catch (Exception e) {
            e.printStackTrace();
            return  false;
        }
   }


    public boolean deleteTechnology(Long id) {
        try{
            this.techRepo.deleteById(id);
            return true;
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


}
