package iocv.app.services;

import iocv.app.beans.CVImage;
import iocv.app.beans.Formation;
import iocv.app.common.ImageType;
import iocv.app.repositories.FormationRepository;
import iocv.app.repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;
    public CVImage getLogoImage() {
        CVImage logo = null;
        try{
            logo = this.imageRepository.findByTypeAndShow(ImageType.NAVBAR_LOGO,true);
        }catch(Exception e){}
        return logo;
    }

    public CVImage getMyBigPicture() {
        CVImage meBigPicture = null;
        try{
           meBigPicture = this.imageRepository.findByTypeAndShow(ImageType.ME_BIG_PICTURE,true);
        }catch(Exception e){}
        return meBigPicture;
    }

    public List<CVImage> getAllCertifications() {
         List<CVImage> certifications = new LinkedList<>();
         try{
           certifications = this.imageRepository.getAllActiveCertifications(ImageType.CERTIFICATION.toString(),true);
         }catch (Exception e){
             e.printStackTrace();
         }
         return certifications;
    }
}
