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
}
